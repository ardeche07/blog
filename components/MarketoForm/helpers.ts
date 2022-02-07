/*
 * We need to use some of this logic without the form constructor
 * e. g. in newsletter form, so this helpers are stored separately.
 */

import { useCallback, useMemo, useState, useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { parseCookies } from "nookies";
import { fetcher } from "utils/fetcher";
import { useRecaptcha } from "utils/recaptcha";
import { GTMEvent } from "utils/gtm";

const getDefaultFieldValue = (autoFill: MarketoFieldAutoFill) => {
  if (!autoFill) {
    return "";
  }

  const cookie = parseCookies();

  const { value: defaultValue = "", parameterName } = autoFill;

  let value = defaultValue;

  if (cookie[parameterName]) value = cookie[parameterName] as string;
  return value;
};

export const useDefaultFormValues = (fields: MarketoField[]) => {
  return useMemo(
    () =>
      fields
        .filter(({ dataType }) => dataType !== "htmltext")
        .reduce((result, { id, autoFill }) => {
          result[id] = getDefaultFieldValue(autoFill);

          return result;
        }, {} as Record<string, string>),
    [fields]
  );
};

export const submitForm = async (
  id: string,
  fields: Record<string, string>,
  token: string
) => {
  try {
    const response = await fetch(`/blog/api/form/${id}/`, {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        "g-recaptcha-response": token,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Wrong response code ${response.status}`);
    }
  } catch (e) {
    throw e;
  }
};

interface UseMarketoFormProps {
  callbackName?: string;
  fallbackData?: MarketoFormDataAPIResponse;
}

export const useMarketoForm = (
  id: string,
  options: UseMarketoFormProps = {}
) => {
  const { callbackName, fallbackData } = options;
  const UID = `marketo_${callbackName || id}`;

  const {
    disabled,
    error: recaptchaError,
    ready: recaptchaReady,
    getToken,
  } = useRecaptcha(UID);

  /*
   * I use swr here instead of simple fetch for built-in request cache
   * to preserve data on page navigation for newsletter and other common forms.
   */
  const { data, error: fieldsError } =
    useSWRImmutable<MarketoFormDataAPIResponse>(
      disabled ? undefined : `/blog/api/form/${id}/meta/`,
      fetcher,
      { fallbackData }
    );

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (disabled) {
      return;
    }

    if (recaptchaError) {
      setError(recaptchaError);
    } else if (fieldsError) {
      setError("Can't download fields data.");
    }
  }, [recaptchaError, fieldsError, disabled]);

  const loading = !disabled && !(recaptchaReady && !!data);

  const thankYou = data?.meta?.thankYou;

  const onSubmit = useCallback(
    async (formData: Record<string, string>) => {
      setError("");

      try {
        const token = await getToken();

        await submitForm(id, formData, token);

        setSubmitted(true);

        await GTMEvent("mktoFormSubmit", { formMeta: { formid: id } });

        if (thankYou?.followupType === "url") {
          window.location.href = thankYou.followupValue;
        }
      } catch (e) {
        console.log(e);
        setError("Form submission failed, please try again.");
      }
    },
    [id, setError, thankYou, getToken]
  );

  useEffect(() => {
    if (!submitted) {
      return;
    }
    const timeout = setTimeout(() => setSubmitted(false), 5000);

    return () => clearTimeout(timeout);
  }, [submitted]);

  return useMemo(() => {
    return {
      disabled,
      data,
      loading,
      submitted,
      error,
      onSubmit,
      UID,
    };
  }, [data, error, loading, submitted, onSubmit, UID, disabled]);
};
