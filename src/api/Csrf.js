import Api from "./Api";
export async function getCsrfCookie(){
    return Api.get('/sanctum/csrf-cookie');
} 