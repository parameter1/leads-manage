import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

import emailCampaignTags from 'leads-manage/gql/mutations/campaign/email/tags';
import emailCampaignLinkTypes from 'leads-manage/gql/mutations/campaign/email/link-types';
import emailCampaignExcludedFields from 'leads-manage/gql/mutations/campaign/email/excluded-fields';

export default Controller.extend(FormMixin, {
  apollo: inject(),
  identityAttributes: inject(),
  linkTypes: inject(),

  linkTypeOptions: computed('linkTypes.types', 'model.allowedLinkTypes', function() {
    const selected = this.get('model.allowedLinkTypes');
    return this.get('linkTypes.types').filter(type => !selected.includes(type));
  }),

  excludeFieldOptions: computed('identityAttributes.getViewableFields', 'model.excludeFields', function() {
    const selected = this.get('model.excludeFields');
    return this.get('identityAttributes.getViewableFields').filter(o => !selected.includes(o.key));
  }),

  selectedFieldOptions: computed('identityAttributes.getViewableFields', 'model.excludeFields', function() {
    const selected = this.get('model.excludeFields');
    return this.get('identityAttributes.getViewableFields').filter(o => selected.includes(o.key));
  }),

  actions: {
    /**
     *
     * @param {*} tags
     */
    async updateTags(tags) {
      this.startAction();
      const id = this.get('model.id');
      const tagIds = tags.map(tag => tag.id);
      const input = { id, tagIds };
      const variables = { input };

      try {
        await this.get('apollo').mutate({ mutation: emailCampaignTags, variables }, 'emailCampaignTags');
        this.get('notify').info('Campaign tags set successfully.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     * @param {*} linkTypes
     */
    async updateLinkTypes(linkTypes) {
      this.startAction();
      const id = this.get('model.id');
      const input = { id, linkTypes };
      const variables = { input };

      try {
        await this.get('apollo').mutate({ mutation: emailCampaignLinkTypes, variables }, 'emailCampaignLinkTypes');
        this.get('notify').info('Campaign link types set successfully.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     */
    async updateExcludeFields(fields) {
      this.startAction();
      const id = this.get('model.id');
      const excludeFields = fields.map(field => field.key);
      const input = { id, excludeFields };
      const variables = { input };

      try {
        await this.get('apollo').mutate({ mutation: emailCampaignExcludedFields, variables }, 'emailCampaignExcludedFields');
        this.get('notify').info('Campaign fields successfully excluded.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
