// const weatherApi="https://weather-by-api-ninjas.p.rapidapi.com/v1/weather";

var city;
var prev;

async function fetchWeatherData(weatherApi){

    const options = {
    	method: 'GET',
    	headers: {
    		'X-RapidAPI-Key': 'c74d4d9a2emsh6f821f98e562eb1p1ee931jsn52d8af2479d8',
    		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    	}
    };

    try{
        const response=await fetch(weatherApi,options);
        return response;

    }catch(error){
        console.log(error);
    }
    
}

async function displayWeather(){

    city=document.getElementById('loc').value;
    if(city==='' || city===prev){
        return;
    }

    prev=city;
    weatherApi=`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`

    try {
        let weatherData=await fetchWeatherData(weatherApi);

        if(weatherData.status===200){

            const result=await weatherData.json();
            // console.log(result);

            const dateTime = new Date(result.location.localtime);

            const hours = String(dateTime.getHours() % 12 || 12).padStart(2, '0');
            const minutes = String(dateTime.getMinutes()).padStart(2, '0');
            const ampm = dateTime.getHours() >= 12 ? 'PM' : 'AM';
            const formattedTime = `${hours}:${minutes} ${ampm}`;

            const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
            const currentDay = daysOfWeek[(dateTime.getDay()-1)%7];
            const d1 = daysOfWeek[(dateTime.getDay())%7];
            const d2 = daysOfWeek[(dateTime.getDay()+1)%7];


            const locTimeDetails = `${formattedTime}`;

            let tab=`
            <div class="row">
            
                <div class="col" id="main-box">
                    
                    <div class="d-flex justify-content-center align-items-center">
                        <h1 class="mr-5">${result.current.temp_c}<span>°C</span></h1>
                        <img src="${result.current.condition.icon}">
                    </div>

                    <p>Feels like ${result.current.feelslike_c} °C</p>
                    <h3>${result.location.name}, ${result.location.country}</h3>
                    <p>${locTimeDetails} | 📍 L:${result.location.lat}° H:${result.location.lon}°</p>

                </div>
                
                <div class="col">

                    <div class="row">

                    <table class="table table-hover" id="stats">

                    <tr>
                        <th>Visibility</th>
                        <td>${result.current.vis_km} km</td>
                    </tr>
                    
                    <tr>
                        <th>Humidity</th>
                        <td>${result.current.humidity} %</td>
                    </tr>

                    <tr>
                        <th>Cloud</th>
                        <td>${result.current.cloud} %</td>
                    </tr>

                    <tr>
                        <th>Wind Speed</th>
                        <td>${result.current.wind_mph} mph</td>
                    </tr>

                    </table>

                    </div>
                    <div class="row py-2" id="forecast">
                    
                        <div class="col">
                            <div class="row">
                                <p>${currentDay}</p>
                            </div>
                            <div class="row">
                                <img src="${result.forecast.forecastday[0].day.condition.icon}">
                            </div>
                            <div class="row">
                                <h5 class="mt-2 mb-0">Min: ${result.forecast.forecastday[0].day.mintemp_c}°C</h5>
                                <h5 class="mt-2 mb-0">Max: ${result.forecast.forecastday[0].day.maxtemp_c}°C</h5>
                            </div>
                        </div>
                            

                        <div class="col">
                            <div class="row">
                                <p>${d1}</p>
                            </div>
                            <div class="row">
                                <img src="${result.forecast.forecastday[1].day.condition.icon}">
                            </div>
                            <div class="row">
                            <h5 class="mt-2 mb-0">Min: ${result.forecast.forecastday[1].day.mintemp_c}°C</h5>
                            <h5 class="mt-2 mb-0">Max: ${result.forecast.forecastday[1].day.maxtemp_c}°C</h5>
                            </div>
                        </div>

                        <div class="col">
                            <div class="row">
                                <p>${d2}</p>
                            </div>
                            <div class="row">
                                <img src="${result.forecast.forecastday[2].day.condition.icon}">
                            </div>
                            <div class="row">
                                <h5 class="mt-2 mb-0">Min: ${result.forecast.forecastday[0].day.mintemp_c}°C</h5>
                                <h5 class="mt-2 mb-0">Max: ${result.forecast.forecastday[0].day.maxtemp_c}°C</h5>
                            </div>
                        </div>

                    </div>

                </div>
            </div>`;

        document.getElementById('new_design').innerHTML=tab;
        }else{
            throw new Error("Sorry, we could not find the location you were searching for 😥");
        }

    }catch (error){
        document.getElementById('stats').innerHTML=`${error}`;
    }

}

setInterval(displayWeather,3000);

const reset_text=document.getElementById('reset-text');
reset_text.addEventListener('click',()=>{
    document.getElementById('loc').value='';
});

const search_button=document.getElementById('searchBtn');
search_button.addEventListener('click',()=>{
    displayWeather();
})

/* To Do
 Make a feature to update weather every 45 seconds 
 Set Background acc to weather
document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
*/
