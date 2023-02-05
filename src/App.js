import React, {useEffect, useState} from 'react';
import axios from "axios";
import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from './pages/forecastTab/ForecastTab';
import {Route, Routes} from "react-router-dom";
import TodayTab from "./pages/todayTab/TodayTab";
import kelvinToCelcius from './helpers/kelvinToCelcius';

const apiKey = 'a1f3554f0ce912f2a51bc748448c01b8';

function App() {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('');
    const [error, toggleError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            toggleError(false);
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${apiKey}&lang=nl`);
                console.log(response.data);
                setWeatherData(response.data);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        if (location) {
            fetchData();
        }
    }, [location]);

    return (
        <>
            <div className="weather-container">

                {/*HEADER -------------------- */}
                <div className="weather-header">
                    <SearchBar setLocationHandler={setLocation}/>
                    {error &&
                    <span className="wrong-location-error">
                        Oeps! Deze locatie bestaat niet
                    </span>}

                    <span className="location-details">
                        {Object.keys(weatherData).length > 0 &&
                            <>
                                <h2>{weatherData.weather[0].description}</h2>
                                <h3>{weatherData.name}</h3>
                                <h1>{kelvinToCelcius(weatherData.main.temp)}</h1>
                            </>
                        }
                    </span>
                </div>

                {/*CONTENT ------------------ */}
                <div className="weather-content">
                    <TabBarMenu/>

                    <div className="tab-wrapper">
                        <Routes>
                            <Route path="/" element={<TodayTab
                                coordinates={weatherData.coord}/>}/>
                            <Route path="/komende-week" element={<ForecastTab
                                coordinates={weatherData.coord}/>}/>
                        </Routes>
                    </div>
                </div>

                <MetricSlider/>
            </div>
        </>
    );
}

export default App;
