import React, { Component } from "react";
import { Card, Badge } from "react-bootstrap";

export default class Map extends Component {
  render() {
    return (
      <>
        <Card.Img src={this.props.src} />
        <Card.Body>
          <Card.Title>
            {this.props.displayName}
            <Badge bg="secondary">City Name</Badge>
          </Card.Title>
          <Card.Text>
            {this.props.lon} <Badge bg="secondary">Longitude</Badge>
          </Card.Text>
          <Card.Text>
            {this.props.lat} <Badge bg="secondary">Latitude</Badge>
          </Card.Text>
        </Card.Body>
      </>
    );
  }
}
