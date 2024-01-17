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
        console.log(response.status);
        return response;

    }catch(error){
        console.log(error);
    }
    
}

displayWeather();

async function displayWeather(){

    city=document.getElementById('loc').value;
    if(city==='' || city===prev){
        // return;
    }

    prev=city;
    // weatherApi=`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`
    weatherApi=`https://weatherapi-com.p.rapidapi.com/forecast.json?q=New Delhi&days=3`

    try {
        let weatherData=await fetchWeatherData(weatherApi);

        if(weatherData.status===200){

            const result=await weatherData.json();
            console.log(result);

            let tab=`<tr>
            <th>Temperature</th>
            <td>${result.current.temp_c}°C</td>
            </tr>`;
    
            tab+=`<tr>
            <th>Feels like</th>
            <td>${result.current.feelslike_c}°C</td>
            </tr>`;
    
            tab+=`<tr>
            <th>Cloud pct</th>
            <td>${result.cloud_pct} %</td>
            </tr>`;
    
            tab+=`<tr>
            <th>Wind Speed</th>
            <td>${result.current.wind_mph} mph</td>
            </tr>`;

        document.getElementById('stats').innerHTML=tab;

        let tab2=`
        <h1>${result.current.temp_c}°C</h1>
        <img src="${result.current.condition.icon}">
        <h3>${result.location.name}</h3>
        <h5>${result.location.country}</h5>
        <p>${result.location.localtime}</p>
        `;

        document.getElementById('new_design').innerHTML=tab2;
        }else{
            throw new Error("Sorry, we could not find the location you were searching for 😥");
        }

    }catch (error){
        document.getElementById('stats').innerHTML=`${error}`;
    }

}

// Make a feature to update weather every 45 seconds
// setInterval(displayWeather,3000);

const reset_text=document.getElementById('reset-text');
reset_text.addEventListener('click',()=>{
    document.getElementById('loc').value='';
});

const search_button=document.getElementById('searchBtn');
search_button.addEventListener('click',()=>{
    displayWeather();
})