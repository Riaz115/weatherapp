import React, { useState } from "react";

// this is css file link
import "./Weather.css";

// these are image for the app import from assests
import Cloud from "../assests/cloud.jpeg";
import Rain from "../assests/rain.png";
import Sun from "../assests/sun.jpeg";

// this is axios libary import
import axios from "axios";

function Weather() {
  // this is my api key
  let apiKey = "7ff24ec5e62c08f6684e5c3ec4ed03ca";

  // this is for get value
  const [inputVal, setInputVal] = useState("");

  // this is for set and show value
  const [showcityName, setCityName] = useState(true);

  // this is for the tempratrue
  const [temp, setTemp] = useState("0");

  //this is for the minimum tempratrue
  const [minTemp, setMinTemp] = useState("0");

  // this is for the maximum temprature
  const [maxTemp, setMaxTemp] = useState("0");

  // this is for the weather condtion
  const [weatherCond, setWeatherCond] = useState("");
  console.log(weatherCond);

  // this is for the show image
  let Image = Cloud;

  // this is for the country name
  const [country, setCountry] = useState("");

  // this is for the placeholder
  const [forplac, setForPlac] = useState("Enter City name ");

  //this is function for the image
  const ForImage = () => {
    if (weatherCond === "Clear") {
      Image = Sun;
      return Image;
    } else if (weatherCond === "Clouds") {
      Image = Cloud;
      return Image;
    } else if (weatherCond === "Riany") {
      Image = Rain;
      return Image;
    }
  };
  ForImage();

  //this is for onchange input function
  const HandleChange = (e) => {
    setInputVal(e.target.value);
    setCityName(true);
  };

  // this is for the week of day
  const GetweekDays = () => {
    let weekDay = new Array(7);
    weekDay[0] = "Sun";
    weekDay[1] = "Mon";
    weekDay[2] = "Tue";
    weekDay[3] = "Wed";
    weekDay[4] = "Thur";
    weekDay[5] = "Fri";
    weekDay[6] = "Sat";

    return weekDay[2];
  };

  // this for the get month
  const ForMonth = () => {
    let months = [
      "JAN",
      "FAB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    return months[3];
  };

  // this is complete date
  const date = new Date();

  // this is for the month get
  let monDate = date.getDate();
  if (monDate < 10) {
    monDate = "0" + monDate;
  }

  // this is for the hours get
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }

  // this is for the minutes get
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  // this is for the am and pm get
  let periods = "AM";
  if (hours >= 12) {
    periods = "PM";
    hours = hours - 12;
  }

  // this is for get city name
  let cityName = inputVal;

  // this is api url
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  // this is for the api
  const forApiCall = async () => {
    try {
      let response = await axios.get(url);
      let data = await response.data;

      // this is for the weather condition
      setWeatherCond(data.weather[0].main);

      // this is for the city temprature
      setTemp(data.main.temp);

      // this is for the minimum temprature
      setMinTemp(data.main.temp_min);

      // this is for the maximum temprature
      setMaxTemp(data.main.temp_max);

      // this is for the country name
      setCountry(data.sys.country);
    } catch (error) {
      setInputVal("Invalid City");
      setCountry("");
      setForPlac("please enter valid name");
    }
  };

  // this is for the button submit function
  const handleBtn = () => {
    if (inputVal === "") {
      setInputVal("Enter City");
    }
    setCityName(false);
    forApiCall();
    setForPlac("Enter City Name");
  };

  return (
    <section className="weatherapp ">
      <div className="full-app ">
        <div className="upper">
          <img src={Image} alt="cloud" className="img-fluid" />
        </div>
        <div className="lower">
          <div className="for-input">
            <input
              type="text"
              placeholder={forplac}
              value={inputVal}
              onChange={HandleChange}
            />
            <button className="btn btn-danger for-btn" onClick={handleBtn}>
              check
            </button>
          </div>
          <h1 className="city-name mb-0 text-white">
            {showcityName ? "City" : `${cityName},${country}`}
          </h1>
          <p className="text-center date-time">
            <span>{GetweekDays()}</span> <span className="text-white"> | </span>
            <span>
              {ForMonth()},{monDate}
            </span>
            <span className="text-white"> | </span>
            <span>
              {hours}:{minutes}
              {periods}
            </span>
          </p>
          <h1 className="temp">
            {temp}
            <sup>o</sup>c
          </h1>
          <p className="text-center min-temp">
            <span>
              min{minTemp}
              <sup>o</sup>c
            </span>

            <span>
              <span className="text-white"> | </span>max {maxTemp}
              <sup>o</sup>c
            </span>
          </p>
          <div className="author text-white mb-2 ">
            <h6>developed by M.riaz Ahamd.......</h6>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Weather;
