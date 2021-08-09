// http://localhost:8080/weather?lat=47.60621&lon=-122.33207&searchQuery=Seattle
import React, { Component } from "react";
import { Card } from "react-bootstrap";
import broken from "../assets/broken clouds.png";
import light from "../assets/Light rain.png";
import scattered from "../assets/scattered clouds.png";

export default class Weather extends Component {
  render() {
    console.log(this.props.data);
    return (
      <Card className="mt-2">
        <Card.Header>
          {this.props.city
            ? this.props.city
            : "Please Choose Amman, Paris or Seattle"}
        </Card.Header>
        {this.props.city && (
          <Card.Body className="weather">
            {this.props.data.map((item, index) => {
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
          </Card.Body>
        )}
      </Card>
    );
  }
}
