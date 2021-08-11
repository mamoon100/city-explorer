import React, { Component } from "react";
import { Card, Spinner, Carousel } from "react-bootstrap";

export default class Movie extends Component {
  /*<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=First slide&bg=373940"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Second slide&bg=282c34"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel> */
  render() {
    return (
      <Carousel>
        {this.props.movieData.map((item, index) => {
          console.log(item);
          return (
            <Carousel.Item key={item.title}>
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
    );
  }
}

/*

<Card.Header>
          {this.props.movieData ? (
            this.props.movieData.title
          ) : (
            <Spinner animation="border" role="status" variant="primary" />
          )}
        </Card.Header>
        {this.props.movieData && (
          <Card.Body className="movie">
            {this.props.movieData.slice(0, 3).map((item, index) => {
              console.log(item);
              return (
                <Card key={index}>
                  <Card.Title>
                    <img src={item.src} alt={item.description} />
                  </Card.Title>
                  <Card.Body>
                    {/* <p>Low: {item.min}</p>
                    <p>Max: {item.max}</p>
                    <p>Date: {item.date}</p>} */
//         </Card.Body>
//         </Card>
//       );
//     })}
//   </Card.Body>
// )}
