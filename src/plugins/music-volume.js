import videojs from 'video.js';
import MusicVolumeButton from './components/MusicVolumeButton';

// Default options for the plugin.
const defaults = {};

const onPlayerReady = (player, options) => {
  player.addClass('vjs-music-volume');
  console.log('videojs-music-volume initialized!');
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function musicVolume
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const musicVolume = function (options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
    console.log(this.getChild('controlBar').getChild('volumePanel'));
    this.getChild('controlBar')
      .getChild('volumePanel')
      .getChild('volumeControl')
      .addChild('MusicVolumeButton', options);
  });

  videojs.registerComponent('MusicVolumeButton', MusicVolumeButton);
};

// Register the plugin with video.js.
videojs.registerPlugin('musicVolume', musicVolume);

// Include the version number.
musicVolume.VERSION = '1.0.0';

export default musicVolume;
