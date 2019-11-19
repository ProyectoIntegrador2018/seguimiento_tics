const API_URL = process.env.NODE_ENV === 'production' ? 
                    process.env.APP_URL : 
                    "http://localhost:3001";

export { API_URL };
