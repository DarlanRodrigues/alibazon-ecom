import axios from "axios";
import config from "../../config.js";

axios.defaults.baseURL = config.osf_api.base_url;

export const getCart = async (token) => {
    try {
        const cart = await axios.get(`/cart`, {
            params: {
                secretKey: config.osf_api.secret_key
            },
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        });

        return cart;
    } catch(error){
        new Error(error.response);
        return error.response;
    }
}

export const addItemCart = async (token, productId, variantId, quantity = 1) => {
    try {
        const cart = await axios.post(`/cart/addItem`, {
            secretKey: config.osf_api.secret_key,
            productId: productId,
            variantId: variantId.toString(),
            quantity: quantity
        },{
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        });
        
        return cart;
    } catch(error){
        new Error(error.response);
        return error.response;
    }
}


export const removeItemCart = async (token, productId, variantId) => {
    try {
        const cart = await axios.delete(`cart/removeItem`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                secretKey: config.osf_api.secret_key,
                productId: productId.toString(),
                variantId: variantId.toString(),
            }
          });
        
        return cart;
    } catch(error){
        new Error(error.response);
        return error.response;
    }
}