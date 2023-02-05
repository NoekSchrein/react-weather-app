import React, {useEffect, useState} from 'react';
import axios from "axios";
import './ForecastTab.css';
import kelvinToCelcius from "../../helpers/kelvinToCelcius";
import createDateString from "../../helpers/createDateString";

const apiKey = 'a1f3554f0ce912f2a51bc748448c01b8';

function ForecastTab({coordinates}) {
    const [forecasts, setForecasts] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchForecasts() {

            toggleLoading(true);

            try {
                toggleError(false);

                const result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&lang=nl`);
                const fiveDayForecast = result.data.list.filter((singleForecast) => {
                    return singleForecast.dt_txt.includes("12:00:00");
                });
                setForecasts(fiveDayForecast);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        if (coordinates) {
            fetchForecasts();
        }

    }, [coordinates]);

    return (<div className="tab-wrapper">
            {loading && <span>
                Loading...
            </span>}
            {error && <span className="tab-wrapper">
                Er is iets misgegaan met het ophalen van de data
            </span>}
            {forecasts.length === 0 && !error && <span className="no-forecast">
                Zoek eerst een locatie om het weer voor deze week te bekijken
            </span>}
            {forecasts.map((oneForecast) => {
                return (<article className="forecast-day"
                                 key={oneForecast.dt}>
                        <p className="day-description">
                            {createDateString(oneForecast.dt)}
                        </p>

                        <section className="forecast-weather">
                            <span>
                                {kelvinToCelcius(oneForecast.main.temp)}
                            </span>
                            <span className="weather-description">
                                {oneForecast.weather[0].description}
                            </span>
                        </section>
                    </article>)
            })}
        </div>);
}

export default ForecastTab;
