import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"


const { LOGIN_API, SIGNUP_API } = endpoints

export function signUp(
  name,
  email,
  password,
  navigate
) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
        
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      
      // navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      // navigate("/signup")
    }
    dispatch(setLoading(false))
  }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email, password
            })

            console.log("LOG IN RESPONSE..........", response.data  )

            if (!response.data.success) {
                throw new Error(response.data.message)
              }
        
              
              dispatch(setToken(response.data.token))
              // const userImage = response.data?.user?.avatar
              //   ? response.data.user.avatar
              //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.user.name}`
              // dispatch(setUser({ ...response.data.data.user, avatar: userImage }))
              
              localStorage.setItem("token", JSON.stringify(response.data.token))
              localStorage.setItem("user", JSON.stringify(response.data.user))
              navigate("/home")
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
        }
        dispatch(setLoading(false))
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      // dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate("/")
    }
  }