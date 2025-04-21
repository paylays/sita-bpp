import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Common/Header';
import Banner from '../Elements/Banner';
import CategorySideBar from '../Elements/CategorySideBar';
import Footer from '../Common/Footer';
import axios from 'axios';

const filters = [
  { label: "Wisata Alam", filter: ".cat-1" },
  { label: "Wisata Buatan", filter: ".cat-2" },
  { label: "Wisata Sejarah", filter: ".cat-3" },
  { label: "Wisata Religi", filter: ".cat-4" },
  { label: "Wisata Bahari", filter: ".cat-5" },
  { label: "Wisata Belanja", filter: ".cat-6" },
  { label: "Wisata Kuliner", filter: ".cat-7" },
  { label: "Wisata Olahraga", filter: ".cat-8" },
]

const categoryMap = {
  "Wisata Alam": "cat-1",
  "Wisata Buatan": "cat-2",
  "Wisata Sejarah": "cat-3",
  "Wisata Religi": "cat-4",
  "Wisata Bahari": "cat-5",
  "Wisata Belanja": "cat-6",
  "Wisata Kuliner": "cat-7",
  "Wisata Olahraga": "cat-8"
};

var bnrimg = require('./../../images/banner/cover.jpg');
// var bgimg1 = require('./../../images/background/cross-line.png');

class Destination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      searchQuery: "",
      selectedKecamatan: "",
    };
  }

  componentDidMount() {
    this.fetchDestinations();
  }

  fetchDestinations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/destinations');
      this.setState({ destinations: response.data });
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  handleFilterKecamatan = (kecamatan) => {
    this.setState({ selectedKecamatan: kecamatan });
  };
  
  render() {
    const { destinations, searchQuery, selectedKecamatan  } = this.state;

    const filteredDestinations = destinations.filter((item) => {
      const matchesSearch = 
        item.nama_destinasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kategori_destinasi.toLowerCase().includes(searchQuery.toLowerCase());
  
      const matchesKecamatan = 
        !selectedKecamatan || item.alamat.includes(selectedKecamatan);
  
      return matchesSearch && matchesKecamatan;
    });

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
            title="Jelajahi Keindahan Balikpapan" 
            pagename="Destinasi" 
            description="Temukan pesona wisata terbaik di Kota Balikpapan! Dari pantai yang memesona, hutan kota yang asri, hingga wisata kuliner khas yang menggugah selera. Nikmati pengalaman tak terlupakan di setiap sudut kota ini!" 
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
                    {filteredDestinations.map((item, index) => (
                      <div key={index} className={`masonry-item col-lg-4 col-md-6 col-sm-12 m-b30 ${categoryMap[item.kategori_destinasi] || ''}`}>
                        <div className="sx-box image-hover-block">
                          {item.kategori_destinasi && (
                            <div
                              className="shop-pro-sale-bnr px-2 py-1 text-white font-bold rounded"
                              style={{
                                backgroundColor: categoryColors[item.kategori_destinasi],
                              }}
                            >
                              {item.kategori_destinasi}
                            </div>
                          )}
                          <div className="sx-thum-bx">
                            <img src={`http://localhost:5000/uploads/${item.gambar_destinasi}`} alt={item.nama_destinasi} style={{ width: "100", height: "300px", objectFit: "cover" }}/>
                          </div>
                          <div className="sx-info p-t20 text-white">
                            <h4 className="sx-tilte"><NavLink to={`/destinasi-detail/${item.id}`}>{item.nama_destinasi}</NavLink></h4>
                            <p className="m-b0">{item.kategori_destinasi}</p>
                            <p className="m-b0">
                              {item.alamat.match(/Kecamatan\s(.+)/)?.[1] || "Kecamatan tidak tersedia"}
                            </p>
                          </div>
                          <a className="mfp-link" href={`http://localhost:5000/uploads/${item.gambar_destinasi}`}>
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

export default Destination;