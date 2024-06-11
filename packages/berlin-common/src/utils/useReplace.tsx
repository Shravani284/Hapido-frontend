import { useState } from "react";

const useReplace = (text) => {
  let updatedText = "";
  updatedText = text?.replace("-", " ");
  let capitalizedString = updatedText?.split(' ')?.map(capitalizeFirstLetter)?.join(' ');
  return capitalizedString;
};

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.substr(1);
}

export default useReplace;
