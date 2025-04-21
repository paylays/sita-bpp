import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';

var bgimg1 = require('./../../images/background/cross-line2.png');

const FavoriteLocalCreations = () => {
  const [favLocalCreations, setFavLocalCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/localcreations')
      .then(response => {
        setFavLocalCreations(response.data.slice(0, 5)); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching localcreations:', error);
        setLoading(false);
      });
  }, []);

  const options = {
    loop:true,
    autoplay:false,
    center: false,
    items:3,
    margin:40,
    nav:true,
    dots: false,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive:{
      0:{
        items:1,
        margin:15
      },
      640:{
        items:2,
        margin:15
      },			
      800:{
        items:3,
        margin:20,
      },
      1200:{
        items:4
      }			
    }
  };

  const categoryColors = {
    "Kuliner": "rgba(229, 62, 62, 0.5)", 
    "Kriya": "rgba(49, 130, 206, 0.5)", 
    "Fashion": "rgba(56, 161, 105, 0.5)", 
    "Seni Rupa": "rgba(214, 158, 46, 0.5)", 
    "Seni Pertunjukan": "rgba(128, 90, 213, 0.5)" 
  };
  
  return (
    <>
      <div className="section-full p-tb80 bg-white inner-page-padding">
        <div className="container-fluid">
          <div className="section-content">
            {/* TITLE START */}
            <div className="section-head">
              <div className="sx-separator-outer separator-right">
                <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                  <h3 className="sep-line-one">Ekraf Terfavorit 2025</h3>
                </div>
              </div>
            </div>
            {/* TITLE END */}
            <div className="work-carousel-outer">
            {loading ? (
              <p>Loading...</p>
            ) : favLocalCreations.length > 0 ? (
              <OwlCarousel className="owl-carousel mfp-gallery project-carousel project-carousel4 owl-btn-vertical-center" {...options}>
                {favLocalCreations.map((item, index) => (
                  <div key={index} className={`${item.filter} item fadingcol overflow-hide`}>
                    <div className="sx-box image-hover-block">
                      {item.kategori_ekraf && (
                        <div
                          className="shop-pro-sale-bnr px-2 py-1 text-white font-bold rounded"
                          style={{
                            backgroundColor: categoryColors[item.kategori_ekraf],
                          }}
                        >
                          {item.kategori_ekraf}
                        </div>
                      )}
                      <div className="sx-thum-bx">
                        <img src={`http://localhost:5000/uploads/${item.gambar_kreasilokal}`} alt={item.nama_ekraf} style={{ width: "100", height: "410px", objectFit: "cover" }} />
                      </div>
                      <div className="sx-info  p-t20 text-white">
                        <h4 className="sx-tilte"><NavLink to={`/kreasi-lokal-detail/${item.id}`}>{item.nama_ekraf}</NavLink></h4>
                        <p className="m-b0">{item.kategori_ekraf}</p>
                        <p className="m-b0">
                          {item.alamat.match(/Kecamatan\s(.+)/)?.[1] || "Kecamatan tidak tersedia"}
                        </p>
                      </div>
                      <a className="mfp-link" href={`http://localhost:5000/uploads/${item.gambar_kreasilokal}`}>
                        <i className="fa fa-arrows-alt" />
                      </a>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              <p>Data tidak tersedia.</p>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default FavoriteLocalCreations;