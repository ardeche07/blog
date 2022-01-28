/*
 * Recaptcha loading logic and React hook for Recaptcha validation.
 */

import { useCallback, useEffect, useMemo, useState } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

let loaded = false;

export const load = (): Promise<void> => {
  return new Promise((resolve) => {
    if (loaded) {
      return resolve();
    }

    const scriptElement = document.createElement("script");

    scriptElement.onload = () => {
      loaded = true;
      resolve();
    };
    scriptElement.src = "https://www.google.com/recaptcha/enterprise.js";

    document.body.appendChild(scriptElement);
  });
};

interface CleanupOptions {
  ID: number;
  containerID: string;
  callbackFNName: string;
}

// Recaptcha unmount function

const cleanup = ({ ID, containerID, callbackFNName }: CleanupOptions) => {
  const el = document.getElementById(containerID);

  // reCaptcha will leave some DOM elements inside tagert node even after reset,
  // so we need to remove them manually. If we don't remove them, we will have
  // an "reCAPTCHA has already been rendered in this element" error next time we try
  // to mount the recaptcha in this node, e.g. when we unmount/mount the component.
  if (el && el.childNodes.length) {
    el.innerHTML = "";
  }

  if (window[callbackFNName]) {
    delete window[callbackFNName];
  }

  if (window["grecaptcha"]?.enterprise?.reset && ID) {
    window["grecaptcha"].enterprise.reset(ID);
  }
};

export const useRecaptcha = (UID: string) => {
  const [error, setError] = useState<string>("");
  const [recaptchaID, setRecaptchaID] = useState<number>();
  const callbackFNName = `${UID}_callback`;

  const getToken = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      if (!Number.isInteger(recaptchaID)) {
        setError(
          "reCAPTCHA script is not initialized, wait and try submit again"
        );

        return;
      }

      window[callbackFNName] = (token: string) => resolve(token);

      window["grecaptcha"].enterprise.execute(recaptchaID);
    });
  }, [recaptchaID, callbackFNName]);

  useEffect(() => {
    if (!SITE_KEY) {
      return;
    }

    // Because load and init are async we can end in the state where
    // a component is unmounted before it is finished;
    // "isMounted" is a flag that helps us check it
    let isMounted = true;
    // We need to access id outside the `load` call to correctly reset reCaptcha on unmount
    let ID: number;

    load().then(() => {
      window["grecaptcha"].enterprise.ready(() => {
        if (!isMounted) {
          // This cleanup is called after the unmount to remove mounting artifacts
          cleanup({ ID, containerID: UID, callbackFNName });

          return;
        }

        ID = window["grecaptcha"].enterprise.render(UID, {
          sitekey: SITE_KEY,
          size: "invisible",
          callback: callbackFNName,
          "error-callback": () =>
            setError(
              "Cannot contact reCAPTCHA, please check your connection and try again"
            ),
          "expired-callback": () => {
            window["grecaptcha"].enterprise.reset();

            setError("reCAPTCHA response expired, please submit again");
          },
        });

        setRecaptchaID(ID);
      });
    });

    return () => {
      isMounted = false;

      cleanup({ ID, containerID: UID, callbackFNName });
    };
  }, [UID, callbackFNName]);

  return useMemo(
    () => ({
      disabled: !SITE_KEY,
      error,
      ready: Number.isInteger(recaptchaID),
      getToken,
    }),
    [error, recaptchaID, getToken]
  );
};
