import axios from "axios";

export const baseUrlFileAccess = import.meta.env
  .VITE_BASE_SERVICE_URL as string;

export const apiBaseUrl = `${baseUrlFileAccess}api/`;
export const loginUrl = `${apiBaseUrl}login/`;
export const createUserUrl = `${apiBaseUrl}users/`;
export const getAllUsersUrl = `${apiBaseUrl}users/`;
export const getSingleUserUrl = `${apiBaseUrl}profile/`;
export const editUserUrl = `${apiBaseUrl}profile/`;
export const deleteUserUrl = `${apiBaseUrl}users/`;
export const departmentsUrl = `${apiBaseUrl}departments/`;
export const generateUsernameUrl = `${apiBaseUrl}generateUsername/`;
export const refreshUrl = `${apiBaseUrl}refresh/`;
export const basicStatsUrl = `${apiBaseUrl}stats/basicStats/`;
export const checkUsernameUrl = `${apiBaseUrl}checkUserName/`;
export const getStats = `${apiBaseUrl}stats/dashboardStats/`;
export const getConsumedStorage = `${apiBaseUrl}user/getConsumedStorage/`;
export const getDepartmentStorageGraphData = `${apiBaseUrl}stats/departmentStorageGraphData/`;
export const topActiveUsersUrl = `${apiBaseUrl}stats/topActiveUsers/`;
export const topStorageConsumersUrl = `${apiBaseUrl}stats/topStorageConsumers/`;
export const getloggedInUserStatsUrl = `${apiBaseUrl}stats/loggedInUsers/`;
export const getStopWordsDictionaryUrl = `${apiBaseUrl}dictionaries/`;
export const createWordsDictionaryUrl = `${apiBaseUrl}dictionaries/`;
export const deleteSingleWordUrl = `${apiBaseUrl}dictionaries/`;
export const getSingleWordDictionaryUrl = `${apiBaseUrl}dictionaries/`;
export const addNewWordsUrl = `${apiBaseUrl}dictionaries/`;
export const getServicesStatusUrl = `${apiBaseUrl}stats/status/`;
export const circlesUrl = `${apiBaseUrl}circles/`;
export const createAlertsUrl = `${apiBaseUrl}alerts/`;
export const getAllAlertsUrl = `${apiBaseUrl}alerts/`;
export const getSingleAlertUrl = `${apiBaseUrl}alerts/`;
export const deletSingleAlertMemberUrl = `${apiBaseUrl}alerts/`;
export const addNewMembersToAlert = `${apiBaseUrl}alerts/`;
export const addNewDictionariesToAlert = `${apiBaseUrl}alerts/`;
export const deleteSingleAlertDictionaryUrl = `${apiBaseUrl}alerts/`;
export const deleteAlertUrl = `${apiBaseUrl}alerts/`;
export const editAlertNameUrl = `${apiBaseUrl}alerts/`;
export const getAllCirclesUrl = `${apiBaseUrl}circles/`;
export const getSingleAlert = `${apiBaseUrl}alerts/`;
export const axiosPrivate = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
