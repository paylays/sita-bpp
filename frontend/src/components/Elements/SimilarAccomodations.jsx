import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';

var bgimg1 = require('./../../images/background/cross-line2.png');

const SimilarAccomodations = ({ currentId }) => {
  const [otherAccomodations, setOtherAccomodations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllAccomodations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/accomodations");
        const filteredAccomodations = response.data.filter(dest => dest.id !== parseInt(currentId));
        setOtherAccomodations(filteredAccomodations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accomodations:", error);
        setLoading(false);
      }
    };

    fetchAllAccomodations();
  }, [ currentId ]);

  if (!otherAccomodations) {
    return <div>Data tidak ditemukan</div>;
  }

  const options = {
    loop: otherAccomodations.length > 3,
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

  return (
    <>
      <div className="section-full p-tb80 bg-gray inner-page-padding">
        <div className="container">
          <div className="section-content">
            {/* TITLE START */}
            <div className="section-head">
                <div className="sx-separator-outer separator-left">
                    <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                        <h3 className="sep-line-one">Akomodasi Serupa</h3>
                    </div>
                </div>
            </div>
            {/* TITLE END */}
            <div className="work-carousel-outer">
            {loading ? (
              <p>Loading...</p>
            ) : otherAccomodations.length > 0 ? (
              <OwlCarousel className="owl-carousel mfp-gallery project-carousel project-carousel3 owl-btn-vertical-center p-lr80" {...options}>
                {otherAccomodations.slice(0, options.item).map((item, index) => (
                  <div key={index} className="item">
                    <div className="project-mas m-a30">
                      <div className="image-effect-one">
                        <img src={`http://localhost:5000/uploads/${item.gambar_akomodasi}`} alt={item.nama_akomodasi} style={{ width: "100", height: "300px", objectFit: "cover" }} />
                        <div className="figcaption">
                          <a className="mfp-link" href={`http://localhost:5000/uploads/${item.gambar_akomodasi}`}>
                            <i className="fa fa-arrows-alt" />
                          </a>
                        </div>
                      </div>
                      <div className="project-info p-t20">
                        <h4 className="sx-tilte  m-t0">
                          <a 
                            href={`/akomodasi-detail/${item.id}`} 
                            onClick={(e) => {
                              e.preventDefault(); 
                              window.location.href = `/akomodasi-detail/${item.id}`;
                            }}
                          >
                            {item.nama_akomodasi}
                          </a>
                        </h4>
                        <p>{truncateText(item.deskripsi_akomodasi, 5)}</p>
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

export default SimilarAccomodations;