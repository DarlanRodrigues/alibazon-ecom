import axios from "axios";
import { captureException } from '@sentry/node';
import config from "../../config.js";

axios.defaults.baseURL = config.osf_api.base_url;

export const signUp = async (newUser) => {
    try {
        const signup = await axios.post(`/auth/signup`, {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            secretKey: config.osf_api.secret_key
        });

        return signup;
    } catch(error){
        new Error(error.response);
        return error.response;
    }
}


export const signIn = async (newUser) => {
    try {
        const signin = await axios.post(`/auth/signin`, {   
            email: newUser.email,
            password: newUser.password,
            secretKey: config.osf_api.secret_key
        });

        return signin;
    } catch(error){
        new Error(error.response);
        return error.response;
    }
}