import React, { Component } from 'react';
import Header from '../Common/Header';
import Slider from '../Elements/Slider';
import Statistics from '../Elements/Statistics';
import FavoriteDestinations from '../Elements/FavoriteDestinations';
import FavoriteLocalCreations from '../Elements/FavoriteLocalCreations';
import FavoriteAccomodations from '../Elements/FavoriteAccomodations';
import Footer from '../Common/Footer';

class Home extends Component {
  componentDidMount() {
    function loadScript(src) {

      return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', function () {
            resolve();
        });
        script.addEventListener('error', function (e) {
            reject(e);
        });
        document.body.appendChild(script);
        document.body.removeChild(script);
      })
    };

    loadScript('./assets/js/custom.js');

  };
  
  render() {
    return (
      <>
        <Header />
        <div className="page-content">
          <Slider />
          <FavoriteDestinations />
          <FavoriteLocalCreations />
          <FavoriteAccomodations />
          <Statistics />
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;