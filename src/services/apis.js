

const BASE_URL = "http://localhost:5000"
// const BASE_URL = import.meta.env.VITE_BACKEND_URL
// const BASE_URL = "http://localhost:8000/api/v1"
console.log("Printing base url", BASE_URL )

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/api/signup",
  LOGIN_API: BASE_URL + "/api/login",
  CHANGEPASSWORD_API: BASE_URL + "/api/change-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/api/current-user",
}

