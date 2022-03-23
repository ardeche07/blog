import { CompanyData } from "./types";
import data from "./clients.json";

let companies: CompanyData[] = [];

if (isCompanies(data)) {
  companies = data;
}

export default companies;

function isCompanies(maybeCompanies: unknown): maybeCompanies is CompanyData[] {
  if (!Array.isArray(maybeCompanies)) {
    throw new Error("company:data is not a list");
  }

  return true;
}
