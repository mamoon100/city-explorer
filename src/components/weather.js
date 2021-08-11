// http://localhost:8080/weather?lat=47.60621&lon=-122.33207&searchQuery=Seattle
import React, { Component } from "react";
import { Card, Spinner } from "react-bootstrap";
import WeatherDay from "./WeatherDay";

export default class Weather extends Component {
  render() {
    return (
      <>
        <Card.Header>
          {this.props.city ? (
            this.props.city
          ) : (
            <Spinner animation="border" role="status" variant="primary" />
          )}
        </Card.Header>
        {this.props.city && (
          <Card.Body className="weather">
            <WeatherDay data={this.props.data} />
          </Card.Body>
        )}
      </>
    );
  }
}
