import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';

var bgimg1 = require('./../../images/background/cross-line2.png');

const FavoriteAccomodations = () => {
  const [favAccomodations, setAccomodations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/accomodations')
      .then(response => {
        setAccomodations(response.data.slice(0, 3)); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching accomodations:', error);
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
    dots: true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive:{
      0:{
        items:1
      },
      768:{
        items:1
      },			
      991:{
        items:1
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
    "Agen Perjalanan Wisata": "rgba(255, 99, 71, 0.5)",
    "Biro Perjalanan Wisata": "rgba(30, 144, 255, 0.5)",
    "Guest House": "rgba(60, 179, 113, 0.5)",
    "Homestay": "rgba(255, 165, 0, 0.5)",
    "Hotel Bintang 1": "rgba(218, 112, 214, 0.5)",
    "Hotel Bintang 2": "rgba(0, 191, 255, 0.5)",
    "Hotel Bintang 3": "rgba(34, 139, 34, 0.5)",
    "Hotel Bintang 4": "rgba(255, 215, 0, 0.5)", 
    "Hotel Bintang 5": "rgba(178, 34, 34, 0.5)",
    "Hotel Non-Bintang": "rgba(169, 169, 169, 0.5)",
    "Vila": "rgba(70, 130, 180, 0.5)"
  };  

  return (
    <>
      <div className="section-full p-tb80 bg-gray inner-page-padding">
          <div className="container">
            <div className="section-content">
              {/* TITLE START */}
              <div className="section-head">
                <div className="sx-separator-outer separator-center">
                  <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                    <h3 className="sep-line-one">Akomodasi Terfavorit 2025</h3>
                  </div>
                </div>
              </div>
              {/* TITLE END */}
              <div className="work-carousel-outer">
              {loading ? (
                <p>Loading...</p>
              ) : favAccomodations.length > 0 ? (
                <OwlCarousel className="owl-carousel mfp-gallery project-carousel project-carousel1 owl-btn-vertical-center" {...options}>
                  {favAccomodations.map((item, index) => (
                    <div key={index} className="item">
                      {item.kategori_akomodasi && (
                        <div
                          className="shop-pro-sale-bnr px-2 py-1 text-white font-bold rounded"
                          style={{
                            backgroundColor: categoryColors[item.kategori_akomodasi],
                          }}
                        >
                          {item.kategori_akomodasi}
                        </div>
                      )}
                      <div className="sx-box image-single-carousel bg-cover">
                      <img src={`http://localhost:5000/uploads/${item.gambar_akomodasi}`} alt={item.nama_akomdoasi} style={{ width: "100", height: "600px", objectFit: "cover" }} />
                        <div className="sx-info  p-t20 text-white">
                          <h4 className="sx-tilte m-t0"><NavLink to={`/akomodasi-detail/${item.id}`}>{item.nama_akomodasi}</NavLink></h4>
                          <p>{truncateText(item.deskripsi_akomodasi, 10)}</p>
                          <NavLink to={`/akomodasi-detail/${item.id}`} className="site-button btn-half button-sm"><span>View All</span></NavLink>
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

export default FavoriteAccomodations;