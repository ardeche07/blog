export declare global {
  interface Window {
    MktoForms2?: {
      loadForm: (
        baseUrl: string,
        munchkinId: string,
        formId: string,
        callback: () => void
      ) => void;
    };
  }
}
