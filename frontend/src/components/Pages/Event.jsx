import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Common/Header';
import Banner from '../Elements/Banner';
import Footer from '../Common/Footer';
import axios from 'axios';

var bnrimg = require('./../../images/banner/banner-acara.jpg');

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      this.setState({ events: response.data });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  
  render() {
    const { events } = this.state;

    return (
      <>
        <Header />
        <div className="page-content">
          <Banner 
          title="Event Balikpapan Ragam Acara Penuh Inspirasi" 
          pagename="Acara" 
          description="Temukan berbagai acara menarik di Balikpapan! Dari festival budaya, pameran kreatif, hingga seminar inspiratif. Jangan lewatkan momen seru dan jadilah bagian dari keseruannya!" 
          bgimage={bnrimg}
          />        
          <div className="section-full p-tb80 bg-white inner-page-padding">
            <div div className="container">
              <div className="masonry-outer mfp-gallery news-grid clearfix row ">
                {events.map((item, index) => (
                  <div className="masonry-item  col-lg-4 col-md-6 col-sm-12" key={index}>
                    <div className="blog-post blog-grid date-style-2">
                      <div className="sx-post-media sx-img-effect img-reflection" >
                        <NavLink to={`/acara-detail/${item.id}`}><img src={`http://localhost:5000/uploads/${item.gambar_acara}`} alt={item.nama_acara} style={{ width: "100", height: "300px", objectFit: "cover" }} /></NavLink>
                      </div>
                      <div className="sx-post-info p-t30">
                        <div className="sx-post-meta ">
                          <ul>
                          <li className="post-date">
                            <strong>{new Date(item.tanggal_mulai_acara).getDate()}</strong>
                            <span>{new Date(item.tanggal_mulai_acara).toLocaleString('id-ID', { month: 'long' })}</span>
                          </li>
                            <li className="post-author"><NavLink to={`/acara-detail/${item.id}`}>By <span>Admin</span></NavLink> </li>
                            <li className="post-comment"> <NavLink to={`/acara-detail/${item.id}`}>Kota Balikpapan</NavLink> </li>
                            <span className={`badge shaped-pill text-white bg-${item.status_acara === "upcoming" ? "warning" : "success"}`}>
                              {item.status_acara === "upcoming" ? "Akan Datang" : "Sudah Terlaksana"}
                            </span>
                          </ul>
                        </div>
                        <div className="sx-post-title ">
                          <h4 className="post-title"><NavLink to={`/acara-detail/${item.id}`}>{item.judul_acara}</NavLink></h4>
                        </div>
                        <div className="sx-post-readmore">
                          <NavLink to={`/acara-detail/${item.id}`} title="READ MORE" rel="bookmark" className="site-button-link">Lihat Selengkapnya</NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>    
              {/* <ul className="pagination m-t30 m-b0">
                <li><NavLink to={"#"}>«</NavLink></li>
                <li className="active"><NavLink to={"#"}>1</NavLink></li>
                <li><NavLink to={"#"}>2</NavLink></li>
                <li><NavLink to={"#"}>3</NavLink></li>
                <li><NavLink to={"#"}>4</NavLink></li>
                <li><NavLink to={"#"}>5</NavLink></li>
                <li><NavLink to={"#"}>»</NavLink></li>
              </ul> */}
            </div>        
          </div>
        </div>

        <Footer />
    </>
    );
  }
}

export default Event;