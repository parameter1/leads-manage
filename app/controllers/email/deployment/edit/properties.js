import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import FormMixin from 'leads-manage/mixins/form-mixin';

import mutation from 'leads-manage/gql/mutations/email-deployment/edit/properties';

export default Controller.extend(FormMixin, {
  apollo: inject(),

  actions: {
    async update() {
      this.startAction();
      const {
        id,
        name,
        category,
        subject,
        preheader,
      } = this.get('model');

      const payload = {
        name,
        categoryId: get(category || {}, 'id'),
        subject,
        preheader,
      };
      const variables = { input: { id, payload } };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'updateEmailDeployment');
        this.get('notify').success('Properties saved.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});


