import videojs from 'video.js';
import MusicOverlayComponent from './components/MusicOverlayComponent';

// Default options for the plugin.
const defaults = {};

const onPlayerReady = (player, options) => {
  player.addClass('vjs-music-overlay-plugin');
  console.log('videojs-music-overlay initialized!');
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
const musicOverlay = function (options) {
  const opts = videojs.mergeOptions(defaults, options);

  this.ready(() => {
    onPlayerReady(this, opts);

    this.addChild('MusicOverlayComponent', opts);
  });

  videojs.registerComponent('MusicOverlayComponent', MusicOverlayComponent);
};

// Register the plugin with video.js.
videojs.registerPlugin('musicOverlay', musicOverlay);

// Include the version number.
musicOverlay.VERSION = '1.0.0';

export default musicOverlay;
