import moment from "moment-timezone";

const index = (inputDate: any) => {
  // Parse the input date using Moment.js
  const parsedDate = moment(inputDate);

  // Format the parsed date as per your desired format
  const formattedDate = parsedDate.utc().format("YYYY-MMM-DD HH:mm");

  return formattedDate;
};

export default index;

const timeFormat = (inputDate: any) => {
  // Parse the input date using Moment.js
  const parsedDate = moment(inputDate);

  // Format the parsed date as per your desired format
  const formattedDate = parsedDate.utc().format("YYYY-MMM-DD HH:mm");

  return formattedDate;
};
export { timeFormat };

// const DatePaidFormat = (inputDate: any) => {
//   // Parse the input date using Moment.js
//   const parsedDate = moment(inputDate);

//   // Format the parsed date as per your desired format
//   const formattedDate = parsedDate.utc().format("YYYY-MM-DD");

//   return formattedDate;
// };

const DatePaidFormat = (inputDate: any) => {
  // Parse the input date using Moment.js and set the time zone to Dubai (GMT+4)
  const parsedDate = moment(inputDate).tz("Asia/Dubai");

  // Format the parsed date as per your desired format
  const formattedDate = parsedDate.format("YYYY-MM-DD");

  return formattedDate;
};

export { DatePaidFormat };

const formatDateInDubaiTimeZone = (date: any) => {
  const options = {
    timeZone: "Asia/Dubai",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const dubaiFormattedDate = date.toLocaleString("en-US", options);
  return dubaiFormattedDate;
};
export { formatDateInDubaiTimeZone };
