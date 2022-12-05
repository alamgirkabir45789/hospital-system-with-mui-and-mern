/*
     Title: Enums
     Description: Enums
     Author: Alamgir Kabir
     Date: 01-November-2022
     Modified: 01-November-2022
*/
const { REACT_APP_BASE_URL } = process.env;

export const baseUrl = REACT_APP_BASE_URL;
export const ddlDays = [
  { label: 'Saturday', value: 'Saturday', isChecked: false },
  { label: 'Sunday', value: 'Sunday', isChecked: false },
  { label: 'Monday', value: 'Monday', isChecked: false },
  { label: 'Tuesday', value: 'Tuesday', isChecked: false },
  { label: 'Wednesday', value: 'Wednesday', isChecked: false },
  { label: 'Thursday', value: 'Thursday', isChecked: false },
  { label: 'Friday', value: 'Friday', isChecked: false },
];
