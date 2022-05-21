import axios from 'axios';

const headers = {
   'Accept' : 'application/json'
};
 
let Api = axios.create({ 
    baseURL : 'https://funnel.fit', 
    // baseURL : 'http://localhost/v1/api',   
    headers : headers
});   
 
Api.defaults.withCredentials = true;
// Api.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000' // REQUIRED!
export default Api; 