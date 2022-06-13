import videojs from 'video.js';
import CustomVolumeButton from './components/CustomVolumeButton';

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
    const opts = videojs.mergeOptions(defaults, options);

    onPlayerReady(this, opts);

    const controlBar = this.getChild('controlBar');
    const progressControl = controlBar.getChild('progressControl').el();

    controlBar.el().insertBefore(
      controlBar
        .addChild('CustomVolumeButton', {
          startingVolume: opts.startingVolume,
        })
        .el(),
      progressControl
    );
  });

  videojs.registerComponent('CustomVolumeButton', CustomVolumeButton);
};

// Register the plugin with video.js.
videojs.registerPlugin('musicVolume', musicVolume);

// Include the version number.
musicVolume.VERSION = '1.0.0';

export default musicVolume;
