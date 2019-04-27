import React, { Component } from 'react';
import Header from './Components/Header';
import About from './Components/About';
import Adoption from './Components/Adoption';
import Footer from './Components/Footer';
import './styles/project3-index.scss';


class App extends Component {


    render() {
        return (
          <div>
            <Header
                h1="North Toronto Cat Rescue"
                h2="Adopt don't shop!"
            />
            <About
                h2="About Us"
                p1="North Toronto Cat Rescue (NTCR) is a registered non-profit no-kill cat shelter in its 30th year of continuous community service. Established by Donna Cox, our goal is to take vulnerable cats off the streets, where they can live in a safe and nurturing environment until they find their permanent home."
                p2="Over the past 30 years, more than 3,000 cats have benefited from NTCR and our group of volunteers, from rescuing them and provide veterinary care, to socializing and finally adoption. NTCR is unique among other shelters. Our no cage policy means our cats are free to roam and play, where they are provided with the opportunity to learn to interact with other animals and humans. This helps to simulate a life style that is as close to the home life they will have when they find their forever homes."
            />
            <Adoption
                h2="Available for adoption"
                content="Check out these cats that are currently living in the shelter! If you are interested in adopting one our fur babies, please click on the link on each cat."
            />
            <Footer/>
          </div>
        );
    }
}

export default App;
