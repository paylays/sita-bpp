import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Common/Header';
import Banner from '../Elements/Banner';
import SimilarLocalCreations from '../Elements/SimilarLocalCreations';
import Footer from '../Common/Footer';
import ReactPlayer from 'react-player';
import axios from 'axios';

var bnrimg = require('./../../images/banner/banner-ekraf.jpg');

const LocalCreationDetail = () => {
  const { id } = useParams();
  const [localcreation, setLocalCreation] = useState(null);
  
  useEffect(() => {
    const fetchLocalCreation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/localcreations/${id}`);
        setLocalCreation(response.data);
      } catch (error) {
        console.error('Error fetching localcreation:', error);
      }
    };

    fetchLocalCreation();
  }, [id]);

  if (!localcreation) {
    return <div>Data tidak ditemukan</div>;
  }

  const categoryColors = {
    "Kuliner": "rgba(229, 62, 62, 0.5)", 
    "Kriya": "rgba(49, 130, 206, 0.5)", 
    "Fashion": "rgba(56, 161, 105, 0.5)", 
    "Seni Rupa": "rgba(214, 158, 46, 0.5)", 
    "Seni Pertunjukan": "rgba(128, 90, 213, 0.5)" 
  };

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
                    <h3>{localcreation.nama_ekraf}</h3>
                    <p style={{ maxWidth: "630px", wordWrap: "break-word" }}>
                      {localcreation.deskripsi_ekraf}
                    </p>
                    <div className="product-block">
                      <ul>
                        <li>
                          <h4 className="m-b10">Jam Operasional</h4>
                          <p>{localcreation.jam_operasional}</p>
                        </li>
                        <li>
                          <h4 className="m-b10">Harga Produk</h4>
                          <p>{localcreation.harga_produk}</p>
                        </li>
                        <li>
                          <h4 className="m-b10">Whatsapp</h4>
                          <p>
                            <a
                              href={`https://wa.me/${localcreation.no_whatsapp.replace(/^0/, "62")}`} 
                              target="_blank"
                              rel="noreferrer" 
                            >
                              {localcreation.no_whatsapp}
                            </a>
                          </p>
                        </li>
                        <li>
                          <h4 className="m-b10">Alamat</h4>
                          <p>{localcreation.alamat}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="m-b0">
                      <div className="sx-divider divider-1px  bg-black"><i className="icon-dot c-square" /></div>
                    </div>
                    <ul className="social-icons social-square social-darkest m-b0">
                      <li>
                        <a 
                          href={`https://wa.me/${localcreation.no_whatsapp.replace(/^0/, "62")}`} 
                          target="_blank" 
                          className="fa fa-whatsapp" 
                        />
                      </li>
                      <li><a href={localcreation.link_instagram} target="_blank" className="fa fa-instagram" rel="noreferrer" /></li>                      
                      <li><a href={localcreation.link_youtube} target="_blank" className="fa fa-youtube" rel="noreferrer" /></li>
                      <li><a href={localcreation.link_facebook} target="_blank" className="fa fa-facebook" rel="noreferrer" /></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 ">
                <div className="project-detail-outer">
                  <div className="sx-box image-hover-block m-b30">
                    {localcreation.kategori_ekraf && (
                      <div
                        className="shop-pro-sale-bnr px-2 py-1 text-white font-bold rounded"
                        style={{
                          backgroundColor: categoryColors[localcreation.kategori_ekraf],
                        }}
                      >
                        {localcreation.kategori_ekraf}
                      </div>
                    )}
                    <div className="sx-thum-bx">
                      <img src={`http://localhost:5000/uploads/${localcreation.gambar_kreasilokal}`} alt={localcreation.nama_ekraf} style={{ width: "100", height: "300px", objectFit: "cover" }}/>
                    </div>
                    <a className="mfp-link" href={`http://localhost:5000/uploads/${localcreation.gambar_kreasilokal}`}>
                      <i className="fa fa-arrows-alt" />
                    </a>
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
        <SimilarLocalCreations currentId={id} />
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

export default LocalCreationDetail;