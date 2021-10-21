import axios from "axios";
import config from "../../config.js";

axios.defaults.baseURL = config.osf_api.base_url;

export const getAllProducts = async () =>{
    try {
        const products = await axios.get(`/products/product_search`, {
            params: {
                secretKey: config.osf_api.secret_key
            }
        });
        return products.data;
    } catch(error){
        // TODO: Sentry error logging
        return {};
    }
}

export const getProductsById = async (productId) =>{
    try {
        const products = await axios.get(`/products/product_search`, {
            params: {
                secretKey: config.osf_api.secret_key,
                id: productId
            }
        });
        return products.data;
    } catch(error){
        // TODO: Sentry error logging
        return {};
    }
}

export const getProductsByCategoryId = async (categoryId) =>{
    try {
        const products = await axios.get(`/products/product_search`, {
            params: {
                secretKey: config.osf_api.secret_key,
                primary_category_id: categoryId
            }
        });
        return products.data;
    } catch(error){
        // TODO: Sentry error logging
        return {};
    }
}