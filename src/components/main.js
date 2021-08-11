import React, { Component } from "react";
import axios from "axios";
import {
  InputGroup,
  Button,
  Container,
  Row,
  Col,
  FormControl,
  Card,
  Badge,
  Alert,
  Spinner,
} from "react-bootstrap";
import Weather from "./weather";
import dotenv from "dotenv";
import Movies from "./Movies";
import Map from "./map";
dotenv.config();
const myKey = process.env.REACT_APP_myKey;

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      location: "",
      lon: "",
      lat: "",
      displayName: "",
      src: "",
      err: false,
      data: [],
      moviesArray: [],
      weatherAndMovie: true,
    };
  }
  handleLocation = (e) => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `https://eu1.locationiq.com/v1/search.php?key=${myKey}&q=${this.state.location}&format=json`
      )
      .then((res) => {
        this.setState({
          err: false,
          lon: res.data[0].lon,
          lat: res.data[0].lat,
          displayName: res.data[0].display_name,
          src: `https://maps.locationiq.com/v3/staticmap?key=${myKey}&center=${res.data[0].lat},${res.data[0].lon}&zoom=16&size=600x600&markers=icon:large-red-cutout|${res.data[0].lat},${res.data[0].lon}|${res.data[0].lat},${res.data[0].lon}`,
        });
      })
      .catch((err) => {
        this.setState({
          err: true,
          lon: "",
          lat: "",
          displayName: "",
          src: "",
          city: false,
        });
      })
      .then(() => {
        this.setState({
          loading: false,
        });
        this.handleWeatherArray();
        this.handleMovie();
      });
  };
  handleWeatherArray = () => {
    this.setState({
      city: "",
    });

    axios
      .get(
        `https://city-explorer-mamoun-api.herokuapp.com/weather?lat=${
          this.state.lat
        }&lon=${this.state.lon}&searchQuery=${
          this.state.displayName.split(",")[0]
        }`
      )
      .then((res) => {
        this.setState({
          city: this.state.displayName.split(",")[0],
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err");
      });
  };
  handleMovie = () => {
    axios
      .get(
        `https://city-explorer-mamoun-api.herokuapp.com/movie?city=${
          this.state.displayName.split(",")[0]
        }`
      )
      .then((res) => {
        this.setState({
          moviesArray: res.data,
        });
      })
      .catch((err) => {
        console.log("err");
      });
  };

  render() {
    return (
      <main>
        <Container>
          {this.state.err && (
            <Alert variant="danger"> No location in this name</Alert>
          )}

          <Row>
            <Col>
              <InputGroup
                className="mb-3"
                onChange={(e) => {
                  this.setState({
                    // @ts-ignore
                    location: e.target.value,
                  });
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    this.handleLocation(e);
                  }
                }}
              >
                <FormControl
                  placeholder="City Name"
                  aria-label="City Name"
                  id="location"
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={this.handleLocation}
                >
                  Explore!
                </Button>
              </InputGroup>
            </Col>
          </Row>
          {this.state.displayName && (
            <Row lg={12}>
              <Col lg={6}>
                <Card className="mt-2">
                  {this.state.loading ? (
                    <Spinner
                      animation="border"
                      role="status"
                      variant="primary"
                    />
                  ) : (
                    <Map
                      src={this.state.src}
                      displayName={this.state.displayName}
                      lon={this.state.lon}
                      lat={this.state.lat}
                    />
                  )}
                </Card>
              </Col>
              <Col lg={6}>
                <Card className="mt-2">
                  {this.state.weatherAndMovie ? (
                    <Weather data={this.state.data} city={this.state.city} />
                  ) : (
                    <Movies movieData={this.state.moviesArray} />
                  )}
                </Card>
                <Button
                  style={{
                    width: "100%",
                  }}
                  className="mt-2"
                  variant="dark"
                  onClick={() => {
                    this.setState({
                      weatherAndMovie: !this.state.weatherAndMovie,
                    });
                  }}
                >
                  {this.state.weatherAndMovie ? "Show Movies" : "Show Weather"}
                </Button>
              </Col>
            </Row>
          )}
        </Container>
      </main>
    );
  }
}
