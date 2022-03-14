const SERVER = "http://helping.upworkhelper.com"

export default {
    LOGIN: SERVER + "/api/v1/client/login",
    SIGNUP: SERVER + "/api/v1/client/register",
    LOGOUT: SERVER + "/api/v1/client/logout",
    SAVE_DEVICE_TOKEN: SERVER + "/api/v1/client/store-device-token",
    FORGETPASSWORD: SERVER + "/api/v1/client/forgot-password",
    PROFILEUPDATE: SERVER + "/api/v1/client/profile-update",
    COMPLAINT_SUBMIT: SERVER + "/api/v1/client/register-complaint",
    SAVE_FOOD: SERVER + "/api/v1/client/save-food",
    SAVE_DONATION: SERVER + "/api/v1/client/save-donation",
    GET_NOTI: SERVER + "/api/v1/client/get-notifications",
    GET_COMPLAINS: SERVER + "/api/v1/client/get-history",
}
