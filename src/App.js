import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
         <div className="particles">
            <Particles params={particlesOptions} />
          </div>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
       {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
