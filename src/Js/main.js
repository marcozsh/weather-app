import { ENV } from "../data/env.js"
import { getDay } from "./getDay.js"
import { getTime } from "./getDay.js"
import { days } from "./getDay.js"
const $ = element => document.querySelector(element)

const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': ENV.WEATHER_KEY,
            'X-RapidAPI-Host': ENV.URL
        }
    }
//https://www.weatherapi.com
const fetchRequest = (location = "",lat = "", long = "", options) => {
    if (location !== "") {
        return fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&lang=es`, options)
        .then(response => response.json())
        .catch(err => err.json())   
    }
    return fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat},${long}&lang=es`, options)
    .then(response => response.json())
    .catch(err => err.json())
}

const fillData = (obj) => {
    let time = getTime(obj.current.last_updated)
    $("#location").placeholder = `${obj.location.name}, ${obj.location.region}`
    $(".degress").innerHTML = `${obj.current.temp_c}<p style="font-size:2rem;">°C</p>`
    $(".weather-description").innerHTML = `<strong>${obj.current.condition.text}</strong>`
    $(".time-zone").innerHTML = `<strong>${getDay(obj.current.last_updated, days)}</strong>, ${time[0]}:${time[1]}`
    $("#weather-icon").src = obj.current.condition.icon
}

const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error("La geolocalización no es compatible con este navegador."));
    }
  })
}
const getLocalWeather = () => {
    getLocation()
      .then(async pos => {
        const { latitude, longitude } = pos.coords
        const data = await fetchRequest("", latitude, longitude, options)
        const weatherObj = JSON.parse(JSON.stringify(data))
        fillData(weatherObj)
        
    }).catch(error => {console.log('Error al obtener la ubicación:', error.message)})
}
getLocalWeather()//para obtener el tiempo de la ubicación actual del usuario
const getWeather = async (e)=>{
    const target = e.target == undefined ? e : e.target //si e.target es undefined, es por que se hizo click en la lupa
    let data = await fetchRequest(target.value, 0, 0, options)
    const weatherObj = JSON.parse(JSON.stringify(data))
    try {
        if (weatherObj.error.message !== "") {
            alert(weatherObj.error.message)
            return
        }   
    } catch (e) {}
    fillData(weatherObj)
    target.value = ""
}

$("#location").addEventListener("keydown", (e) => {
    if (e.key == 'Enter'){
        if (e.target.value === "") {
            alert("favor ingresar una ciudad")
            return
        }
        getWeather(e)
    }
})
$("#lupa").addEventListener("click", () => {
    let location = $("#location")
    if (location.value === "") {
        alert("favor ingresado una ciudad") 
        return
    }
    getWeather(location)
})