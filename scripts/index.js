const $login = document.getElementById('login_input')
const $password = document.getElementById('password_input')
const $loginButton = document.getElementById('login_button')
const $loginError = document.getElementById('login_error')
// https://login-service-wsb-wj.netlify.app/.netlify/functions/login

const loginHandler = () => {
    const password = $password.value;
    const login = $login.value;
    // alert(`login to ${login} a hasło ma ${password.length} liter`)
    // 
    fetch('https://login-service-wsb-wj.netlify.app/.netlify/functions/login', {
        // method post - gdy wysyłamy jakieś dane do api
        method: "POST", 
        // wysyłamy w formacie json
        body: JSON.stringify({
            'login': login , 
            'password': password,
        })
    }) 
    // dostajemy odpowiedź i musimy znowu zamienić dane z jsona 
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        // jeśli to prawda to 
        if (response.isLogged === true) {
            //wrzuc do localStorage informacje key: logged in, value: yes
            localStorage.setItem('isLoggedIn','yes')
            // przekieruj mnie na stronę główna 
             window.location.href = "./mainScreen.html"}
             // jak === false to usuń klasę ''not visible'' dzięki czemu pojawi się tekst
            else {
            $loginError.classList.remove("not_visible")};
        }
    );
}
// nasłuchuj na wydarzenie "click" i jak to sie stanie to zrealizuj funkcje loginHandler
$loginButton.addEventListener("click", loginHandler);

// password.addEventListener("keydown", (e) =>{
//     if(e.key === "Enter"){
//         loginHandler();
//     }
// });