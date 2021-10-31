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
        new Error(error.response);
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
        new Error(error.response);
        return error.response;
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
        new Error(error.response);
        return error.response;
    }
}


export const structureProductVariants = (product) =>{
    const sizes         = product.variation_attributes.find( el => el.id === 'size').values;
    const variantsImg   = product.image_groups.filter(imgFilted => imgFilted.view_type === "large");
    let colors          = product.variation_attributes.find( el => el.id === 'color').values;
    colors              = colors.filter( color => variantsImg.find(variant => variant.variation_value === color.value))

    return {
        id: product.id,
        page_title: product.page_title,
        name: product.name,
        description: product.page_description,
        currency: product.currency,
        price: product.price,
        sizes: sizes,
        colors: colors,
        variantsImg: variantsImg,
        variants: product.variants
    }
}
