import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    addDataExtension(node, selected) {
      this.get('model.dataExtensions').pushObject(node);
    },
    removeDataExtension(node, selected) {
      this.get('model.dataExtensions').removeObject(node);
    },
  }
});
