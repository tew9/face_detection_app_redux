import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import './App.css';
import Particles from 'react-particles-js';
import { setInput, setRoute, setIssignedIn, dataReceptor } from './app_actions.js'

//mapping state to props.
const mapStateToProps = state =>{
    return({
        input: state.input,
        route: state.route,
        issignedIn: state.issignedIn,
        imageURL: state.imageURL,
        box:state.box,
        users: state.user,
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInputChange: (event) => dispatch(setInput(event.target.value)),
        loadUsers: (data) => dispatch(dataReceptor(data))
    }
}

//initializig the particles
const particleOptions = {
    "particles": {
        "number": {
            "value": 200
        },
        "size": {
            "value": 2
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            }
        }
    }
}

//initializing the state.
const initstate = {
        input: '',
        imageURL: '',
        box:{},
        route: 'signin',
        issignedIn: false,
        user:{
            id: '',
            email: '',
            name: '',
            entries: 0,
            joined: ''
    }
}

//defining the App
class App extends Component {
    constructor(){
        super();
        this.state = initstate;
    }

    calculateFaceBox = (data) => {
        const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('img');
        const width = Number(image.width)
        const height = Number(image.height)
        return {
            leftCol: faceBox.left_col * width,
            topRow: faceBox.top_row * height,
            rightCol: width - (faceBox.right_col * width),
            bottomRow: height - (faceBox.bottom_row * height)
        }
    }

    displayfaceBox = (boxnumber) => {
        this.setState({box: boxnumber})
    }

    // onInputChange = (event) => {
    //     this.setState({input: event.target.value})
    // }

    onButtonClick = () => {
        this.setState({imageURL: this.props.input})
        fetch('http://localhost:30002/imageurl', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              input: this.props.input,
            })
        }).then(response => response.json())
        .then(response => {
            //if we get response from clarified, update the rank(entries)
            if(response){
                fetch('http://localhost:30002/rank', {
                    method: 'put',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                      id: this.props.users.id,
                    })
                }).then(response => response.json())
                .then(entries => {
                    console.log(this.props.users.id)
                    if(entries){
                        this.setState(Object.assign(this.state.user, {entries: entries}))
                    }
                })
            }
            this.displayfaceBox(this.calculateFaceBox(response))
        }).catch(err => console.log(err));
    }

    // loadUsers = (data) =>{
    //     this.setState({ user:{
    //         id: data.id,
    //         email: data.email,
    //         name: data.name,
    //         entries: data.entries,
    //         joined: data.joined,
    //         }
    //     });
    // }

    onRoutechange = (route) =>{
        if(route === 'signin'){
            this.setState(initstate);
        }else if(route === 'home'){
            this.setState({issignedIn: true})
        }
        this.setState({route: route})
    }

    render() {
        console.log('loaded', this.props.users)
        const { imageURL, box, route, issignedIn} = this.state; 
        const { onInputChange, loadUsers } = this.props;
      return(
        <div className='App'>
            <Particles className='Particle'
                params = { particleOptions }
            />
            <Navigation 
                name = {this.state.user.name}
                changeRoute = { this.onRoutechange }
                issignedIn = { issignedIn }
            />
            <Logo/>
            {
                route === 'home'
                ?<>
                    <Rank name = { this.state.user.name} 
                    entries={ this.state.user.entries } 
                    />

                    <ImageLinkForm 
                        onInputChange = {onInputChange}
                        onButtonClick = {this.onButtonClick}/>
                    <FaceRecognition
                        image = {imageURL}
                        box = {box}/>
                </>
                :(
                    route === 'signin'
                    ?   <Signin loadUsers = { loadUsers } onsignin = { this.onRoutechange } />
                    :   <Register loadUsers = { this.loadUsers } onsignup = { this.onRoutechange }/>   
                 )
            }
        </div>
      )
    }
  }
  
//   export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
  