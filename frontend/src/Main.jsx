import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/Common/ScrollToTop';
import Switcher from './components/Elements/Switcher';

import Home from './components/Pages/Home';
import Destination from './components/Pages/Destination';
import LocalCreation from './components/Pages/LocalCreation';
import Accomodation from './components/Pages/Accomodation';
import Event from './components/Pages/Event';
import AboutUs from './components/Pages/AboutUs';

import Error from './components/Pages/Error';

import DestinationDetail from './components/Pages/DestinationDetail';
import LocalCreationDetail from './components/Pages/LocalCreationDetail';
import AccomodationDetail from './components/Pages/AccomodationDetail';
import EventDetail from './components/Pages/EventDetail';

class Main extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <ScrollToTop />
        <div className="page-wrapper">
          <Switcher />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/destinasi' element={<Destination/>} />
            <Route path='/kreasi-lokal' element={<LocalCreation/>} />
            <Route path='/akomodasi' element={<Accomodation/>} />
            <Route path='/acara' element={<Event/>} />
            <Route path='/tentang-kami' element={<AboutUs/>} />

            <Route path='/destination-detail' element={<DestinationDetail/>} />
            <Route path='/kreasi-lokal-detail' element={<LocalCreationDetail/>} />
            <Route path='/akomodasi-detail' element={<AccomodationDetail/>} />
            <Route path='/acara-detail' element={<EventDetail/>} />
            
            <Route path='*' element={<Error/>} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;