import EmberObject from '@ember/object';

export default EmberObject.extend({

  all: null,

  unknownProperty() {
    const all = this.get('all');
    if (true === all) {
      return true;
    }
    return false;
  },
});
