import React, { Component } from "react";
import Movie from "./movie";

export default class Movies extends Component {
  render() {
    return <Movie movieData={this.props.movieData} />;
  }
}
