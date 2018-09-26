import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  nextDisabled: computed('model.{step,dataExtensions.length,subject.length,senderProfile,sendType,sendDateTime}', function() {
    const step = this.get('model.step');
    if (step === 1) return !this.get('model.dataExtensions.length');
    if (step === 3) {
      return !this.get('model.subject.length') || !this.get('model.senderProfile');
    }
    if (step === 4) {
      if (this.get('model.sendType') === 'Immediately') return false;
      const selectedDate = moment(this.get('model.sendDateTime'));
      if (selectedDate.valueOf() < Date.now()) return true;
      return false;
    }
    return false;
  }),

  backDisabled: computed('model.step', function() {
    return this.get('model.step') < 2;
  }),

  selectedExclusionIds: computed.mapBy('model.exclusions', 'id'),

  selectedExtensionIds: computed.mapBy('model.dataExtensions', 'id'),

  selectedPubId: computed.reads('model.publication.id'),

  minSendDate: computed(function() {
    return moment().subtract(1, 'day');
  }),

  sendTime: computed('model.sendDateTime', function() {
    return moment(this.get('model.sendDateTime')).format('h:mm A');
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

  parseTimeString(value) {
    const [hrs, mm] = value.split(':');
    const [mins, merid] = mm.split(' ');
    const hour = (merid === 'PM' ? Number(hrs) + 12 : (hrs === '12' ? 0 : Number(hrs)));
    const minute = Number(mins);
    return [hour, minute];
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
      this.set('model.step', this.get('model.step') + 1);
    },
    decreaseStep() {
      this.set('model.step', this.get('model.step') - 1);
    },
    adjustSendDate(date) {
      const newDate = moment(this.get('model.sendDateTime')).set({
        year: date.get('year'),
        month: date.get('month'),
        day: date.get('day'),
      });

      if (newDate.valueOf() < moment().valueOf()) {
        this.set('model.sendDateTime', this.get('model.defaultSendDateTime'));
      } else {
        this.set('model.sendDateTime', newDate);
      }

    },
    adjustSendTime(timeString) {
      const [hour, minute] = this.parseTimeString(timeString);
      const newDate = moment(this.get('model.sendDateTime')).set({
        hour,
        minute,
        second: 0,
        millisecond: 0,
      });

      if (newDate.valueOf() < moment().valueOf()) {
        this.set('model.sendDateTime', this.get('model.defaultSendDateTime'));
      } else {
        this.set('model.sendDateTime', newDate);
      }
    },
  }
});
