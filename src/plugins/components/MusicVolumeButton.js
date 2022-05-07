import videojs from 'video.js';
const VolumeBar = videojs.getComponent('VolumeBar');

class MusicVolumeButton extends VolumeBar {
  constructor(player, options) {
    super(player, options);
    this.on(player, 'musicchange', (e) => this.updateMusic());
    player.ready(() => this.updateMusic());
  }

  updateARIAAttributes() {}
  //   handleMouseMove() {}
  //   handleMouseDown() {}

  updateMusic() {
    console.log('update music');
  }

  /**
   * Create the `Component`'s DOM element
   *
   * @return {Element}
   *         The element that was created.
   */
  createEl() {
    return videojs.dom.createEl(
      'div',
      {
        id: 'vjs-music-bar',
        className:
          'vjs-music-bar vjs-volume-bar vjs-slider-bar vjs-slider vjs-slider-vertical',
      },
      {
        'aria-label': this.localize('Music Level'),
        'aria-live': 'polite',
      }
    );
  }
}

MusicVolumeButton.prototype.playerEvent = 'musicchange';

export default MusicVolumeButton;
