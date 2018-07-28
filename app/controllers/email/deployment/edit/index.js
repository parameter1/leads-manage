import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import FormMixin from 'leads-manage/mixins/form-mixin';

import deleteEmailDeployment from 'leads-manage/gql/mutations/email-deployment/delete';
import mutation from 'leads-manage/gql/mutations/email-deployment/edit/html';

export default Controller.extend(FormMixin, {
  apollo: inject(),

  isDeleting: false,

  disabled: computed.or('isDeleting', 'isActionRunning'),

  html: computed('model.ourHtml', function() {
    const html = this.get('model.ourHtml');
    if (!html) return '';
    return html;
  }),

  editorLines: computed('isFullscreen', function() {
    if (this.get('isFullscreen')) return null;
    return 25;
  }),

  hasHtmlChanged: computed('originalHtml', 'html', function() {
    return this.get('originalHtml') !== this.get('html');
  }),

  saveDisabled: computed('disabled', 'hasHtmlChanged', function() {
    if (this.get('disabled') || !this.get('hasHtmlChanged')) return true;
    return false;
  }),

  actions: {
    /**
     *
     */
    copy() {
      const queryParams = {
        clone: this.get('model.id'),
      };
      this.transitionToRoute('email.deployment.create', { queryParams });
    },

    async delete() {
      this.startAction();
      const { id } = this.get('model');
      const mutation = deleteEmailDeployment;
      const variables = { input: { id } };

      try {
        await this.get('apollo').mutate({ mutation, variables }, 'deleteEmailDeployment');
        this.endAction();
        return this.transitionToRoute('email.deployment.index');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     * @param {*} editor
     */
    setEditor(editor) {
      this.set('editor', editor);
      const handler = () => {
        if (document.webkitFullscreenElement === null) {
          this.set('isFullscreen', false);
        }
      }

      document.addEventListener('fullscreenchange', handler);
      document.addEventListener('webkitfullscreenchange', handler);
      document.addEventListener('mozfullscreenchange', handler);
      document.addEventListener('msfullscreenchange', handler);
    },

    /**
     *
     */
    fullscreen() {
      const editor = this.get('editor');
      const { container } = editor;
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.mozRequestFullscreen) {
        container.mozRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
      this.set('isFullscreen', true);
    },

    /**
     *
     */
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
        this.set('model.ourHtml', response.ourHtml);
        this.get('notify').success('HTML saved.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});


