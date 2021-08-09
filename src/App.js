import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./style/style.css";
import "./style/style.sass";
import Main from "./components/main";
import Footer from "./components/footer";
import Header from "./components/header";

export default class App extends Component {
  render() {
    return (
      <>
        <Header />

        <Main />
        <Footer />
      </>
    );
  }
}
