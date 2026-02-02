document.addEventListener("DOMContentLoaded", () => {

    const API_KEY = "TA_CLE_API_ICI";

    const temperature = document.querySelector(".temperature");
    const localisation = document.querySelector(".localisation");
    const temps = document.querySelector(".temps");
    const logo = document.querySelector(".logo-meteo");

    const blocsJour = document.querySelectorAll(".bloc-j");
    const blocsHeure = document.querySelectorAll(".bloc-h");

    const jours = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

    function appelAPI(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {

                /* MÉTÉO ACTUELLE */
                temperature.textContent = `${Math.round(data.current.temp)}°`;
                temps.textContent = data.current.weather[0].description;
                localisation.textContent = data.timezone;

                const icon = data.current.weather[0].icon;
                logo.src = `res/jour/${icon}.svg`;

                /* HEURES */
                let heureActuelle = new Date().getHours();
                blocsHeure.forEach((bloc, i) => {
                    let heure = (heureActuelle + i * 3) % 24;
                    bloc.children[0].textContent = `${heure} h`;
                    bloc.children[1].textContent =
                        `${Math.round(data.hourly[i * 3].temp)}°`;
                });

                /* JOURS */
                const jourActuel = new Date().getDay();
                blocsJour.forEach((bloc, i) => {
                    bloc.children[0].textContent =
                        jours[(jourActuel + i) % 7];
                    bloc.children[1].textContent =
                        `${Math.round(data.daily[i].temp.day)}°`;
                });
            });
    }

    navigator.geolocation.getCurrentPosition(
        pos => appelAPI(pos.coords.latitude, pos.coords.longitude),
        () => alert("Veuillez activer la géolocalisation")
    );
});
