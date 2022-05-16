import videojs from 'video.js';

const Component = videojs.getComponent('Component');

class MusicOverlayComponent extends Component {
  constructor(player, options) {
    super(player, options);

    this.timer = null;
    this.player = player;

    const hideOverlayAfterDelay = () => {
      this.hideOverlay();
    };

    const displayOverlayAndThenHide = () => {
      this.displayOverlay();
      this.timer = window.setTimeout(hideOverlayAfterDelay, 8000);
    };

    player.musicOverlay().on('statechanged', (e) => {
      if (e.changes && e.changes.track) {
        displayOverlayAndThenHide();
      }
    });

    player.on('play', (e) => {
      displayOverlayAndThenHide();
    });

    player.on('pause', (e) => {
      window.clearTimeout(this.timer);
      this.displayOverlay();
    });
  }

  /**
   * Create the {@link Component}'s DOM element.
   *
   * @return {Element}
   *         The element that was created.
   */
  createEl() {
    const el = super.createEl('div', {
      className: 'vjs-music-overlay vjs-music-overlay--hidden',
    });

    const track = videojs.dom.createEl('span', {
      className:
        'vjs-music-overlay__block vjs-music-overlay__block--current-track',
    });
    el.appendChild(track);

    return el;
  }

  hideOverlay() {
    const el = this.el();

    if (el) {
      el.classList.remove('vjs-music-overlay--show');
      el.classList.add('vjs-music-overlay--hidden');
    }
  }

  displayOverlay() {
    const { track } = this.player.musicOverlay().state;
    const el = this.el();

    if (el) {
      if (track) {
        el.classList.remove('vjs-music-overlay--hidden');
        el.classList.add('vjs-music-overlay--show');
        el.childNodes[0].innerHTML = track;
      } else {
        this.hideOverlay();
        el.childNodes[0].innerHTML = '';
      }
    }
  }
}

export default MusicOverlayComponent;
