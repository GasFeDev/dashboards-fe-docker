import axios from 'axios';

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
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000
});


export { axiosClient }