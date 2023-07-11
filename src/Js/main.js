import { ENV } from "../data/env.js"

const api_key= ENV.WEATHER_KEY
const url = ENV.URL
const $ = (element) => document.querySelector(element)


$(".push-button").addEventListener("click", async () => {
    let options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': api_key,
            'X-RapidAPI-Host': url
        }
    }
    let location = $("#location").value
    let data = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}`, options)
    .then(response => response.json())
    .catch(err => err.json())

    try {
        if (data["error"]["message"] != "") {
            console.log(data["error"])
            return
        }   
    } catch (e) {}
    

    $(".city").innerHTML = data["location"]["name"]
    $(".degress").innerHTML = `${data["current"]["temp_c"]}°C`
})