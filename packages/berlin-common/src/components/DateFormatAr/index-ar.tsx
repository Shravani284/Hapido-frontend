import moment from 'moment-timezone';

const index = (inputDate: any) => {
  // Parse the input date using Moment.js
  const parsedDate = moment(inputDate);

  // Format the parsed date as per your desired format
  const formattedDate = parsedDate.utc().format('HH:mm YYYY-MMM-DD');

  return formattedDate;
};

export default index;
