import React, { Component } from 'react';
import CountUp from 'react-countup';

var bgimg1 = require('./../../images/background/bg-1.jpg');
var bgimg2 = require('./../../images/background/bg-5.png');

class Statistics extends Component {
  render() {
    return (
      <>
        <div className="section-full overlay-wraper sx-bg-secondry mobile-page-padding  p-t80 p-b50 bg-parallax ml-auto" data-stellar-background-ratio="0.5" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
          <div className="overlay-main bg-black opacity-05" />
          <div className="container">
            <div className="section-content">
              <div className="counter-blocks">
                <div className="row">
                  <div className="col-xl-4 col-md-6 m-b30 ">
                    <div className="sx-count text-white sx-icon-box-wraper bg-repeat p-a30" style={{ backgroundImage: 'url(' + bgimg2 + ')' }}>
                      
                      {/* <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                          <path d="M6.36407 6.364C9.87878 2.84929 15.5773 2.84929 19.092 6.364L12.728 12.728M6.36407 6.364C2.84935 9.87872 2.84935 15.5772 6.36407 19.0919L12.728 12.728M6.36407 6.364C6.36407 6.364 12.0417 6.38489 15.5564 9.89961M6.36407 6.364C6.36407 6.364 6.38483 12.0417 9.89955 15.5565M12.728 12.728L20 20.0001" stroke="#fffafa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                        </g>
                      </svg> */}
                      
                      <h2 className="m-t0 sx-text-primary text-right"><span className="counter"><CountUp end={22} duration={5} /></span></h2>
                      <h4 className="m-b0">Destinasi Wisata</h4>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 m-b30">
                    <div className="sx-count  text-white sx-icon-box-wraper bg-repeat p-a30" style={{ backgroundImage: 'url(' + bgimg2 + ')' }}>
                      <h2 className="m-t0  sx-text-primary text-right"><span className="counter"><CountUp end={87} duration={5} /></span></h2>
                      <h4 className="m-b0">Pelaku Ekraf</h4>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 m-b30">
                    <div className="sx-count  text-white sx-icon-box-wraper bg-repeat p-a30" style={{ backgroundImage: 'url(' + bgimg2 + ')' }}>
                      <h2 className="m-t0  sx-text-primary text-right"><span className="counter"><CountUp end={120} duration={5} /></span></h2>
                      <h4 className="m-b0">Akomodasi</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Statistics;