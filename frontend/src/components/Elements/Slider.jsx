import React, { Component } from 'react';
import '../../assets/plugins/revolution/revolution-addons/typewriter/css/typewriter.css';
import '../../assets/plugins/revolution/revolution-addons/reveal/css/revolution.addon.revealer.css';
import '../../assets/plugins/revolution/revolution-addons/reveal/css/revolution.addon.revealer.preloaders.css';

class Slider extends Component {
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
      });
    }

    loadScript('./assets/js/rev-script-6.js');
  }

  render() {
    return (
      <>
        <div
          id="welcome_wrapper"
          className="rev_slider_wrapper fullscreen-container"
          data-alias="goodnews-header"
          data-source="gallery"
          style={{ background: '#eeeeee', padding: 0 }}
        >
          <div
            id="slider-video"
            className="rev_slider fullscreenbanner"
            style={{ display: 'block' }}
            data-version="5.4.3.1"
          >
            <ul>
              {/* SLIDE 1 */}
              <li
                data-index="rs-901"
                data-transition="fade"
                data-slotamount="default"
                data-hideafterloop={0}
                data-hideslideonmobile="off"
                data-easein="default"
                data-easeout="default"
                data-masterspeed="default"
                data-rotate={0}
                data-fstransition="fade"
                data-fsmasterspeed={300}
                data-fsslotamount={7}
                data-saveperformance="off"
                data-title
                data-param1
                data-param2
                data-param3
                data-param4
                data-param5
                data-param6
                data-param7
                data-param8
                data-param9
                data-param10
                data-description
              >
                {/* MAIN IMAGE */}
                <img
                  src={require('./../../images/main-slider/slider-new.jpg')} // Use JPG image
                  alt=""
                  data-bgposition="center center"
                  data-bgfit="cover"
                  data-bgparallax={4}
                  className="rev-slidebg"
                  data-no-retina
                />
                {/* LAYERS */}
                {/* LAYER NR. 1 [ for overlay ] */}
                <div
                  className="tp-caption tp-shape tp-shapewrapper"
                  id="slide-901-layer-0"
                  data-x="['center','center','center','center']"
                  data-hoffset="['0','0','0','0']"
                  data-y="['middle','middle','middle','middle']"
                  data-voffset="['0','0','0','0']"
                  data-width="full"
                  data-height="full"
                  data-whitespace="nowrap"
                  data-type="shape"
                  data-basealign="slide"
                  data-responsive_offset="off"
                  data-responsive="off"
                  data-frames='[{"from":"opacity:0;","speed":1000,"to":"o:1;","delay":0,"ease":"Power4.easeOut"},{"delay":"wait","speed":1000,"to":"opacity:0;","ease":"Power4.easeOut"}]'
                  data-textalign="['left','left','left','left']"
                  data-paddingtop="[0,0,0,0]"
                  data-paddingright="[0,0,0,0]"
                  data-paddingbottom="[0,0,0,0]"
                  data-paddingleft="[0,0,0,0]"
                  style={{
                    zIndex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0,
                  }}
                ></div>
                {/* LAYER NR. 4 [ for title ] */}
                <div
                  className="tp-caption tp-resizeme"
                  id="slide-901-layer-2"
                  data-x="['center','center','center','center']"
                  data-hoffset="['0','0','0','0']"
                  data-y="['middle','middle','middle','middle']"
                  data-voffset="['0','0','0','0']"
                  data-fontsize="['54','54','54','34']"
                  data-lineheight="['64','64','64','44']"
                  data-width="['700','700','700','90%']"
                  data-height="['none','none','none','none']"
                  data-whitespace="['normal','normal','normal','normal']"
                  data-typewriter='{"lines":"Temukan Karya Unik Balikpapan , Akomodasi Nyaman","enabled":"on","speed":"200","delays":"1%7C100","looped":"on","cursorType":"one","blinking":"on","word_delay":"off","sequenced":"on","hide_cursor":"off","start_delay":"500","newline_delay":"1000","deletion_speed":"20","deletion_delay":"1000","blinking_speed":"500","linebreak_delay":"60","cursor_type":"one","background":"off"}'
                  data-type="text"
                  data-responsive_offset="on"
                  data-frames='[{"delay":"+790","speed":1500,"sfxcolor":"#fff","sfx_effect":"blockfromleft","frame":"0","from":"z:0;","to":"o:1;","ease":"Power4.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                  data-textalign="['center','center','center','center']"
                  data-paddingtop="[5,5,5,5]"
                  data-paddingright="[0,0,0,0]"
                  data-paddingbottom="[0,0,0,0]"
                  data-paddingleft="[0,0,0,0]"
                  style={{
                    zIndex: 13,
                    whiteSpace: 'normal',
                    fontWeight: 600,
                    color: '#fff',
                    borderWidth: 0,
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  <div>Eksplorasi Destinasi Menakjubkan di Balikpapan</div>
                </div>
              </li>
            </ul>
            <div
              className="tp-bannertimer tp-bottom"
              style={{ visibility: 'hidden !important' }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Slider;
