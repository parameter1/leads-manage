import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import FormMixin from 'leads-manage/mixins/form-mixin';

import mutation from 'leads-manage/gql/mutations/email-deployment/edit/html';


export default Controller.extend(FormMixin, {
  apollo: inject(),

  hasHtmlChanged: computed('originalHtml', 'model.ourHtml', function() {
    return this.get('originalHtml') !== this.get('model.ourHtml');
  }),

  saveDisabled: computed('isActionRunning', 'hasHtmlChanged', function() {
    if (this.get('isActionRunning') || !this.get('hasHtmlChanged')) return true;
    return false;
  }),

  actions: {
    async setHtml() {
      this.startAction();
      const {
        id,
        ourHtml,
      } = this.get('model');

      const input = {
        id,
        html: ourHtml,
      };
      const variables = { input };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'emailDeploymentHtml');
        this.set('originalHtml', response.ourHtml);
        this.get('notify').success('HTML saved.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});


