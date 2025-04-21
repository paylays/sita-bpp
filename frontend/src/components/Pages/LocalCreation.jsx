import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Common/Header';
import Banner from '../Elements/Banner';
import CategorySideBar from '../Elements/CategorySideBar';
import Footer from '../Common/Footer';
import axios from 'axios';

const filters = [
  { label: "Kuliner", filter: ".cat-1" },
  { label: "Kriya", filter: ".cat-2" },
  { label: "Fashion", filter: ".cat-3" },
  { label: "Seni Rupa", filter: ".cat-4" },
  { label: "Seni Pertunjukan", filter: ".cat-5" },
]

const categoryMap = {
  "Kuliner": "cat-1",
  "Kriya": "cat-2",
  "Fashion": "cat-3",
  "Seni Rupa": "cat-4",
  "Seni Pertunjukan": "cat-5"
};

var bnrimg = require('./../../images/banner/banner-ekraf.jpg');
// var bgimg1 = require('./../../images/background/cross-line.png');

class LocalCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localcreations: [],
      searchQuery: "",
      selectedKecamatan: "",
    };
  }

  componentDidMount() {
    this.fetchLocalCreations();
  }

  fetchLocalCreations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/localcreations');
      this.setState({ localcreations: response.data });
    } catch (error) {
      console.error('Error fetching localcreations:', error);
    }
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  handleFilterKecamatan = (kecamatan) => {
    this.setState({ selectedKecamatan: kecamatan });
  };
  
  
  render() {
    const { localcreations, searchQuery, selectedKecamatan  } = this.state;

    const filteredLocalCreations = localcreations.filter((item) => {
      const matchesSearch = 
        item.nama_ekraf.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kategori_ekraf.toLowerCase().includes(searchQuery.toLowerCase());
  
      const matchesKecamatan = 
        !selectedKecamatan || item.alamat.includes(selectedKecamatan);
  
      return matchesSearch && matchesKecamatan;
    });

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
          title="Kreasi Lokal Balikpapan Inovasi & Kreativitas Tanpa Batas" 
          pagename="Kreasi Lokal" 
          description="Temukan berbagai pelaku ekonomi kreatif di Balikpapan! Dari seni, kuliner, fashion, hingga teknologi—dapatkan inspirasi dan dukung karya anak bangsa." 
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
                    {filteredLocalCreations.map((item, index) => (
                      <div key={index} className={`masonry-item col-lg-4 col-md-6 col-sm-12 m-b30 ${categoryMap[item.kategori_ekraf] || ''}`} >
                        <div className="sx-box image-hover-block">
                          {item.kategori_ekraf && (
                            <div
                              className="shop-pro-sale-bnr px-2 py-1 text-white font-bold rounded"
                              style={{
                                backgroundColor: categoryColors[item.kategori_ekraf],
                              }}
                            >
                              {item.kategori_ekraf}
                            </div>
                          )}
                          <div className="sx-thum-bx">
                            <img src={`http://localhost:5000/uploads/${item.gambar_kreasilokal}`} alt={item.nama_ekraf} style={{ width: "100", height: "300px", objectFit: "cover" }} />
                          </div>
                          <div className="sx-info p-t20 text-white">
                            <h4 className="sx-tilte"><NavLink to={`/kreasi-lokal-detail/${item.id}`}>{item.nama_ekraf}</NavLink></h4>
                            <p className="m-b0">{item.kategori_ekraf}</p>
                            <p className="m-b0">
                              {item.alamat.match(/Kecamatan\s(.+)/)?.[1] || "Kecamatan tidak tersedia"}
                            </p>
                          </div>
                          <a className="mfp-link" href={`http://localhost:5000/uploads/${item.gambar_kreasilokal}`}>
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

export default LocalCreation;