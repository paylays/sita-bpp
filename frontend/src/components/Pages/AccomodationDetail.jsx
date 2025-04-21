import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Common/Header';
import Banner from '../Elements/Banner';
import SimilarAccomodations from '../Elements/SimilarAccomodations';
import Footer from '../Common/Footer';
import ReactPlayer from 'react-player';
import axios from 'axios';

var bnrimg = require('./../../images/banner/banner-akomodasi.jpg');

const AccomodationDetail = () => {
  const { id } = useParams();
  const [accomodation, setAccomodation] = useState(null);

  useEffect(() => {
    const fetchAccomodation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/accomodations/${id}`);
        setAccomodation(response.data);
      } catch (error) {
        console.error('Error fetching accomodation:', error);
      }
    };

    fetchAccomodation();
  }, [id]);

  if (!accomodation) {
    return <div>Data tidak ditemukan</div>
  }

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
      <Header />
      <div className="page-content">
        <Banner 
          title="Akomodasi 1" 
          pagename="Detail Akomodasi" 
          description="Temukan informasi akomodasi yang lengkap." 
          bgimage={bnrimg} 
        />
        {/* SECTION CONTENT START */}
        <div className="section-full p-tb80 inner-page-padding stick_in_parent">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-7  sticky_column">
                <div className="project-detail-containt">
                  <div className="bg-white text-black">
                    <h3>{accomodation.nama_akomodasi}</h3>
                    <p style={{ maxWidth: "630px", wordWrap: "break-word" }}>
                    {accomodation.deskripsi_akomodasi}
                    </p>
                    <div className="product-block">
                      <ul>
                        <li>
                          <h4 className="m-b10">Jumlah Kamar Tersedia</h4>
                          <p>{accomodation.jumlah_kamar_tersedia}</p>
                        </li>
                        <li>
                          <h4 className="m-b10">Harga Kamar</h4>
                          <p>{accomodation.harga_kamar}</p>
                        </li>
                        <li>
                          <h4 className="m-b10">Fasilitas</h4>
                          <p>{accomodation.fasilitas}</p>
                        </li>
                        <li>
                          <h4 className="m-b10">Whatsapp</h4>
                          <p>
                            <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer">
                              {accomodation.no_whatsapp}
                            </a>
                          </p>
                        </li>
                        <li>
                          <h4 className="m-b10">Alamat</h4>
                          <p>{accomodation.alamat}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="m-b0">
                      <div className="sx-divider divider-1px  bg-black"><i className="icon-dot c-square" /></div>
                    </div>
                    <ul className="social-icons social-square social-darkest m-b0">
                      <li>
                        <a 
                          href={`https://wa.me/${accomodation.no_whatsapp.replace(/^0/, "62")}`} 
                          target="_blank" 
                          className="fa fa-whatsapp" 
                        />
                      </li>
                      <li><a href={accomodation.link_instagram} target="_blank" className="fa fa-instagram" rel="noreferrer" /></li>                      
                      <li><a href={accomodation.link_youtube} target="_blank" className="fa fa-youtube" rel="noreferrer" /></li>
                      <li><a href={accomodation.link_facebook} target="_blank" className="fa fa-facebook" rel="noreferrer" /></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 ">
                <div className="project-detail-outer">
                  <div className="sx-box image-hover-block m-b30">
                    {accomodation.kategori_akomodasi && (
                      <div
                        className="shop-pro-sale-bnr px-2 py-1 text-white font-bold rounded"
                        style={{
                          backgroundColor: categoryColors[accomodation.kategori_akomodasi],
                        }}
                      >
                        {accomodation.kategori_akomodasi}
                      </div>
                    )}
                    <div className="sx-thum-bx">
                      <img src={`http://localhost:5000/uploads/${accomodation.gambar_akomodasi}`} alt={accomodation.nama_akomodasi} style={{ width: "100", height: "300px", objectFit: "cover" }}/>
                    </div>
                    <a className="mfp-link" href={`http://localhost:5000/uploads/${accomodation.gambar_akomodasi}`}>
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
        <SimilarAccomodations currentId={id} />
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
};

export default AccomodationDetail;