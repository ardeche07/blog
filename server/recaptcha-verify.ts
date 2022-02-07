/*
 * Server side recaptch varification logic. Used by forms.
 */

import got from "got";

const {
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  RECAPTCHA_API_KEY,
  RECAPTCHA_PROJECT_ID,
} = process.env;

const endpoint = `https://recaptchaenterprise.googleapis.com/v1beta1/projects/${RECAPTCHA_PROJECT_ID}/assessments?key=${RECAPTCHA_API_KEY}`;

export const verify = async (token?: string) => {
  if (!token) {
    return false;
  }

  const response = await got.post(endpoint, {
    body: JSON.stringify({
      event: {
        token,
        siteKey: NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      },
    }),
  });

  const { score } = JSON.parse(response.body);

  // Default recaptcha scores are 0.1, 0.3, 0.7 and 0.9, we only want 2 last ones
  return score >= 0.7;
};
