import axios from 'axios';

/* const getEnvVariable = (envVariableName?: string): string => {
    const envVariable = process.env[`REACT_APP_URL_${envVariableName}`];
    if (envVariable) {
        return envVariable;
    } else {
        throw new Error(`Environment variable ${envVariableName} is not set.`);
    }
}

const BASE_URL = getEnvVariable(process.env.REACT_APP_ENV); */


const axiosClient = axios.create({
    // En produccion
    baseURL: "https://dashboards-be-docker.onrender.com/",
    //En local
    /* baseURL: BASE_URL, */
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 30000
});



axiosClient.interceptors.response.use(
    response => {
      // Agregar encabezado 'Access-Control-Allow-Origin' a la respuesta
      response.headers['Access-Control-Allow-Origin'] = "https://dashboards-fe-docker.onrender.com";
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );


export { axiosClient }