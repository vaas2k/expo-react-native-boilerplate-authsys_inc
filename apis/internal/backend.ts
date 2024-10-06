import axios from "axios";

const Axios = axios.create({
    baseURL: "http://192.168.200.200:8080",
    method : '*',
    timeout : 10000,    
    headers:  {
        "Content-Type" : "application/json",
    },
    withCredentials : true
});


export default Axios;
