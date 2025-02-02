import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const favDestinations = [
  {
    image: require('./../../images/projects/square/pic4.jpg'),
    title: 'Pantai 1',
    description: 'We provide a range of architectural 3D modeling services to our customers to aid the design'
  },
  {
    image: require('./../../images/projects/square/pic9.jpg'),
    title: 'Pantai 2',
    description: 'Analysis and planning services that help both the client and architects to work out the forthcoming project...'
  },
  {
    image: require('./../../images/projects/square/pic10.jpg'),
    title: 'Pantai 3',
    description: 'We offer comprehensive Architectural Engineering Services including Interior design, Master planning.'
  },
  {
    image: require('./../../images/projects/square/pic6.jpg'),
    title: 'Pantai 4',
    description: 'Project management is the process by which our team plans and executes your project. We will develop it...'
  },
  {
    image: require('./../../images/projects/square/pic7.jpg'),
    title: 'Pantai 5',
    description: 'Our team also provides consultations on all architectural issues, even if you need specific...'
  },
  {
    image: require('./../../images/projects/square/pic8.jpg'),
    title: 'Pantai 6',
    description: 'We combine Interior and Exterior Design services and often provide them as a single solution. It helps us...'
  }
]

var bgimg1 = require('./../../images/background/cross-line2.png');

class FavoriteDestinations extends Component {
  render() {

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
                <OwlCarousel className="owl-carousel mfp-gallery project-carousel project-carousel3 owl-btn-vertical-center p-lr80" {...options}>
                  {favDestinations.map((item, index) => (
                    <div key={index} className="item">
                      <div className="project-mas hover-shadow m-a30">
                        <div className="image-effect-one">
                          <img src={item.image} alt="" />
                          <div className="figcaption">
                            <a className="mfp-link" href={item.image}>
                              <i className="fa fa-arrows-alt" />
                            </a>
                          </div>
                        </div>
                        <div className="project-info p-a20 bg-gray">
                          <h4 className="sx-tilte m-t0"><NavLink to={"/project-detail1"}>{item.title}</NavLink></h4>
                          <p>{item.description}</p>
                          <NavLink to={"/services-detail"}><i className="link-plus bg-primary" /></NavLink>
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FavoriteDestinations;