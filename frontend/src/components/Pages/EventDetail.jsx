import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Header from '../Common/Header';
// import Banner from './../Elements/Banner';
import Footer from './../Common/Footer';
import axios from 'axios';

// var bnrimg = require('./../../images/banner/10.jpg');
var bgimg1 = require('./../../images/background/cross-line2.png');

const EventDetail = () => {
  const { id } = useParams(); 
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [otherEvents, setOtherEvents] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchAllEvents();
  }, []);

  useEffect(() => {
    if (event && events.length > 0) {
      const filteredEvents = events
        .filter((e) => e.id !== parseInt(id, 10))
        
        .sort((a, b) => {
          const dateA = new Date(a.tanggal_mulai_acara);
          const dateB = new Date(b.tanggal_mulai_acara);
          const eventDate = new Date(event.tanggal_mulai_acara);
          
          return Math.abs(dateA - eventDate) - Math.abs(dateB - eventDate);
        })

        .slice(0, 3)
        .sort((a, b) => new Date(a.tanggal_mulai_acara) - new Date(b.tanggal_mulai_acara));
      setOtherEvents(filteredEvents);
    }
  }, [event, events, id]);


  if (!event) {
    return <div>Data tidak ditemukan</div>;
  }

  const currentIndex = events.findIndex((e) => e.id === parseInt(id, 10));
  const prevId = currentIndex > 0 ? events[currentIndex - 1].id : null;
  const nextId = currentIndex < events.length - 1 ? events[currentIndex + 1].id : null;

  return (
      <>
        <Header />
        <div className="page-content ">
          {/* <Banner 
            title="Blog Single Style" 
            pagename="Blog Single" 
            description="The essence of interior design will always be about people and how they live. It is about the realities of what makes for an attractive, civilized." 
            bgimage={bnrimg}
          /> */}
          {/* SECTION CONTENT START */}
          <div className="section-full p-t80 p-b50 inner-page-padding">
            <div className="container">
              <div className="blog-single-space max-w900 ml-auto mr-auto">
                {/* BLOG START */}
                <div className="blog-post blog-detail text-black mfp-gallery">
                  <div className="sx-box image-hover-block">
                    <div className="sx-thum-bx" style={{ width: "900px", height: "422px" }}>
                      <img className="img-responsive" src={`http://localhost:5000/uploads/${event.gambar_acara}`} alt={event.judul_acara} />
                    </div>
                    <a className="mfp-link" href={`http://localhost:5000/uploads/${event.gambar_acara}`}>
                      <i className="fa fa-arrows-alt" />
                    </a>
                  </div>
                  <div className="sx-post-meta  m-t20">
                    <ul>
                    <li className="post-date">
                      {`${new Date(event.createdAt).toLocaleDateString('id-ID', { day: '2-digit' })} ${new Date(event.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}`}
                    </li>
                      <li className="post-author">By <span>Admin</span> </li>
                      <li className="post-category"><span>Kota Balikpapan</span> </li>
                    </ul>
                  </div>
                  <div className="sx-post-title ">
                    <h3 className="post-title">{event.judul_acara}</h3>
                  </div>
                  <div className="sx-post-text">
                    <p>{event.deskripsi_acara}</p>
                    <p>
                      <strong>Hari/Tanggal :</strong>{" "}
                      {new Date(event.tanggal_mulai_acara).toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })} 
                      {" s/d "}
                      {new Date(event.tanggal_selesai_acara).toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                    </p>
                    <p>
                      <strong>Waktu :</strong> {event.waktu_acara ? event.waktu_acara.slice(0, 5) : ""} WITA
                    </p>  
                    <p>
                      <strong>Status :</strong>{" "}                            
                      <span className={`badge shaped-pill text-white bg-${event.status_acara === "upcoming" ? "warning" : "success"}`}>
                        {event.status_acara === "upcoming" ? "Akan Datang" : "Sudah Terlaksana"}
                      </span>
                    </p>
                  </div>
                  <div className="autor-post-tag-share p-a30 bg-gray">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="widget_tag_cloud m-b15">
                          <h5 className="tagcloud">Tags</h5>
                          <div className="tagcloud">
                            <NavLink to={"#"}>Balikpapan</NavLink>
                            <NavLink to={"#"}>Pesona Balikpapan</NavLink>
                            <NavLink to={"#"}>Planining</NavLink>
                            <NavLink to={"#"}>Acara Balikpapan </NavLink>
                            <NavLink to={"#"}>Event</NavLink>
                            <NavLink to={"#"}>Events</NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="clearfix single-post-share">
                          <h5>Share this Post:</h5>
                          <div className="widget_social_inks">
                            <ul className="social-icons social-md social-square social-dark m-b0">
                              <li><a href="https://www.youtube.com" className="fa fa-youtube" /></li>
                              <li><a href="https://www.instagram.com" className="fa fa-instagram" /></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="post-controls p-t30">
                    <div className="d-flex justify-content-between">
                      <div className="prev-post">{prevId && <NavLink to={`/acara-detail/${prevId}`}>Prev Article</NavLink>}</div>
                      <div className="next-post">{nextId && <NavLink to={`/acara-detail/${nextId}`}>Next Article</NavLink>}</div>
                    </div>
                  </div>
                </div>
                {/* OUR BLOG START */}
                {/* TITLE START */}
                <div className="section-head">
                  <div className="sx-separator-outer separator-left">
                    <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                      <h3 className="sep-line-one">Acara Lainnya  </h3>
                    </div>
                  </div>
                </div>
                {/* TITLE END */}
                {/* IMAGE CAROUSEL START */}
                <div className="section-content">
                  <div className="row">
                  {otherEvents.map((item) => (
                    <div key={item.id} className="col-md-4 col-sm-12">
                      <div className="blog-post blog-grid date-style-2">
                        <div className="sx-post-media sx-img-effect img-reflection">
                          <NavLink to={`/acara-detail/${item.id}`}><img src={`http://localhost:5000/uploads/${item.gambar_acara}`} alt={item.nama_acara} style={{ width: "100", height: "250px", objectFit: "cover" }} /></NavLink>
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
                </div>
                {/* OUR BLOG END */}
              </div>
            </div>
          </div>
          {/* SECTION CONTENT END */}
        </div>

        <Footer />
      </>
  );
}

export default EventDetail;