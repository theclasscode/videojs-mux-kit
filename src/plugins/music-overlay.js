import videojs from 'video.js';
import MusicOverlayComponent from './components/MusicOverlayComponent';

const Plugin = videojs.getPlugin('plugin');

class MusicOverlay extends Plugin {
  constructor(player, options) {
    super(player, options);

    player.ready(() => {
      player.addChild('MusicOverlayComponent', options);
    });

    videojs.registerComponent('MusicOverlayComponent', MusicOverlayComponent);
  }

  dispose() {
    super.dispose();
  }

  setTrack(track) {
    this.setState({ track });
  }
}

videojs.registerPlugin('musicOverlay', MusicOverlay);
