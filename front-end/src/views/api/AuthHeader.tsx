import LoginService from "./LoginApi";

// Bu function component'i kullanarak Event Api'dan back end'e istek attım. Bu header hazırlanmadan back-end'e istek atılamıyor.
// EventApi içindeki her fonksiyona ayrı ayrı da yazılabilirdi fakat herhangi bir tekrarın oluşmaması için ayrı bir component'te
// tutmak istedim.
export default function authHeader() {
    const user =  LoginService.getCurrentUser();

    if (user && localStorage.getItem("jwt")) {
        return { Authorization: 'Bearer ' + localStorage.getItem("jwt") };
    } else {
        return {};
    }
}