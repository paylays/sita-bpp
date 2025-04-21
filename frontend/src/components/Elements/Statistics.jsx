import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import axios from 'axios';

var bgimg1 = require('./../../images/background/background.jpg');
var bgimg2 = require('./../../images/background/bg-5.png');

const Statistics = () => {
  const [destinations, setDestinations] = useState(0);
  const [localCreations, setLocalCreations] = useState(0);
  const [accommodations, setAccommodations] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, localRes, accRes] = await Promise.all([
          axios.get("http://localhost:5000/api/destinations"),
          axios.get("http://localhost:5000/api/localcreations"),
          axios.get("http://localhost:5000/api/accomodations"),
        ]);

        setDestinations(destRes.data.length);
        setLocalCreations(localRes.data.length);
        setAccommodations(accRes.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="section-full overlay-wraper sx-bg-secondry mobile-page-padding  p-t80 p-b50 bg-parallax ml-auto" data-stellar-background-ratio="0.5" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
        <div className="overlay-main bg-black opacity-05" />
        <div className="container">
          <div className="section-content">
            <div className="counter-blocks">
              <div className="row">
                <StatisticBox title="Destinasi Wisata" count={destinations} />
                <StatisticBox title="Pelaku Ekraf" count={localCreations} />
                <StatisticBox title="Akomodasi" count={accommodations} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const StatisticBox = ({ title, count }) => (
  <div className="col-xl-4 col-md-6 m-b30">
    <div
      className="sx-count text-white sx-icon-box-wraper bg-repeat p-a30"
      style={{ backgroundImage: `url(${bgimg2})` }}
    >
      <h2 className="m-t0 sx-text-primary text-right">
        <span className="counter">
          <CountUp end={count} duration={5} />
        </span>
      </h2>
      <h4 className="m-b0">{title}</h4>
    </div>
  </div>
);

export default Statistics;