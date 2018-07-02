import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  urlGroups: computed.reads('model.urlGroups.[]'),
});
