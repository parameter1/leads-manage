import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';

import linkTypesMutation from 'leads-manage/gql/mutations/line-item/email/link-types';
import tagsMutation from 'leads-manage/gql/mutations/line-item/email/tags';
import categoriesMutation from 'leads-manage/gql/mutations/line-item/email/categories';

export default Controller.extend(FormMixin, {
  apollo: inject(),

  actions: {
    async setLinkTypes(linkTypes) {
      this.startAction();
      const id = this.get('model.id');
      const input = { id, linkTypes };
      const variables = { input };

      try {
        await this.get('apollo').mutate({ mutation: linkTypesMutation, variables }, 'emailLineItemLinkTypes');
        this.get('notify').info('Link types saved.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    async setTags(tags) {
      this.startAction();
      const id = this.get('model.id');
      const tagIds = tags.map(tag => tag.id);
      const input = { id, tagIds };
      const variables = { input };

      try {
        await this.get('apollo').mutate({ mutation: tagsMutation, variables }, 'emailLineItemTags');
        this.get('notify').info('Tags saved.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    async setCategories(categories) {
      this.startAction();
      const id = this.get('model.id');
      const categoryIds = categories.map(category => category.id);
      const input = { id, categoryIds };
      const variables = { input };

      try {
        await this.get('apollo').mutate({ mutation: categoriesMutation, variables }, 'emailLineItemCategories');
        this.get('notify').info('Email categories saved.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
