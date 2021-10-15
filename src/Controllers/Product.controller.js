import axios from "axios";
import config from "../../config.js";

axios.defaults.baseURL = config.osf_api.base_url;

export const getAllProducts = async () =>{
    const products = await axios.get(`/products/product_search`, {
        params: {
            secretKey: config.osf_api.secret_key
        }
    });
    return products.data;
}