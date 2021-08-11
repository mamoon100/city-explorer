import React, { Component } from "react";
import { Card } from "react-bootstrap";
import broken from "../assets/broken clouds.png";
import light from "../assets/Light rain.png";
import scattered from "../assets/scattered clouds.png";

export default class WeatherDay extends Component {
  render() {
    return (
      <>
        {this.props.data.slice(0, 3).map((item, index) => {
          return (
            <Card key={index}>
              <Card.Title>
                <img
                  src={
                    item.description === "Broken clouds"
                      ? broken
                      : item.description === "Light rain"
                      ? light
                      : scattered
                  }
                  alt={item.description}
                />
              </Card.Title>
              <Card.Body>
                <p>Low: {item.min}</p>
                <p>Max: {item.max}</p>
                <p>Date: {item.date}</p>
              </Card.Body>
            </Card>
          );
        })}
      </>
    );
  }
}
