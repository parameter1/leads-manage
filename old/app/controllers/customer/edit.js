import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  isSaveDisabled: computed('model.externalSource.identifier', 'isActionRunning', function() {
    // if (this.get('isActionRunning')) return true;
    // if (this.get('model.externalSource.identifier')) return true;
    return false;
  }),
});
