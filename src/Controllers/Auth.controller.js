import axios from "axios";
import { User } from "../Models/User.js";
import config from "../../config.js";

axios.defaults.baseURL = config.osf_api.base_url;

export const signUp = async (newUser) => {
    try {
        const signup = await axios.post(`/auth/signup`, {
            params: {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                secretKey: config.osf_api.secret_key
            }
        });
        return signup.status;
    } catch(error){
        // TODO: Sentry error logging
        return {};
    }
}