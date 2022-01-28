import Link from "components/Link";

export const RecaptchaTOC = () => {
  return (
    <>
      This site is protected by reCAPTCHA and the Google{" "}
      <Link
        scheme="comment"
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noreferrer nofollow"
      >
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link
        scheme="comment"
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noreferrer nofollow"
      >
        Terms of Service
      </Link>{" "}
      apply.
    </>
  );
};
