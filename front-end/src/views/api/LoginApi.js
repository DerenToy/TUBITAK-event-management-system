import axios from "axios";


// Sisteme kayıtlı olan bir kullanıcı, sisteme giriş yaptığında bir jwt oluşur. Ve kullanıcının sistemde herhangi bir eylemde
// bulunabilmesi için back-end'e istek atarken bu jwt'yi kullanması gerekir. Jwt'yi kullanabilmek için kullanıcı online
// olduğu sürece jwt'yi local storage'da tuttum.  Kullanıcının yetkilerine de ihtiyacım olduğu için, back-end'de JwtResponse
// gibi bir component yazmak yerine oluşan jwt'yi split edip gelen kullanıcının authority'lerine öyle ulaştım.

class LoginApi {

    login(username, password) {
        return axios
            .post( "login", {
                username,
                password
            })
            .then(response => {
                console.log(response.data);
                let user;
                if (response.data) {
                    // Local Storage'a jwt'yi kayıt etme
                    localStorage.setItem("jwt", response.data);
                    let jwtPieces = response.data.split(".");
                    user = atob(jwtPieces[1])
                    localStorage.setItem("user", user)
                }

                return JSON.parse(user);
            });
    }

    // Kullanıcı çıkış yaptığında local stroage'ın temizlenmesi gerekir. Bu yüzden removeItem ile local storage'daki
    // bilgileri sildim.
    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
    }

    // Sistemde online olan kullanıcının getirilmesini sağlar.
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }



}

export default new LoginApi();