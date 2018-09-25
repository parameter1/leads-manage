import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  currentStep: 1,

  nextDisabled: computed('currentStep', 'model.{dataExtensions.length,subject.length,senderProfile,sendType,sendDate,sendTime}', function() {
    const step = this.get('currentStep');
    if (step === 1) return !this.get('model.dataExtensions.length');
    if (step === 3) {
      return !this.get('model.subject.length') || !this.get('model.senderProfile');
    }
    if (step === 4) {
      if (this.get('model.sendType') === 'Immediately') return false;
      const dateString = `${this.get('model.sendDate').format('YYYY-MM-DD')} ${this.get('model.sendTime')}`;
      console.info(dateString);
      const date = moment(dateString);
      console.info(date);
      console.info(date.valueOf(), Date.now(), date.valueOf() < Date.now());
      if (date.valueOf() < Date.now()) return true;
      return false;
    }
    return false;
  }),

  backDisabled: computed('currentStep', function() {
    return this.get('currentStep') < 2;
  }),

  selectedExclusionIds: computed.mapBy('model.exclusions', 'id'),

  selectedExtensionIds: computed.mapBy('model.dataExtensions', 'id'),

  selectedPubId: computed.reads('model.publication.id'),

  minSendDate: computed(function() {
    return moment().subtract(1, 'day');
  }),

  sendTimes: computed(function() {
    let date = moment().startOf('day');
    const arr = [];
    for (let i = 0; i < 48; i++) {
      arr.push(date.format('h:mm A'));
      date.add(30, 'minutes');
    }
    return arr;
  }),

  init() {
    this._super(...arguments);
    this.set('sendTypes', ['Immediately', 'Later']);
  },

  actions: {
    addDataExtension(node) {
      this.get('model.dataExtensions').pushObject(node);
    },
    removeDataExtension(node) {
      this.get('model.dataExtensions').removeObject(node);
    },
    setPublication(node, selected) {
      const value = selected.length ? node : null;
      this.set('model.publication', value);
    },
    addExclusion(node) {
      this.get('model.exclusions').pushObject(node);
    },
    removeExclusion(node) {
      this.get('model.exclusions').removeObject(node);
    },
    increaseStep() {
      this.set('currentStep', this.get('currentStep') + 1);
    },
    decreaseStep() {
      this.set('currentStep', this.get('currentStep') - 1);
    },
  }
});
