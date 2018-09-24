import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  currentStep: 1,

  nextDisabled: computed('currentStep', 'model.dataExtensions.length', function() {
    const step = this.get('currentStep');
    if (step === 1) return !this.get('model.dataExtensions.length');
    return false;
  }),

  backDisabled: computed('currentStep', function() {
    return this.get('currentStep') < 2;
  }),

  selectedExclusionIds: computed.mapBy('model.exclusions', 'id'),

  selectedExtensionIds: computed.mapBy('model.dataExtensions', 'id'),

  selectedPubId: computed.reads('model.publication.id'),

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
