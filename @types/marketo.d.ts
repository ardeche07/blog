// https://developers.marketo.com/rest-api/endpoint-reference/

declare interface MarketoToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

declare interface MarketoThankYou {
  default?: boolean;
  followupType?: string;
  followupValue?: string;
  operator: string;
  subjectField?: string;
  values: string[];
}

declare interface MarketoFormMeta {
  buttonLabel: string;
  buttonLocation: number;
  createdAt?: string;
  description?: string;
  folder: {
    id: number;
    type: "Folder" | "Program";
  };
  fontFamily: string;
  fontSize: string;
  id: number;
  knownVisitor: {
    template?: string;
    type?: string;
  };
  labelPosition: string;
  language: string;
  locale: string;
  name?: string;
  progressiveProfiling: boolean;
  status: "approved" | "draft";
  thankYouList: MarketoThankYou[];
  theme: string;
  updatedAt: string;
  url: string;
  waitingLabel: string;
}

declare type MarketoDataType =
  | "email"
  | "text"
  | "hidden"
  | "telephone"
  | "textArea"
  | "checkboxes"
  | "htmltext";

declare type MarketoValueSource = "query";

declare interface MarketoFieldAutoFill {
  value: string;
  valueFrom: MarketoValueSource;
  parameterName?: string;
}

declare interface MarketoField {
  id: string;
  label?: string;
  dataType: MarketoDataType;
  validationMessage: string;
  required: boolean;
  formPrefill: true;
  hintText: string;
  maxLength: number;
  autoFill?: MarketoFieldAutoFill;
  text?: string;
  fieldMetaData: {
    labelToRight: boolean;
    values: {
      label: string;
      value: string;
    }[];
  };
}

declare interface MarketoFormMeta {
  buttonLabel: string;
  thankYou: MarketoThankYou;
  waitingLabel: string;
}

declare interface MarketoFormDataAPIResponse {
  meta: MarketoFormMeta;
  fields: MarketoField[];
}

declare interface MarketoSubmitFormResponse {
  errors: MarketoMessage[];
  requestId: string;
  result: {
    id: number;
    status: "created" | "updated" | "skipped";
    reasons?: MarketoMessage[];
  }[];
  success: boolean;
  warnings: MarketoMessage[];
}
