import React, { Component } from 'react';

class Switcher extends Component {
  constructor(props) {
    super(props);
    const savedSkin = localStorage.getItem('selectedSkin') || 'skin-1';
    this.state = { stylePath: `./assets/css/skin/${savedSkin}.css`, selectedSkin: savedSkin, isSwitchActive: false };
    this.handleSwitchSkin = this.handleSwitchSkin.bind(this);
  }

  componentDidMount() {
    // Logika untuk footer-fixed jika ada
    var homepage2 = /\/home-2/i;
    if (homepage2.test(window.location.href)) {
        document.body.classList.add('footer-fixed');
    } else {
        document.body.classList.remove('footer-fixed');
    }
  }

  handleSwitchToggle = () => {
    this.setState({ isSwitchActive: !this.state.isSwitchActive });
  };

  handleSwitchSkin(skin) {
    const skinPaths = {
      1: 'skin-1',
      2: 'skin-2',
      3: 'skin-3',
      4: 'skin-4',
      5: 'skin-5',
      6: 'skin-6',
      7: 'skin-7',
      8: 'skin-8',
      9: 'skin-9',
      10: 'skin-10'
    };

    if (skinPaths[skin]) {
      // Simpan skin yang dipilih ke localStorage
      localStorage.setItem('selectedSkin', skinPaths[skin]);
      this.setState({ stylePath: `./assets/css/skin/${skinPaths[skin]}.css`, selectedSkin: skinPaths[skin] });
    }
  }

  render() {
    const { isSwitchActive, selectedSkin } = this.state;

    return (
        <>
          <link rel="stylesheet" type="text/css" href={this.state.stylePath} />
          <div className="styleswitcher" style={{ left: isSwitchActive ? '0' : '-240px' }}>
            <div className="switcher-btn-bx">
              <a 
                aria-current="page" 
                className={`switch-btn ${isSwitchActive ? 'active' : ''}`} 
                href="#!" 
                onClick={this.handleSwitchToggle}
              >
                <span className="fa fa-cog fa-spin"></span>
              </a>
            </div>
            <div className="styleswitcher-inner">
              <h6 className="switcher-title">Color Skin</h6>
              <ul className="color-skins">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(skin => (
                  <li key={skin}>
                    <a 
                      className={`theme-skin skin-${skin} ${selectedSkin === `skin-${skin}` ? 'active' : ''}`} 
                      href="" 
                      onClick={() => this.handleSwitchSkin(skin)}
                    >
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
    );
  }
}

export default Switcher;
