import React, {useEffect, useState} from 'react';
import './TodayTab.css';
import axios from "axios";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";



function TodayTab({coordinates}) {
	const [todaysWeather, setTodaysWeather] = useState({});
	const [error, toggleError] = useState(false);
	const [loading, toggleLoading] = useState(false);

	useEffect(() => {
		async function fetchForecasts() {

			toggleLoading(true);

			try {
				toggleError(false);

				const result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&lang=nl`);

				console.log(result);

				setTodaysWeather(result.data.list.slice(0, 3));
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

	return (
		<div className="tab-wrapper">
			{loading && <span>
                Loading...
            </span>}
			{error && <span className="tab-wrapper">
                Er is iets misgegaan met het ophalen van de data
            </span>}
			{todaysWeather.length === 0 && !error && <span className="no-forecast">
                Zoek eerst een locatie om het weer voor deze week te bekijken
            </span>}
			{console.log(todaysWeather)}

			<div className="chart">
				{todaysWeather.map((oneWeather) => {
					return (
						<WeatherDetail
							temp={oneWeather.main.temp}
							typ={oneWeather.weather[0].main}
							description={oneWeather.weather[0].description}
							key={oneWeather.sea_level}
						/>
					)
				})}
			</div>
			<div className="legend">
				{todaysWeather.map((weather) => {
					return <span key={`${weather.dt}-timestamp`}>{weather.dt}</span>
				})}
			</div>
		</div>
	);
}

export default TodayTab;
