import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Common/Header';
import Banner from '../Elements/Banner';
import SimilarDestinations from '../Elements/SimilarDestinations';
import Footer from '../Common/Footer';
import ReactPlayer from 'react-player';

var bnrimg = require('./../../images/banner/cover.jpg');

const DestinationDetail = () => {
  const { id } = useParams(); 
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/destinations/${id}`);
        setDestination(response.data);
      } catch (error) {
        console.error('Error fetching destination:', error);
      }
    };

    fetchDestination();
  }, [id]);

  if (!destination) {
    return <div>Data tidak ditemukan</div>;
  }

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
      <Header />
      <div className="page-content">
        <Banner
          title="Pantai 1"
          pagename="Detail Destinasi"
          description="Jelajahi informasi lengkap tentang destinasi pilihan Anda."
          bgimage={bnrimg}
        />

        <div className="section-full p-tb80 inner-page-padding stick_in_parent">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-7 sticky_column">
                <div className="project-detail-containt">
                  <div className="bg-white text-black">
                    <h3>{destination.nama_destinasi}</h3>
                    <p style={{ maxWidth: "630px", wordWrap: "break-word" }}>
                    {destination.deskripsi_destinasi}
                    </p>
                    <div className="product-block">
                      <ul>
                        <li><h4>Jam Operasional</h4><p>{destination.jam_operasional}</p></li>
                        <li><h4>Harga Tiket</h4><p>{destination.harga_tiket}</p></li>
                        <li><h4>Fasilitas</h4><p>{destination.fasilitas}</p></li>
                        <li><h4>Aktivitas</h4><p>{destination.aktivitas || '-'}</p></li>
                        <li><h4>Alamat</h4><p>{destination.alamat}</p></li>
                      </ul>
                    </div>
                    <div className="sx-divider divider-1px bg-black"></div>
                    <ul className="social-icons social-square social-darkest m-b0">
                      <li>
                        <a 
                          href={`https://wa.me/${destination.link_whatsapp.replace(/^0/, "62")}`} 
                          target="_blank" 
                          className="fa fa-whatsapp"
                          rel="noreferrer" 
                        />
                      </li>
                      <li><a href={destination.link_instagram} target="_blank" className="fa fa-instagram" rel="noreferrer" /></li>                      
                      <li><a href={destination.link_youtube} target="_blank" className="fa fa-youtube" rel="noreferrer" /></li>
                      <li><a href={destination.link_facebook} target="_blank" className="fa fa-facebook" rel="noreferrer" /></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-5">
                <div className="project-detail-outer">
                  <div className="sx-box image-hover-block m-b30">
                    {destination.kategori_destinasi && (
                      <div
                        className="shop-pro-sale-bnr px-2 py-1 text-white font-bold rounded"
                        style={{
                          backgroundColor: categoryColors[destination.kategori_destinasi],
                        }}
                      >
                        {destination.kategori_destinasi}
                      </div>
                    )}
                    <div className="sx-thum-bx">
                      <img src={`http://localhost:5000/uploads/${destination.gambar_destinasi}`} alt={destination.nama_destinasi} style={{ width: "100", height: "300px", objectFit: "cover" }}/>
                    </div>
                    <a className="mfp-link" href={`http://localhost:5000/uploads/${destination.gambar_destinasi}`}>
                      <i className="fa fa-arrows-alt" />
                    </a>
                  </div>
                  <div className="sx-box m-b30">
                    <div className="gmap-outline">
                      <h4>Titik Lokasi</h4>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63823.88822726873!2d116.96058194999999!3d-1.1654029000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df14e6abeaae51f%3A0x63b6d6597f86a4a!2sLamaru%2C%20Balikpapan%20Timur%2C%20Balikpapan%20City%2C%20East%20Kalimantan!5e0!3m2!1sen!2sid!4v1739288377425!5m2!1sen!2sid"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SimilarDestinations currentId={id} />
      </div>
      <Footer />
    </>
  );
};

export default DestinationDetail;
