import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const fetchData = async (location) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=102b10ca3b80a10e8595df2562c409ca&units=metric`);
      if (response.data.cod && response.data.cod === "404") {
        throw new Error('City not found');
      }
      setData(response.data);
    } catch (error) {
      alert('City not found');
      // setData({});
    }
    setLocation('');
  };

  const handleSearch = () => {
    fetchData(location);
  };

  useEffect(() => {
    const fetchDataForCurrentLocation = async () => {
      try {
        const position = await getCurrentLocation();
        const city = await fetchCityName(position.coords.latitude, position.coords.longitude);
        setLocation(city);
        fetchData(city);
      } catch (error) {
        console.error('Error fetching data for current location:', error);
      }
    };

    fetchDataForCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const fetchCityName = async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await response.json();
      return data.address.city;
    } catch (error) {
      console.error('Error fetching city name:', error);
      return '';
    }
  };

  return (
    <div className="app">
      <div className='search'>
        <input
          type='text'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyUp={event => event.key === 'Enter' && handleSearch()}
          placeholder='Enter City Name'
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
          </div>
          <div className='discription'>
            {data.weather && <p>{data.weather[0].main}</p>}
          </div>
        </div>
        {
          data.name &&
          <div className='bottom'>
            <div className='feels'>
              {data.main && <p className='bold'>{data.main.feels_like}°C</p>}
              <p>Feels good</p>
            </div>
            <div className='humidity'>
              {data.main && <p className='bold'>{data.main.humidity}%</p>}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind && <p className='bold'>{data.wind.speed}MPH</p>}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
