//definicje

const IsLoggedIn = localStorage.getItem("isLoggedIn");
const $logout = document.getElementById("logout");
const $countryButton = document.getElementById("country_button");
const $countryInput = document.getElementById("country_input");
const $generateButton = document.getElementById("generate_id");
const $toggleButton = document.getElementById("toggle_screen");
// def funkcji logout
const logout = () => {
    
    localStorage.setItem('isLoggedIn','no')
    
    window.location.href ="/";
};
if (IsLoggedIn !== "yes"){
    logout();
}

//def funkcji searchCountry

const searchCountry = () => {
    const country = $countryInput.value;
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((res) => res.json())
    .then((res) => {

        // ustawiamy skąd pobieramy informacje czyli 
        // zmienna country pobiera się z response (res)0 -> w konsoli sprawdzić 
        const country = res[0]
        //jeśli country istnieje to wykonuj...
        if (country){
            // zmeinna capital 
        const capital = country.capital.join(",");
        // const capital = country.capital[0]
        const fullName = country.name.official;
        const population = country.population;

        document.getElementById("country_fullname").innerText = fullName;
        document.getElementById("country_population").innerText = population;
        document.getElementById("country_capital").innerText = capital;
        // szuka parametrów z api z informacjami o państwach 
        // animate - animacja przejścia
        map.panTo(country.latlng, { animate: true, duration: 1.0 });
        }
        console.log(res)
    })
}

// mapa
var map = L.map('map').setView([2,5],4);

L.tileLayer('https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=IfxVdhkwsAqYS8TOgkw8', {
    attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map); 



// event listenery
$logout.addEventListener("click",logout);
$countryButton.addEventListener("click", searchCountry)
$generateButton.addEventListener("click", () =>{
    fetch('https://randomuser.me/api/')
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        const NewName = res.results[0].name.first + '  ' + res.results[0].name.last;
        const email = res.results[0].email;
        const avatar =res.results[0].picture.medium;
    document.getElementById("new_email").innerText = email;
    document.getElementById("new_name").innerText = NewName;
    document.getElementById("new_picture").src = avatar;
});
});

$toggleButton.addEventListener("click", ()=>{
    document.getElementById("general_screen").classList.toggle("hidden");
    document.getElementById("notes_screen").classList.toggle("hidden");

}
)