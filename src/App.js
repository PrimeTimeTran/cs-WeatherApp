import React from "react";
import { Spinner } from "react-bootstrap";

import Nav from "./components/Nav";

import "./App.css";
import { cities, unsplash } from "./utils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgImg: null,
      weather: null,
      temperature: "",
      isLoading: true,
      locationName: ""
    };
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.getWeather(latitude, longitude);
    });
  };

  getBackgroundImage() {
    const { locationName } = this.state;

    unsplash.search
      .photos(locationName || "Vietnam", 1)
      .then(resp => resp.json())
      .then(json => {
        const item =
          json.results[Math.floor(Math.random() * json.results.length)];
        this.setState({ bgImg: item.urls.full });
      })
      .catch(error => {
        console.log("getBackgroundImage fetch failed");
      });
  }

  getWeather = (latitude, longitude) => {
    const API_KEY = "3de6162d3745365b168ade2bbe4e1d66";
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    console.log("fetching");
    fetch(api)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            `Error ${response.status} is ${response.statusText}`
          );
          throw error;
        }
      })
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            isLoading: false,
            locationName: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            weatherDescription: data.weather[0].description
          },
          this.getBackgroundImage
        );
      })
      .catch(error => {
        alert(`Data could not be fetched ${error.message}`);
      });
  };

  renderCities() {
    return cities.map(city => {
      return (
        <button
          key={city.latitude}
          variation="primary"
          className="city-button"
          onClick={() => this.getWeather(city.latitude, city.longitude)}
        >
          {city.name}
        </button>
      );
    });
  }

  renderSpinner() {
    return (
      <Spinner
        size="lg"
        variant="info"
        animation="border"
        style={{
          width: 200,
          height: 200,
          color: "#37FF8B",
          marginTop: "40vh",
          marginLeft: "45vw"
        }}
      />
    );
  }

  render() {
    const {
      bgImg,
      isLoading,
      locationName,
      temperature,
      weatherDescription,
      country
    } = this.state;
    const temperatureC = (temperature - 273.15).toFixed(2);
    const temperatureF = (((temperature - 273.15) * 9) / 5 + 32).toFixed(2);

    if (isLoading) return this.renderSpinner();

    return (
      <div
        style={{ backgroundImage: `url(${bgImg})` }}
        className="container-fluid text-white my-auto app"
      >
        <Nav />
        <div className="container mx-auto my-4 py-4" style={{ margin: 0 }}>
          <div className="row justify-content-center text-center">
            <div className="weather-container">
              <h2 className="col-12 location">
                {locationName}, {country}
              </h2>
              <h1 className="col-12 temperature">
                {temperature && `${temperatureC} °C / ${temperatureF} °F`}
              </h1>
              <h2 className="col-12 weather-description">
                {weatherDescription}
              </h2>
              <p className="col-12 author">
                <span role="img" aria-labelledby="heart">
                  ❤️️️️
                </span>
                PrimeTimeTran
              </p>
            </div>
          </div>
        </div>
        <div className="sidebar">{this.renderCities()}</div>
      </div>
    );
  }
}

export default App;
