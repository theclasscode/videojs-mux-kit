import videojs from 'video.js';
const VolumeBar = videojs.getComponent('VolumeBar');

class MusicVolumeButton extends VolumeBar {
  constructor(player, options) {
    super(player, options);
  }
}

export default MusicVolumeButton;
