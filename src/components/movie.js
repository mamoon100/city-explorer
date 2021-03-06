import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

export default class Movie extends Component {
  render() {
    return (
      <>
        <p>{`This Info Was Gathered in ${this.props.movieData.time}`}</p>
        <Carousel>
          {this.props.movieData.data.map((item, index) => {
            return (
              <Carousel.Item key={item.title + index}>
                <img
                  className="d-block w-100"
                  src={
                    item.src.includes("null")
                      ? "https://logosvector.net/wp-content/themes/iLoveLogos/img/not-available.jpg"
                      : item.src
                  }
                  alt={item.title}
                />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </>
    );
  }
}
