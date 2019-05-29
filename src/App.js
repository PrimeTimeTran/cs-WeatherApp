import React from 'react';
import { NavItem, Navbar, NavDropdown, Nav, Spinner } from 'react-bootstrap';
import Unsplash from 'unsplash-js';
import './App.css';

const unsplash = new Unsplash({
  applicationId: "e2cce345132cafbef526b95e7e2dd9f131151f45cfc131cef1f5c60f25b4f138",
  secret: "373b82e616caed1b2cba06fdeaa66a610850706f95bd2a4a98289cb97c0e1006"
});

const cities = [
  {
    name: 'Saigon',
    latitude: 10.817141,
    longitude:  106.707954
  },
  {
    name: 'Paris',
    latitude: 48.856613,
    longitude:  2.352222
  },
  {
    name: 'New York',
    latitude: 40.712776,
    longitude:  -74.005974
  },
  {
    name: 'Miami',
    latitude: 25.761681,
    longitude:  -80.191788
  },
  {
    name: 'San Francisco',
    latitude: 37.774929,
    longitude:  -122.419418
  },
  {
    name: 'Moscow',
    latitude: 55.755825,
    longitude:  37.617298
  },
  {
    name: 'Tokyo',
    latitude: 35.689487,
    longitude:  139.691711
  },
  {
    name: 'Vancouver',
    latitude: 49.282730,
    longitude:  -123.120735
  },
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: "",
      temperature: "",
      weather: null,
      isLoading: true,
      bgImg: null,
    }; 
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.getWeather(latitude, longitude);
    });
  };

  getBackgroundImage() {
    const { locationName } = this.state

    unsplash.search.photos(locationName || 'Vietnam', 1).then(resp => resp.json())
      .then(json => {
        const item = json.results[Math.floor(Math.random()*json.results.length)];
        this.setState({ bgImg: item.urls.full })
      })
      .catch(error => { 
        console.log('getBackgroundImage fetch failed')
      });
  }

  getWeather = (latitude, longitude) => {
    const API_KEY = "3de6162d3745365b168ade2bbe4e1d66";
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    fetch(api)
      .then(response => {
        if (response.ok) {
          return response
        }
        else { 
          let error = new Error(`Error ${response.status} is ${response.statusText}`);
          throw error;
        }
       })
      .then(response => response.json())
      .then(data => {
        console.log('data', data)
        this.setState({
          locationName: data.name,
          temperature: data.main.temp,
          weatherDescription: data.weather[0].description,
          country: data.sys.country,
          isLoading: false,
        }, () => this.getBackgroundImage());
      })
      .catch(error => { 
        alert(`Data could not be fetched ${error.message}`)
      });
  };

  renderCities() {
    
    return cities.map(city => {
      return <button style={{ fontSize: 30, width: '100%', height: '100%' }} variation="primary" onClick={() => this.getWeather(city.latitude, city.longitude)}>{city.name}</button>
    })
  }

  render() {
    const { bgImg, isLoading, locationName, temperature, weatherDescription, country } = this.state;
    const temperatureC = (temperature - 273.15).toFixed(2);
    const temperatureF = (((temperature - 273.15) * 9) / 5 + 32).toFixed(2);

    if (isLoading) {
      return <Spinner variant="info" animation="border" style={{ color: "#37FF8B", marginLeft: '45vw', marginTop: '40vh', height: 200, width: 200 }} size="lg" />
    }
    
    return (
      <div className="container-fluid text-white my-auto" style={{ margin: 0, height: '100vh', backgroundSize: 'cover', backgroundImage: `url(${bgImg})` }}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ marginRight: 0}}>
          <Navbar.Brand href="#home">Weather</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>;
        <div className="container mx-auto my-4 py-4" style={{ margin: 0 }}>
          <div className="row justify-content-center text-center">
            <div style={{ borderRadius: 25, padding: 100, marginTop: '25vh', backgroundColor: 'rgba(52, 52, 52, 0.7)' }}>
              <h2 className="col-12" style={{ fontSize: 70, fontWeight: 'bold', borderBottomWidth: 1, borderBottomStyle: 'solid' }}>{locationName}, {country}</h2>
              <h1 className="col-12" style={{ fontSize: 50, fontWeight: 'bold', color: '#37FF8B' }}>
                {temperature && `${temperatureC} °C / ${temperatureF} °F`}
              </h1>
              <h2 className="col-12" style={{ fontSize: 40, fontWeight: 'bold' }}>{weatherDescription}</h2>
              <p className="col-12" style={{ fontSize: 20, fontWeight: 'bold', color: '#51D6FF' }}>❤️PrimeTimeTran</p>
            </div>
          </div>
        </div>
        <div onClick={this.go} style={{ left: 0, position: 'fixed', height: '100vh', width: 200, backgroundColor: 'red', bottom: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column' }}>
          {this.renderCities()}
        </div>
      </div>
    );
  }
}

export default App;
