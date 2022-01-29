const SERVER = "http://pkg2day.com"

export default {
    LOGIN: SERVER + "/api/v1/client/login",
    SIGNUP: SERVER + "/api/v1/client/register",
    LOGOUT: SERVER + "/api/v1/client/logout",
    SAVE_DEVICE_TOKEN: SERVER + "/api/v1/client/store-device-token",
    FORGETPASSWORD: SERVER + "/api/v1/client/forgot-password",
    PROFILEUPDATE: SERVER + "/api/v1/client/profile-update",
    ADD_ADDRESS: SERVER + "/api/v1/client/store-address",
    GET_ADDRESSESS: SERVER + "/api/v1/client/get-addresses",
    GET_CARS: SERVER + "/api/v1/client/get-vehicles",
    GET_CHARGES: SERVER + "/api/v1/client/get-delivery-charges",
    GET_ORDERS_STATUS: SERVER + "/api/v1/client/get-shipments",
    CREATE_SHIPMENT: SERVER + "/api/v1/client/create-shipment"
}
