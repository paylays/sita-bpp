import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';

var bgimg1 = require('./../../images/background/cross-line2.png');

const FavoriteDestinations = () => {
  const [favDestinations, setFavDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/destinations')
      .then(response => {
        setFavDestinations(response.data.slice(0, 3)); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching destinations:', error);
        setLoading(false);
      });
  }, []);

  const options = {
    loop: true,
    autoplay: false,
    center: false,
    items: 3,
    margin: 40,
    nav: true,
    dots: false,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive: {
      0: {
          items: 1,
          margin: 15,
      },
      640: {
          items: 2,
          margin: 15
      },
      768: {
          items: 2,
          margin: 15
      },
      991: {
          items: 3,
          margin: 15
      },
      1200: {
          items: 3
      }
    }
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + " ..."
      : text;
  };

  const categoryColors = {
    "Wisata Alam": "rgba(34, 139, 34, 0.5)",
    "Wisata Buatan": "rgba(255, 140, 0, 0.5)",
    "Wisata Sejarah": "rgba(139, 69, 19, 0.5)", 
    "Wisata Religi": "rgba(128, 0, 128, 0.5)", 
    "Wisata Bahari": "rgba(30, 144, 255, 0.5)",
    "Wisata Belanja": "rgba(255, 20, 147, 0.5)", 
    "Wisata Kuliner": "rgba(220, 20, 60, 0.5)", 
    "Wisata Olahraga": "rgba(255, 215, 0, 0.5)"
  };  

  return (
    <>
      <div className="section-full p-tb80 bg-gray inner-page-padding">
        <div className="container-fluid">
          <div className="section-content">
            {/* TITLE START */}
            <div className="section-head">
              <div className="sx-separator-outer separator-left">
                <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                  <h3 className="sep-line-one">Destinasi Terfavorit 2025</h3>
                </div>
              </div>
            </div>
            {/* TITLE END */}
            <div className="work-carousel-outer">
            {loading ? (
              <p>Loading...</p>
            ) : favDestinations.length > 0 ? (
              <OwlCarousel className="owl-carousel mfp-gallery project-carousel project-carousel3 owl-btn-vertical-center p-lr80" {...options}>
                {favDestinations.map((item, index) => (
                  <div key={index} className="item">
                    <div className="project-mas hover-shadow m-a30">
                      {item.kategori_destinasi && (
                        <div
                          className="shop-pro-sale-bnr px-2 py-1 text-white font-bold rounded"
                          style={{
                            backgroundColor: categoryColors[item.kategori_destinasi],
                          }}
                        >
                          {item.kategori_destinasi}
                        </div>
                      )}
                      <div className="image-effect-one">
                        <img src={`http://localhost:5000/uploads/${item.gambar_destinasi}`} alt={item.nama_destinasi} style={{ width: "100", height: "410px", objectFit: "cover" }} />
                        <div className="figcaption">
                          <a className="mfp-link" href={`http://localhost:5000/uploads/${item.gambar_destinasi}`} >
                            <i className="fa fa-arrows-alt" />
                          </a>
                        </div>
                      </div>
                      <div className="project-info p-a20 bg-gray">
                        <h4 className="sx-tilte m-t0"><NavLink to={`/destinasi-detail/${item.id}`}>{item.nama_destinasi}</NavLink></h4>
                        <p>{truncateText(item.deskripsi_destinasi, 5)}</p>
                        <NavLink to={`/destinasi-detail/${item.id}`}><i className="link-plus bg-primary" /></NavLink>
                      </div>
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

export default FavoriteDestinations;