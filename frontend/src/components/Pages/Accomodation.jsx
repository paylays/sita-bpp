import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Common/Header';
import Banner from '../Elements/Banner';
import CategorySideBar from '../Elements/CategorySideBar';
import Footer from '../Common/Footer';

const filters = [
  { label: "Hotel", filter: ".cat-1" },
  { label: "Villa", filter: ".cat-2" },
  { label: "Guest House", filter: ".cat-3" },
  { label: "Homestay", filter: ".cat-4" },
  { label: "Agen Wisata", filter: ".cat-5" },
]

const accomodations = [
  {
  image: require('./../../images/projects/portrait/pic1.jpg'),
  title: 'Interior Work Avroko',
  address: 'Muscat, Sultanate of Oman',
  filter: 'cat-1'
  },
  {
    image: require('./../../images/projects/portrait/pic2.jpg'),
    title: 'Vilters',
    address: 'Muscat, Sultanate of Oman',
    filter: 'cat-2'
  },
  {
    image: require('./../../images/projects/portrait/pic3.jpg'),
    title: 'Industrial Design',
    address: 'Muscat, Sultanate of Oman',
    filter: 'cat-3'
  },
  {
    image: require('./../../images/projects/portrait/pic4.jpg'),
    title: 'House Bluprint',
    address: 'Muscat, Sultanate of Oman',
    filter: 'cat-4'
  },
  {
    image: require('./../../images/projects/portrait/pic5.jpg'),
    title: 'Modern Bathroom',
    address: 'Muscat, Sultanate of Oman',
    filter: 'cat-5'
  },
  {
    image: require('./../../images/projects/portrait/pic6.jpg'),
    title: 'Bellevue Project',
    address: 'Muscat, Sultanate of Oman',
    filter: 'cat-4'
  },
  {
    image: require('./../../images/projects/portrait/pic7.jpg'),
    title: 'Qatar Pavilion',
    address: 'Muscat, Sultanate of Oman',
    filter: 'cat-3'
  },
  {
    image: require('./../../images/projects/portrait/pic8.jpg'),
    title: 'Museum',
    address: 'Muscat, Sultanate of Oman',
    filter: 'cat-2'
  },
  {
    image: require('./../../images/projects/portrait/pic9.jpg'),
    title: 'Modern house',
    address: 'Muscat, Sultanate of Oman',
    filter: 'cat-1'
  }
]

var bnrimg = require('./../../images/banner/3.jpg');
var bgimg1 = require('./../../images/background/cross-line.png');

class Accomodation extends Component {
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
          title="Akomodasi Terbaik untuk Liburan Anda di Kota Balikpapan" 
          pagename="Akomodasi" 
          description="Temukan berbagai pilihan akomodasi nyaman dan terjangkau di Kota Balikpapan. Kami menawarkan hotel, villa, dan penginapan lainnya yang cocok untuk berbagai kebutuhan liburan Anda. Jelajahi pilihan terbaik untuk pengalaman menginap yang tak terlupakan." 
          bgimage={bnrimg} 
        />
          {/* SECTION CONTENT START */}
          <div className="section-full p-tb80 inner-page-padding">
            <div className="container">
              {/* Filter Navigation */}
              <div className="filter-wrap p-b30 text-center">
                <ul className="filter-navigation masonry-filter clearfix">
                  <li className="active">
                    <NavLink to={"#"} className="btn from-top" data-filter="*" data-hover="All">All</NavLink>
                  </li>
                  {filters.map((item, index) => (
                    <li key={index}>    
                      <NavLink to={"#"} className="btn from-top" data-filter={item.filter}>
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="row">
                {/* GALLERY CONTENT START */}
                <div className="col-lg-8 col-md-12">
                  {/* Gallery Items */}
                  <ul className="masonry-outer mfp-gallery work-grid row clearfix list-unstyled">
                    {accomodations.map((item, index) => (
                      <div key={index} className={`${item.filter} masonry-item col-lg-4 col-md-6 col-sm-12 m-b30`}>
                        <div className="sx-box image-hover-block">
                          <div className="sx-thum-bx">
                            <img src={item.image} alt="" />
                          </div>
                          <div className="sx-info p-t20 text-white">
                            <h4 className="sx-tilte"><NavLink to={"/akomodasi-detail"}>{item.title}</NavLink></h4>
                            <p className="m-b0">{item.address}</p>
                          </div>
                          <a className="mfp-link" href={item.image}>
                            <i className="fa fa-arrows-alt" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </ul>
                  {/* Load More Button */}
                  <div className="text-center load-more-btn-outer" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                    <button className="site-button-secondry btn-half"><span>Load More</span></button>
                  </div>
                </div>
                {/* SIDEBAR */}
                <div className="col-lg-4 col-md-12 sticky_column m-b30">
                  <CategorySideBar />
                </div>
              </div>
            </div>
          </div>
          {/* SECTION CONTENT END  */}
        </div>
        <Footer />
      </>
    );
  }
}

export default Accomodation;