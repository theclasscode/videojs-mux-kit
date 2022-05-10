import videojs from 'video.js';

const ClickableComponent = videojs.getComponent('ClickableComponent');

class CustomVolumeButton extends ClickableComponent {
  constructor(player, options) {
    super(player, options);

    window.addEventListener('click', (e) => {
      const wrapper = document.querySelector('.vjs-volume-wrapper');
      const volumeButton = document.querySelector('.vjs-custom-volume-button');

      if (!wrapper?.contains(e.target) && !volumeButton?.contains(e.target)) {
        if (!this.controlTextEl_.classList?.contains('vjs-hidden')) {
          this.controlTextEl_.classList.add('vjs-hidden');
        }
      }
    });
  }

  buildCSSClass() {
    const volumeLevel = 3;

    return `vjs-custom-volume-button vjs-volume-level-${volumeLevel} ${super.buildCSSClass()}`;
  }

  createControlTextEl(el) {
    const teacherSlider = videojs.dom.createEl(
      'input',
      {
        id: 'teacherVolumeSlider',
      },
      {
        type: 'range',
        min: 0,
        max: 100,
        value: 100,
        step: 1,
      }
    );
    const musicSlider = videojs.dom.createEl(
      'input',
      {
        id: 'teacherVolumeSlider',
      },
      {
        type: 'range',
        min: 0,
        max: 100,
        value: 100,
        step: 1,
      }
    );
    const teacherVolume = videojs.dom.createEl('div', {
      id: 'vjs-teacher-volume',
      className: 'vjs-custom-volume-slider',
    });
    const musicVolume = videojs.dom.createEl('div', {
      id: 'vjs-music-volume',
      className: 'vjs-custom-volume-slider',
    });
    const teacherVolumeSliderLabel = videojs.dom.createEl('span');
    const musicVolumeSliderLabel = videojs.dom.createEl('span');

    teacherVolumeSliderLabel.classList.add('select-none');
    teacherVolumeSliderLabel.innerHTML = 'Teacher';
    musicVolumeSliderLabel.innerHTML = 'Music';
    musicVolumeSliderLabel.classList.add('select-none');

    teacherVolume.appendChild(teacherVolumeSliderLabel);
    teacherVolume.appendChild(teacherSlider);

    musicVolume.appendChild(musicVolumeSliderLabel);
    musicVolume.appendChild(musicSlider);

    this.controlTextEl_ = videojs.dom.createEl('div', {
      className: 'vjs-volume-wrapper vjs-hidden',
    });

    if (el) {
      el.appendChild(this.controlTextEl_);
    }

    this.controlTextEl_.appendChild(teacherVolume);
    this.controlTextEl_.appendChild(musicVolume);

    function handleInputChange(e) {
      let target = e.target;
      if (e.target.type !== 'range') {
        target = document.getElementById('range');
      }
      const min = target.min;
      const max = target.max;
      const val = target.value;

      target.style.backgroundSize =
        ((val - min) * 100) / (max - min) + '% 100%';
    }

    const onChangeMusicVolume = (e) => {
      handleInputChange(e);

      const newValue = Number(e.target.value) / 100;
      this.player_.trigger('musicVolumeChange', { musicVolume: newValue });
    };

    const onChangeTeacherVolume = (e) => {
      handleInputChange(e);

      const newValue = Number(e.target.value) / 100;
      const videoEl = this.player_.children()[0];
      const buttonEl = this.el_;

      videoEl.volume = newValue;

      buttonEl.classList.remove(
        'vjs-volume-level-0',
        'vjs-volume-level-1',
        'vjs-volume-level-2',
        'vjs-volume-level-3'
      );

      if (newValue > 0.66) {
        buttonEl.classList.add('vjs-volume-level-3');
      } else if (newValue > 0.33) {
        buttonEl.classList.add('vjs-volume-level-2');
      } else if (newValue > 0) {
        buttonEl.classList.add('vjs-volume-level-1');
      } else {
        buttonEl.classList.add('vjs-volume-level-0');
      }
    };

    musicSlider.addEventListener('input', onChangeMusicVolume);
    teacherSlider.addEventListener('input', onChangeTeacherVolume);

    return this.controlTextEl_;
  }

  handleClick(e) {
    const classes = e.target.classList;
    if (classes?.contains('vjs-custom-volume-button')) {
      this.controlTextEl_.classList.toggle('vjs-hidden');
    }

    const controlBarHeight =
      document.querySelector('.vjs-control-bar').clientHeight;
    document.querySelector('.vjs-volume-wrapper').style.bottom =
      controlBarHeight + 'px';
  }
}

export default CustomVolumeButton;
