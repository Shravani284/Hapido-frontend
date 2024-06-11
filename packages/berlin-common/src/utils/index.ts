export const preparePageTranslation = (pageName: string) => {
  return {
    meta_for: pageName,
    pageTitleTranslation: [
      {
        locale: "en",
        table_name: "meta",
        column_name: "page_translation",
        text: pageName,
      },
      {
        table_name: "meta",
        column_name: "page_translation",
        locale: "ar",
        text: "فئة",
      },
    ],
  };
};
