const api={
  key: "7e3f21edee540e6110af347b55eb1ab2",
  base: "https://api.openweathermap.org/data/2.5/weather"
}

const searchBox=document.querySelector(".search-box");
searchBox.addEventListener('keypress', setQuery);
  
function setQuery(e) {
  if (e.keyCode==13) {
    getWeatherInfo(searchBox.value);
  }
}

//call to API
function getWeatherInfo(cityName){
  const url = `${api.base}?q=${cityName}&units=metric&appid=${api.key}`;
  fetch(url)
  .then(response => {
    return response.json();
  })
  .then((data) => {
    if (data.cod === 200) {
      displayResults(data);
    }else{
      alert(data.message);
    }
 })
  .catch((err) => {
    console.log(err);
  });  
}

function displayResults(weatherInfo){
 
  let city=document.querySelector(".city");
  city.innerText=`${weatherInfo.name},${weatherInfo.sys.country}`;

  let temp=document.querySelector(".temp");
  temp.innerHTML=`${Math.round(weatherInfo.main.temp)}<span>°c</span>`;

  let weather=document.querySelector(".weather");
  weather.innerText=weatherInfo.weather[0].main;

  let hilo=document.querySelector(".hi-low");
  hilo.innerHTML=`${Math.round(weatherInfo.main.temp_min)}°c / ${Math.round(weatherInfo.main.temp_max)}°c`;

  let d=new Date();
  let date=document.querySelector('.date');
  date.innerText=dateBuilder(d);

}

function dateBuilder(d) {
 /* let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
    
  return `${day}, ${date} ${month} ${year}`*/
  
  const DATE_FORMAT_OPTIONS={
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }
  return d.toLocaleDateString("en-US",DATE_FORMAT_OPTIONS)
}