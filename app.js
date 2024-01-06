// const weatherApi="https://weather-by-api-ninjas.p.rapidapi.com/v1/weather";

var city;
var prev;

async function fetchWeatherData(weatherApi){

    const options = {
    	method: 'GET',
    	headers: {
    		'X-RapidAPI-Key': 'c74d4d9a2emsh6f821f98e562eb1p1ee931jsn52d8af2479d8',
    		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
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

async function displayWeather(){

    city=document.getElementById('loc').value;
    if(city==='' || city===prev){
        return;
    }

    prev=city;
    weatherApi=`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`

    try {
        let weatherData=await fetchWeatherData(weatherApi);

        if(weatherData.status===200){

            const result=await weatherData.json();
            
            let tab=`<tr style="color:#d8b8fc;">
                    <th>Temperature</th>
                    <th>Feels like</th>
                    <th>Cloud pct</th>
                    <th>Wind Speed</th>
                    </tr>`;
        
                    tab+=`<tr class="dataRow">
                 
                    <th id="description">${result.temp}</th>
                    <th id="description">${result.feels_like}</th>
                    <th id="description">${result.cloud_pct}</th>
                    <th id="description">${result.wind_speed}</th>
                    </tr>`;

        document.getElementById('stats').innerHTML=tab;
        }else{
            throw new Error("Sorry, we could not find the location you were searching for 😥");
        }

    }catch (error){
        document.getElementById('stats').innerHTML=`${error}`;
    }

}

setInterval(displayWeather,3000);


// add more UI using insta saved reels