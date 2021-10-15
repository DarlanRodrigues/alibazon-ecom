import dotenv from 'dotenv';

dotenv.config();

const config = {
    app: {
        port: parseInt(process.env.PORT) || 3000
    },
    sentry: {
        url: process.env.SENTRY_URL
    },
    osf_api: {
        base_url: process.env.OSF_API_BASE_URL,
        secret_key: process.env.OSF_SECRET_KEY
    }
};
   
export default config;