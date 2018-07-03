import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  urlGroups: computed.reads('model.urlGroups.[]'),

  actions: {
    updateExcludedUrls(urlGroup, sendGroups) {
      const urlId = urlGroup.url.id;
      const id = this.get('model.id');
      const excludeUrls = sendGroups.map(sendGroup => ({
        urlId,
        sendId: sendGroup.send.id,
        active: sendGroup.active,
      }));
      console.info(id, excludeUrls);
    },
  },
});
