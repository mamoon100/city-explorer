// http://localhost:8080/weather?lat=47.60621&lon=-122.33207&searchQuery=Seattle
import React, { Component } from "react";
import { Card, Spinner } from "react-bootstrap";
import broken from "../assets/broken clouds.png";
import light from "../assets/Light rain.png";
import scattered from "../assets/scattered clouds.png";

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
          </Card.Body>
        )}
      </>
    );
  }
}
