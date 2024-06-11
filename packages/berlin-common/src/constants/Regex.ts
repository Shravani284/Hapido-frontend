const REGEX = {
  NUMBER: /^[0-9]+$/,
  POSITIVENUMBER: /^[1-9]+$/,
  PHONE:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  PRIORITY: /^(0*(?:[1-9][0-9]{0,3}|10000))$/,
  MINVOUCHER: /.*\d.*/,
  MAXVOUCHER: /^(?=.*\d).{1,10}$/,
  // PERCENTAGE: /^0*(?:[0-9][0-9]?|100)$/,
  PERCENTAGE: /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,4})?)$/,
  UNDER1000: /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/,
  COORDINATES:
    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
  INITIALCHAR: /^[^\s]/,
  PROMOCODE: /^[a-zA-Z0-9]{1,16}$/,
  FLASHSALEDISCOUNT: /^(0*(?:[1-9][0-9]{0,3}|9999))$/,
  UNDER100000:
    /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9])$/,
};

export { REGEX };
