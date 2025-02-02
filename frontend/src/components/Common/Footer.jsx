import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Switcher from '../Elements/Switcher';

class Footer extends Component {
  render() {
    return (
      <>
        <footer className="site-footer footer-large  footer-light footer-wide">
            {/* FOOTER BLOCKES START */}
            <div className="footer-top">
                <div className="container-fluid">
                    <div className="row">
                        {/* ABOUT COMPANY */}
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="widget widget_about">
                                {/*<h4 class="widget-title">About Company</h4>*/}
                                <div className="logo-footer clearfix p-b15">
                                    <NavLink to={"./"}>
                                        <img src={require('./../../assets/media/images/logo-sita-bpp.png')} alt="sita" />
                                    </NavLink>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate non provident culpa tempore eos. Pariatur a repellendus veniam est fugiat tenetur, eos consequatur eaque at. Laborum inventore odio ullam amet!</p>
                                <ul className="social-icons  sx-social-links">
                                    <li><a href="https://www.facebook.com/disporaparkotabpn/" target="_blank" rel="noreferrer" ><i className="fa fa-facebook" /></a></li>
                                    <li><a href="https://www.instagram.com/disporapar_balikpapan/" target="_blank" rel="noreferrer" ><i className="fa fa-instagram" /></a></li>
                                    <li><a href="https://www.youtube.com/@dpopchannel6107/" target="_blank" rel="noreferrer" ><i className="fa fa-youtube" /></a></li>
                                    <li><a href="https://www.x.com/porabudparbpp/" target="_blank" rel="noreferrer" ><i className="fa fa-twitter" /></a></li>
                                </ul>
                            </div>
                        </div>
                        {/* USEFUL LINKS */}
                        <div className="col-lg-3 col-md-6 col-sm-6 footer-col-3">
                            <div className="widget widget_services inline-links">
                                <h5 className="widget-title">Tautan Terkait</h5>
                                <ul>
                                    <li><NavLink to={"/destinasi"}>Destinasi</NavLink></li>
                                    <li><NavLink to={"/kreasi-lokal"}>Kreasi Lokal</NavLink></li>
                                    <li><NavLink to={"/akomodasi"}>Akomodasi</NavLink></li>
                                    <li><NavLink to={"/acara"}>Acara</NavLink></li>
                                    <li><NavLink to={"/tentang-kami"}>Tentang Kami</NavLink></li>
                                </ul>
                            </div>
                        </div>
                        {/* CONTACT US */}
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="widget widget_address_outer">
                                <h5 className="widget-title">Kontak</h5>
                                <ul className="widget_address">
                                    <li><a href="https://maps.app.goo.gl/3dZ6o36nHhBuUmWK9">Alamat : Jalan Marsma R. Iswahyudi No. 121</a></li>
                                    <li><a href="mailto:dpopbalikpapan@gmail.com">Email : dpopbalikpapan@gmail.com</a></li>
                                    <li><a href="tel:+62542763768">No. Telp : 0542-763768</a></li>
                                </ul>
                            </div>
                        </div>
                        {/* LOKASI MAPS */}
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="widget widget_address_outer">
                                <h5 className="widget-title">Lokasi</h5>
                                <div className="gmap-outline">
                                  <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.838446893075!2d116.87560469999998!3d-1.2698573999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df146963aafe5f1%3A0x6c2f292a791828a5!2sDISPORAPAR!5e0!3m2!1sid!2sid!4v1738427806513!5m2!1sid!2sid"
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
            {/* FOOTER COPYRIGHT */}
            <div className="footer-bottom overlay-wraper">
                <div className="overlay-main" />
                <div className="container">
                    <div className="clearfix">
                        <div className="sx-footer-bot-center">
                            <span className="copyrights-text">Copyright © 2025 Dinas Pemuda, Olahraga dan Pariwisata Kota Balikpapan</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <Switcher />
      </>
  );
  }
}

export default Footer;