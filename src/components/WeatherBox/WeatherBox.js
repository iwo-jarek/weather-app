import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const [weather, setWeather] = useState('');
  const[pending, setPending] = useState(false);
  const [error, setError]  = useState(false);

  const handleCityChange = useCallback(city => {
    setPending(true);
    setError(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9d5231582fe1449e527f2d6d797e21a8&units=metric`)
    .then(res => {
      if (res.status === 200) {
        return res.json()
          .then(data => {
            setWeather({
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            });
            setPending(false);
          });
      } else {
        setError(true)
      }
    });
  }, []);

  return (
    <section>
      <PickCity handleCityChange={handleCityChange} />
      { (weather && !error) && <WeatherSummary {...weather} />}
      {(pending && !error) && <Loader />}
      {error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;