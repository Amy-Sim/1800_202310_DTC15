window.addEventListener('load', () => {
    let long;
    let lat;
    //Accessing Geolocation of User
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            //Storing the latitude and longitude of the user in variables
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base= 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric';

            //Using fetch to get the data from the API
            fetch(base)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temp } = data.main;
                    const place = data.name;
                    const { description } = data.weather[0];
                    const { sunrise, sunset } = data.sys;
                    const { humidity } = data.main;
                    const { speed } = data.wind;
                    const { feels_like } = data.main;
                    const { image } = data.weather[0];
                })}); 
}});

