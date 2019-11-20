const API_URL = process.env.NODE_ENV === 'production' ? 
                    "" : 
                    "http://localhost:3001";

export { API_URL };
