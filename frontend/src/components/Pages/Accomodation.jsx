import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Common/Header';
import Banner from '../Elements/Banner';
import CategorySideBar from '../Elements/CategorySideBar';
import Footer from '../Common/Footer';
import axios from 'axios';

const filters = [
  { label: "Agen Perjalanan Wisata", filter: ".cat-1" },
  { label: "Biro Perjalanan Wisata", filter: ".cat-2" },
  { label: "Guest House", filter: ".cat-3" },
  { label: "Homestay", filter: ".cat-4" },
  { label: "Hotel Bintang 1", filter: ".cat-5" },
  { label: "Hotel Bintang 2", filter: ".cat-6" },
  { label: "Hotel Bintang 3", filter: ".cat-7" },
  { label: "Hotel Bintang 4", filter: ".cat-8" },
  { label: "Hotel Bintang 5", filter: ".cat-9" },
  { label: "Hotel Non-Bintang", filter: ".cat-10" },
  { label: "Vila", filter: ".cat-11" },
]

const categoryMap = {
  "Agen Perjalanan Wisata": "cat-1",
  "Biro Perjalanan Wisata": "cat-2",
  "Guest House": "cat-3",
  "Homestay": "cat-4",
  "Hotel Bintang 1": "cat-5",
  "Hotel Bintang 2": "cat-6",
  "Hotel Bintang 3": "cat-7",
  "Hotel Bintang 4": "cat-8",
  "Hotel Bintang 5": "cat-9",
  "Hotel Non-Bintang": "cat-10",
  "Vila": "cat-11"
};

var bnrimg = require('./../../images/banner/banner-akomodasi.jpg');
// var bgimg1 = require('./../../images/background/cross-line.png');

class Accomodation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accomodations: [],
      searchQuery: "",
      selectedKecamatan: "",
    }
  }
  
  componentDidMount() {
    this.fetchAccomodations();
  };

  fetchAccomodations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/accomodations');
      this.setState({ accomodations: response.data });
    } catch (error) {
      console.error('Error fetching accomodations', error);
    }
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  handleFilterKecamatan = (kecamatan) => {
    this.setState({ selectedKecamatan: kecamatan });
  };
  
  
  render() {
    const { accomodations, searchQuery, selectedKecamatan } = this.state;

    const filteredAccomodations = accomodations.filter((item) => {
      const matchesSearch = 
        item.nama_akomodasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kategori_akomodasi.toLowerCase().includes(searchQuery.toLowerCase());
  
      const matchesKecamatan = 
        !selectedKecamatan || item.alamat.includes(selectedKecamatan);

      return matchesSearch && matchesKecamatan;
    });

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
                      <NavLink to={"#"} className="btn from-top" data-filter={`.${item.filter.replace('.', '')}`}>
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
                    {filteredAccomodations.map((item, index) => (
                      <div key={index} className={`masonry-item col-lg-4 col-md-6 col-sm-12 m-b30 ${categoryMap[item.kategori_akomodasi] || ''}`}>
                        <div className="sx-box image-hover-block">
                          {item.kategori_akomodasi && (
                            <div
                              className="shop-pro-sale-bnr px-2 py-1 text-white font-bold rounded"
                              style={{
                                backgroundColor: categoryColors[item.kategori_akomodasi],
                              }}
                            >
                              {item.kategori_akomodasi}
                            </div>
                          )}
                          <div className="sx-thum-bx">
                            <img src={`http://localhost:5000/uploads/${item.gambar_akomodasi}`} alt={item.nama_akomodasi} style={{ width: "100", height: "300px", objectFit: "cover" }} />
                          </div>
                          <div className="sx-info p-t20 text-white">
                            <h4 className="sx-tilte"><NavLink to={`/akomodasi-detail/${item.id}`}>{item.nama_akomodasi}</NavLink></h4>
                            <p className="m-b0">{item.kategori_akomodasi}</p>
                            <p className="m-b0">
                              {item.alamat.match(/Kecamatan\s(.+)/)?.[1] || "Kecamatan tidak tersedia"}
                            </p>
                          </div>
                          <a className="mfp-link" href={`http://localhost:5000/uploads/${item.gambar_akomodasi}`}>
                            <i className="fa fa-arrows-alt" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </ul>
                  {/* Load More Button */}
                  {/* <div className="text-center load-more-btn-outer" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                    <button className="site-button-secondry btn-half"><span>Load More</span></button>
                  </div> */}
                </div>
                {/* SIDEBAR */}
                <div className="col-lg-4 col-md-12 sticky_column m-b30">
                  <CategorySideBar onSearch={this.handleSearch} onFilterKecamatan={this.handleFilterKecamatan} />
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