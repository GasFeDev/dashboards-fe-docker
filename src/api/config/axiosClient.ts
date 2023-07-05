/* import axios from 'axios';

const getEnvVariable = (envVariableName?: string): string => {
    const envVariable = process.env[`REACT_APP_URL_${envVariableName}`];
    if (envVariable) {
        return envVariable;
    } else {
        throw new Error(`Environment variable ${envVariableName} is not set.`);
    }
}

const BASE_URL = getEnvVariable(process.env.REACT_APP_ENV);


const axiosClient = axios.create({
   
    baseURL: process.env.RENDER_APP_ENV_PROD,


    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000
});

axiosClient.interceptors.response.use(
    response => {
      
      response.headers['Access-Control-Allow-Origin'] = process.env.RENDER_APP_ENV_PROD;
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );


export { axiosClient } */



import axios from 'axios';

const baseURL = process.env.URL_APP_ENV_PROD || "https://dashboards-be-docker.onrender.com/";
const accessControlOrigin = process.env.RENDER_APP_ENV_PROD || 'https://dashboards-fe-docker.onrender.com';

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': accessControlOrigin
  },
  timeout: 10000
});

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export { axiosClient };