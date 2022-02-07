import type { NextApiRequest, NextApiResponse } from "next";
import { isAllowedFormId, postFormData } from "server/marketo-api-helpers";
import { verify } from "server/recaptcha-verify";

/*
 * For some reason Marketo API throws error if you send field id
 * in the form that the same API is giving you if they are in
 * UpperCamelCase, but works if they are in lowerCamelCase.
 * So you need to change "Email" to "email" and "CompanyName" to
 * "companyName". This only applies to the user defined fields,
 * default fields with _ like "UTM_Campaign__c" works as expected
 * and should be left as is.
 */

const normalizeFields = (fields: Record<string, string>) => {
  return Object.entries(fields).reduce((result, [key, value]) => {
    let keyName = key;

    if (!key.includes("_")) {
      keyName = key[0].toLowerCase() + key.substr(1);
    }

    result[keyName] = value;

    return result;
  }, {});
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formId = req.query.id as string;
  const leadFormFields = normalizeFields(req.body as Record<string, string>);

  if (!isAllowedFormId(formId)) {
    res.status(403).json({ errors: [`Form id ${formId} is not whitelisted.`] });

    return;
  }

  try {
    const isVerified = await verify(
      req.headers["g-recaptcha-response"] as string
    );

    if (!isVerified) {
      res.status(403).json({ errors: [`reCAPTCHA validation error.`] });

      return;
    }
  } catch {
    res.status(403).json({ errors: [`reCAPTCHA API error.`] });
  }

  try {
    await postFormData(formId, leadFormFields);

    res.status(200).end();
  } catch (e) {
    res.status(500).json({
      errors: ["Marketo API request error."],
    });
  }
}
