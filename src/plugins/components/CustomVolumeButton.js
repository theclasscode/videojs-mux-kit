import videojs from 'video.js';

const ClickableComponent = videojs.getComponent('ClickableComponent');

class CustomVolumeButton extends ClickableComponent {
  constructor(player, options) {
    super(player, options);
  }

  buildCSSClass() {
    return `vjs-custom-volume-button vjs-icon-volume-mid ${super.buildCSSClass()}`;
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
    };

    const onChangeTeacherVolume = (e) => {
      handleInputChange(e);

      const newValue = Number(e.target.value) / 100;
      const videoEl = this.player_.children()[0];

      videoEl.volume = newValue;
    };

    musicSlider.addEventListener('input', onChangeMusicVolume);
    teacherSlider.addEventListener('input', onChangeTeacherVolume);

    return this.controlTextEl_;
  }

  handleClick(e) {
    const classes = e.target.classList;
    if (classes.contains('vjs-custom-volume-button')) {
      this.controlTextEl_.classList.toggle('vjs-hidden');
    }
  }
}

export default CustomVolumeButton;
