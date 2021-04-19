import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  displayAdMetrics: computed('model.{adMetrics.enabled,customer.linkedAdvertisers.googleAdManager.nodes.length}', function() {
    return Boolean(this.get('model.adMetrics.enabled') && this.get('model.customer.linkedAdvertisers.googleAdManager.nodes.length'));
  }),
});
