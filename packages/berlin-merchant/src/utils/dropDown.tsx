export const setDropDownValues = (
  list: any[],
  data: any,
  name: string,
  formik: any
) => {
  formik.setFieldValue(
    name,
    list.find((obj: any) => obj.id == data[name])
  );
};

export const setMultiDropDownValue = (
  list: any,
  data: any,
  name: any,
  formik: any
) => {
  const result: any = [];
  list?.forEach((cat: any) => {
    data?.forEach((item: any) => {
      if (cat.id == item) {
        result.push(cat);
      }
    });
  });

  formik.setFieldValue([name], result);
};
