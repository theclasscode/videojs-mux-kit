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

    player.musicOverlay().on('statechanged', (e) => {
      if (e.changes && e.changes.track) {
        this.displayOverlay();
      }
    });

    player.on('play', (e) => {
      this.displayOverlay();

      this.timer = window.setTimeout(hideOverlayAfterDelay, 8000);
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
    this.el().classList.remove('vjs-music-overlay--show');
    this.el().classList.add('vjs-music-overlay--hidden');
  }

  displayOverlay() {
    const { track } = this.player.musicOverlay().state;

    if (track) {
      this.el().classList.remove('vjs-music-overlay--hidden');
      this.el().classList.add('vjs-music-overlay--show');
      this.el().childNodes[0].innerHTML = track;
    } else {
      this.hideOverlay();
      this.el().childNodes[0].innerHTML = '';
    }
  }
}

export default MusicOverlayComponent;
