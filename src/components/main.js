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
dotenv.config();
const myKey = process.env.REACT_APP_myKey;
// console.log(myKey);

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
      });
  };
  handleWeatherArray = () => {
    this.setState({
      city: "",
    });

    /* `http://localhost:8080/weather?lat=${this.state.lat}&lon=${
          this.state.lon
        }&searchQuery=${this.state.displayName.split(",")[0]}` */
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
      .catch((err) => {});
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
                    <Card.Img src={this.state.src} />
                  )}

                  <Card.Body>
                    <Card.Title>
                      {this.state.displayName}
                      <Badge bg="secondary">City Name</Badge>
                    </Card.Title>
                    <Card.Text>
                      {this.state.lon} <Badge bg="secondary">Longitude</Badge>
                    </Card.Text>
                    <Card.Text>
                      {this.state.lat} <Badge bg="secondary">Latitude</Badge>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Weather data={this.state.data} city={this.state.city} />
              </Col>
            </Row>
          )}
        </Container>
      </main>
    );
  }
}
