import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Common/Header';
import Banner from '../Elements/Banner';
import SimilarLocalCreations from '../Elements/SimilarLocalCreations';
import Footer from '../Common/Footer';
import ReactPlayer from 'react-player';

var bnrimg = require('./../../images/banner/2.jpg');

class LocalCreationDetail extends Component {
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
          <Banner 
            title="Ekraf 1" 
            pagename="Detail Kreasi Lokal" 
            description="Temukan informasi pelaku ekonomi kreatif yang lengkap disini." 
            bgimage={bnrimg} 
          />
          {/* SECTION CONTENT START */}
          <div className="section-full p-tb80 inner-page-padding stick_in_parent">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-7  sticky_column">
                  <div className="project-detail-containt">
                    <div className="bg-white text-black">
                      <h3>Ekraf 1 : Kerajinan tangan tanpa batas</h3>
                      <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, voluptatibus! Repellat consequuntur dolore eligendi dolor, recusandae id illo. Possimus illum a vero magni quidem porro dolorem itaque et autem maiores! </p>
                      <div className="product-block">
                        <ul>
                          <li>
                            <h4 className="m-b10">Jam Operasional</h4>
                            <p>08.00 - 17.00 WITA</p>
                          </li>
                          <li>
                            <h4 className="m-b10">Harga Produk</h4>
                            <p>Rp50.000 - Rp100.000,-</p>
                          </li>
                          <li>
                            <h4 className="m-b10">Whatsapp</h4>
                            <p>
                              <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer">
                                08123456789
                              </a>
                            </p>
                          </li>
                          <li>
                            <h4 className="m-b10">Alamat</h4>
                            <p>Jl. Marsma R. Iswahyudi No.121, Gn. Bahagia, Kecamatan Balikpapan Selatan, Kota Balikpapan, Kalimantan Timur 76114</p>
                          </li>
                        </ul>
                      </div>
                      <div className="m-b0">
                        <div className="sx-divider divider-1px  bg-black"><i className="icon-dot c-square" /></div>
                      </div>
                      <ul className="social-icons social-square social-darkest m-b0">
                        <li><a href="https://www.facebook.com" className="fa fa-facebook" target="_blank" rel="noreferrer" /></li>
                        <li><a href="https://twitter.com" className="fa fa-twitter" target="_blank" rel="noreferrer" /></li>
                        <li><a href="https://www.youtube.com" className="fa fa-youtube" target="_blank" rel="noreferrer" /></li>
                        <li><a href="https://www.instagram.com" className="fa fa-instagram" target="_blank" rel="noreferrer" /></li>
                        <li><a href="tel:+62542763768" className="fa fa-phone" target="_blank" rel="noreferrer" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 ">
                  <div className="project-detail-outer">
                    <div className="project-detail-pic m-b30">
                      <div className="sx-media">
                          <img src={require('./../../images/projects/portrait/pic7.jpg')} alt="" />
                      </div>
                    </div>
                    <div className="project-detail-pic m-b30">
                      <div className="sx-media">
                        <img src={require('./../../images/projects/portrait/pic4.jpg')} alt="" />
                      </div>
                    </div>
                    <div className="sx-box m-b30">
                      <div className="sx-thum-bx sx-img-overlay1 sx-img-effect yt-thum-box">
                        <img src="https://img.youtube.com/vi/Oy2QIiSQT2U/0.jpg" alt="" />
                        <NavLink to={"#"} className="play-now" data-toggle="modal" data-target="#myModal5">
                          <i className="icon fa fa-play" />
                          <span className="ripple" />
                        </NavLink>
                        </div>
                    </div>
                    <div className="sx-box m-b30">
                      <div className="gmap-outline">
                      <h4>Titik Lokasi</h4>
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7977.84452660657!2d116.97478959116717!3d-1.2143308450963226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df14ffec9e80f6d%3A0x4ee3db09c1de1650!2sPantai%20Manggar%20Sagara%20Sari!5e0!3m2!1sid!2sid!4v1738477280044!5m2!1sid!2sid"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* SECTION CONTENT END  */}
          <SimilarLocalCreations />
        </div>

        <div className="modal fade" id="myModal5" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <ReactPlayer url='https://www.youtube.com/watch?v=Oy2QIiSQT2U' />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default LocalCreationDetail;