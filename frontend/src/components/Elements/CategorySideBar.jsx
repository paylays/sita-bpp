import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class CategorySideBar extends Component {
  componentDidMount() {
    function loadScript(src) {

      return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', function () {
          resolve();
        });
        script.addEventListener('error', function (e) {
          reject(e);
        });
        document.body.appendChild(script);
        document.body.removeChild(script);
      })
    };

    loadScript('./assets/js/custom.js');

  };
  
  render() {
    return (
      <>
        <div className="side-bar p-a30 bg-gray">
          {/* Seacrh */}
          <div className="widget">
              <h4 className="widget-title ">Search</h4>
              <div className="search-bx p-a10 bg-white">
                <form action="#" role="search" method="post">
                  <div className="input-group">
                    <input name="news-letter" type="text" className="form-control bg-gray" placeholder="Write your text" />
                    <span className="input-group-btn bg-gray">
                      <button type="button" className="btn"><i className="fa fa-search" /></button>
                    </span>
                  </div>
                </form>
              </div>
          </div>
          {/* Kecamatan  */}
          <div className="widget widget_services ">
            <h4 className="widget-title">Kecamatan</h4>
            <ul className="p-a10 bg-white">
              <li><NavLink to={"/"}>Balikpapan Timur<span> (28)</span></NavLink></li>
              <li><NavLink to={"/"}>Balikpapan Barat<span> (05)</span></NavLink></li>
              <li><NavLink to={"/"}>Balikpapan Utara<span> (24)</span></NavLink></li>
              <li><NavLink to={"/"}>Balikpapan Tengah<span> (15)</span></NavLink></li>
              <li><NavLink to={"/"}>Balikpapan Selatan<span> (20)</span></NavLink></li>
              <li><NavLink to={"/"}>Balikpapan Kota<span> (90)</span></NavLink></li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default CategorySideBar;