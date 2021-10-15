import axios from "axios";
import config from "../../config.js";

axios.defaults.baseURL = config.osf_api.base_url;

export const signIn = async () => {
    //TODO
}