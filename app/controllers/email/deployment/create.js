import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import FormMixin from 'leads-manage/mixins/form-mixin';

import mutation from 'leads-manage/gql/mutations/email-deployment/create';

export default Controller.extend(FormMixin, {
  apollo: inject(),

  actions: {
    async create() {
      this.startAction();
      const {
        name,
        category,
        subject,
        preheader,
      } = this.get('model');

      const input = {
        name,
        categoryId: get(category || {}, 'id'),
        subject,
        preheader,
      };
      const variables = { input };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createEmailDeployment');
        this.transitionToRoute('email.deployment.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});


