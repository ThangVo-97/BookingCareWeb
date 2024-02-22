import axios from '../axios';
import * as queryString from 'query-string';

export const handleLogin = (email, password) => {

    return axios.post('/api/login', { email, password })
}
