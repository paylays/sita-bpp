import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class CategorySideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "", // Menyimpan query pencarian
    };
  }

  handleSearchChange = (event) => {
    const query = event.target.value;
    this.setState({ searchQuery: query });

    // Kirim query ke parent component (Destination.js)
    if (this.props.onSearch) {
      this.props.onSearch(query);
    }
  };

  handleKecamatanClick = (kecamatan) => {
    if (this.props.onFilterKecamatan) {
      this.props.onFilterKecamatan(kecamatan);
    }
  };

  handleResetFilter = (e) => {
    e.preventDefault();
    if (this.props.onFilterKecamatan) {
      this.props.onFilterKecamatan(null);
      window.location.reload();
    }
  };
  
  
  render() {
    return (
      <>
        <div className="side-bar p-a30 bg-gray">
          {/* Seacrh */}
          <div className="widget">
              <h4 className="widget-title ">Search</h4>
              <div className="search-bx p-a10 bg-white">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-gray"
                      placeholder="Cari..."
                      value={this.state.searchQuery}
                      onChange={this.handleSearchChange}
                    />
                    <span className="input-group-btn bg-gray">
                      <button type="submit" className="btn">
                        <i className="fa fa-search" />
                      </button>
                    </span>
                  </div>
                </form>
              </div>
          </div>
          {/* Kecamatan  */}
          <div className="widget widget_services ">
            <h4 className="widget-title">Kecamatan</h4>
            <ul className="p-a10 bg-white">
            <li>
                <a href="#" onClick={(e) => {
                    e.preventDefault(); // Mencegah navigasi ke #
                    this.handleKecamatanClick("Balikpapan Timur");
                }}>
                  Balikpapan Timur
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                    e.preventDefault(); // Mencegah navigasi ke #
                    this.handleKecamatanClick("Balikpapan Barat");
                }}>
                  Balikpapan Barat
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                    e.preventDefault(); // Mencegah navigasi ke #
                    this.handleKecamatanClick("Balikpapan Utara");
                }}>
                  Balikpapan Utara
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                    e.preventDefault(); // Mencegah navigasi ke #
                    this.handleKecamatanClick("Balikpapan Tengah");
                }}>
                  Balikpapan Tengah
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                    e.preventDefault(); // Mencegah navigasi ke #
                    this.handleKecamatanClick("Balikpapan Selatan");
                }}>
                  Balikpapan Selatan
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                    e.preventDefault(); // Mencegah navigasi ke #
                    this.handleKecamatanClick("Balikpapan Kota");
                }}>
                  Balikpapan Kota
                </a>
              </li>
              <li className="d-flex justify-content-center">
                <a 
                  href="#" 
                  onClick={this.handleResetFilter} 
                  style={{ color: "", fontWeight: "bold" }}
                >
                  Reset Kecamatan
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default CategorySideBar;