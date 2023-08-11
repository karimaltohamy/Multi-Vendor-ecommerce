import apiAxios from "../../utils/apiAxios";
import { setUserError, setUserSeccess, setUserStart } from "../reducers/userReducer"

export const getUser = async (dispatch) => {
    dispatch(setUserStart())
    try {
        const {data} = await apiAxios.get("/users/get-user")
        dispatch(setUserSeccess(data.user))
        
    } catch (error) {
        console.log(error);
        dispatch(setUserError())
    }
}
