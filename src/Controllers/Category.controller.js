import axios from "axios";
import config from "../../config.js";

axios.defaults.baseURL = config.osf_api.base_url;

export const getAllCategories = async () => {
    const categories = await axios.get(`/categories`, {
        params: {
            secretKey: config.osf_api.secret_key
        }
    });
    return categories.data;
}

export const getCategoriesByParentId = async (parentId = 'root') => {
    try {
        const categories = await axios.get(`/categories/parent/${parentId}`, {
            params: {
                secretKey: config.osf_api.secret_key
            }
        });

        return categories.data;
    } catch(error){
        // TODO: Sentry error logging
        return {};
    }
}


export const getCategoryById = async (categoryId = 'root') => {
    try {
        const category = await axios.get(`/categories/${categoryId}`, {
            params: {
                secretKey: config.osf_api.secret_key
            }
        });

        return category.data;
    } catch(error){
        // TODO: Sentry error logging
        return {};
    }
}