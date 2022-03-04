import * as logos from "./logos";

export type CompanyId = keyof typeof logos;

export interface CompanyData {
  id: CompanyId;
  title: string;
  caseStudy?: string;
  industry?: string[];
}
