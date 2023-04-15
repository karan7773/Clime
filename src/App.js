import React, { useState } from 'react';

function App() {

  const [data ,setData]=useState({});
  const [location ,setlocation]=useState('');

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=102b10ca3b80a10e8595df2562c409ca&units=metric`

  function search(){
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(data => {
      setData(data);
      // console.log(data);
      //console.log(data.name);
      //console.log(data.main)
      //console.log(data.main.temp)
      //console.log(data.main.feels_like)
      //console.log(data.main.humidity)
      //console.log(data.weather[0].main)
    })
    .catch(error => {
      // console.log(error);
      setData({});
      alert('City not found');
      
    });
    setlocation('');
  }

  return (
    <div className="app">
      <div className='search'>
        <input 
          type='text' 
          value={location} 
          onChange={event => setlocation(event.target.value)}
          onKeyUp={event => event.key === 'Enter' && search()}
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
              {data.wind && <p className='bold'>{data.wind.speed}MPH</p> }
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
