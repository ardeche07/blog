import got from "got";
import NodeCache from "node-cache";

const allowedMarketoIds = [
  Number(process.env.NEXT_PUBLIC_EMAIL_SUBSCRIPTION_FORM_ID),
];

const { MARKETO_ENDPOINT_URL, MARKETO_CLIENT_ID, MARKETO_CLIENT_SECRET } =
  process.env;

export const isAllowedFormId = (stringId: string) => {
  const id = parseInt(stringId);

  return allowedMarketoIds.includes(id);
};

const getTokenUrl = `${MARKETO_ENDPOINT_URL}/identity/oauth/token?grant_type=client_credentials&client_id=${MARKETO_CLIENT_ID}&client_secret=${MARKETO_CLIENT_SECRET}`;

/*
 * Marketo Rest API has a limit of 3000 requests per day
 * (not sure if requesting token is included or not):
 * - We update token every 5min = 288 requests per day max.
 * - We have 2 form that need 2 additional requests once in 15 min
 *   = 384 requests per day max.
 * - We need one request ot submit form.
 * Current total is 672 requests for data fetching per day, so we have some
 * room for data submitting, but if we increase a number of forms we may want to
 * stdTTL from 15min to something larger.
 */

const tokenCache = new NodeCache();
const formsCache = new NodeCache({ stdTTL: 900 });

export const getToken = async () => {
  const token = tokenCache.get("token");

  if (token) {
    return token;
  } else {
    try {
      const response = await got.get(getTokenUrl);
      const data = JSON.parse(response.body) as MarketoToken;

      tokenCache.set("token", data.access_token, data.expires_in - 15);

      return data.access_token;
    } catch {
      throw Error("Token is not created");
    }
  }
};

export const getFormMeta = async (id: string) => {
  try {
    const token = await getToken();

    const response = await got.get(
      `${MARKETO_ENDPOINT_URL}/rest/asset/v1/form/${id}.json`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { result } = JSON.parse(response.body);

    return result[0] as MarketoFormMeta;
  } catch (e) {
    console.error(e);

    throw e;
  }
};

export const getFormFields = async (id: string) => {
  try {
    const token = await getToken();

    const response = await got.get(
      `${MARKETO_ENDPOINT_URL}/rest/asset/v1/form/${id}/fields.json`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { result: fields } = JSON.parse(response.body);

    return fields as MarketoField[];
  } catch (e) {
    console.error(e);

    throw e;
  }
};

export const getFormData = async (id: string) => {
  const formData = formsCache.get(id);

  if (formData) {
    return formData;
  }
  try {
    const [meta, fields] = await Promise.all([
      getFormMeta(id),
      getFormFields(id),
    ]);

    const { buttonLabel, thankYouList, waitingLabel } = meta;

    const result = {
      meta: {
        buttonLabel,
        thankYou: thankYouList[0],
        waitingLabel,
      },
      fields,
    } as MarketoFormDataAPIResponse;

    formsCache.set(id, result);

    return result;
  } catch (e) {
    console.error(e);

    throw e;
  }
};

export const postFormData = async (
  formId: string,
  leadFormFields: Record<string, string>
) => {
  try {
    const token = await getToken();

    const response = await got.post(
      `${MARKETO_ENDPOINT_URL}/rest/v1/leads/submitForm.json`,
      {
        body: JSON.stringify({
          formId,
          input: [
            {
              leadFormFields,
            },
          ],
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = JSON.parse(response.body) as MarketoSubmitFormResponse;

    // success === true does not mean that everything is ok,
    // error in field names for example will have success code,
    // and result[0].status === "skipped"
    if (data.success && data.result[0].status !== "skipped") {
      return data;
    } else {
      throw new Error("Marketo API returned error.");
    }
  } catch (e) {
    console.error(e);

    throw e;
  }
};
