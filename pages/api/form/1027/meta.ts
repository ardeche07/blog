import type { NextApiRequest, NextApiResponse } from "next";
import { isAllowedFormId, getFormData } from "server/marketo-api-helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formId = req.query.id as string;

  if (!isAllowedFormId(formId)) {
    res.status(403).json({ errors: [`Form id ${formId} is not whitelisted.`] });

    return;
  }

  try {
    const data = await getFormData(formId);

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ errors: ["Marketo API request error."] });
  }
}
