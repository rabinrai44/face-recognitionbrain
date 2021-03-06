import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

// initialize clarifai API key
const app = new Clarifai.App({
  apiKey: 'f7f1b33a25374dd3999f3b65112299e5'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '124',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  // Update user 
  loadUser = (data) => {
    this.setState({user: {
        id: data.user,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
}

  // Calculate Face Location
  calculateFaceLocation = (data) => {
    // getting data
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // DOM manipulation inputImage 
    const image = document.getElementById('inputImage');
    // IMG height & width calculation
    const width = Number(image.width);
    const height = Number(image.height);
    // test into 
    // console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
// face display method 
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input });

  app.models
  .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response))) // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      .catch(err => console.log(err));
}
// on Route Change func
onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState({isSignedIn: false})
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route:  route});
}
  render() {
    // Clean structure this.state 
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
         <div className="particles">
            <Particles params={particlesOptions} />
          </div>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm  
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit} 
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
        </div> 
        : (
          route === 'signin' ?

          <Signin onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
        }

      </div>
    );
  }
}

export default App;
