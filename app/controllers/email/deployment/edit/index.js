import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import FormMixin from 'leads-manage/mixins/form-mixin';

import mutation from 'leads-manage/gql/mutations/email-deployment/edit/html';

export default Controller.extend(FormMixin, {
  apollo: inject(),

  html: computed('model.ourHtml', function() {
    console.info('HTML!');
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

  saveDisabled: computed('isActionRunning', 'hasHtmlChanged', function() {
    if (this.get('isActionRunning') || !this.get('hasHtmlChanged')) return true;
    return false;
  }),

  actions: {
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


