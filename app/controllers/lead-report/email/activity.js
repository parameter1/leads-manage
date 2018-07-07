import Controller from '@ember/controller';
import { computed, get } from '@ember/object';

export default Controller.extend({
  showEmail: computed('campaign.email.excludeFields.[]', function() {
    if (this.get('campaign.email.excludeFields').includes('emailAddress')) return false;
    return true;
  }),

  actions: {
    displayIframeModal(send) {
      this.set('iframe.title', get(send, 'name'));
      this.set('iframe.src', get(send, 'url'));
      this.set('iframe.show', true);
    },
    displayIdentityModal(identity) {
      this.set('activeIdentity', identity);
      this.set('isIdentityModalOpen', true);
    },
  },
});
