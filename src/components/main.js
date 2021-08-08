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
// import dotenv from "dotenv";
// dotenv.config();
// const myKey = process.env.REACT_APP_myKey;
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
    };
  }
  handleLocation = (e) => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `https://eu1.locationiq.com/v1/search.php?key=pk.4c2df93362745f52672fbdcb21fb9301&q=${this.state.location}&format=json`
      )
      .then((res) => {
        console.log(res);
        this.setState({
          err: false,
          lon: res.data[0].lon,
          lat: res.data[0].lat,
          displayName: res.data[0].display_name,
          src: `https://maps.locationiq.com/v3/staticmap?key=pk.4c2df93362745f52672fbdcb21fb9301&center=${res.data[0].lat},${res.data[0].lon}&zoom=16&size=600x600&markers=icon:large-red-cutout|${res.data[0].lat},${res.data[0].lon}|${res.data[0].lat},${res.data[0].lon}`,
        });
      })
      .catch((err) => {
        this.setState({
          err: true,
          lon: "",
          lat: "",
          displayName: "",
          src: "",
        });
      })
      .then(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <main>
        <Container style={{ width: "30rem" }}>
          {this.state.err && (
            <Alert variant="danger"> No location in this name</Alert>
          )}
          <Row lg={12} xs={12}>
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
          </Row>
          {this.state.displayName && (
            <Row>
              <Col>
                <Card>
                  <Row>
                    {this.state.loading ? (
                      <Spinner
                        animation="border"
                        role="status"
                        variant="primary"
                      />
                    ) : (
                      <Card.Img src={this.state.src} />
                    )}
                  </Row>
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
            </Row>
          )}
        </Container>
      </main>
    );
  }
}
