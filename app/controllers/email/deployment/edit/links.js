import Controller from '@ember/controller';
import { inject } from '@ember/service';
import LoadingMixin from 'leads-manage/mixins/loading-mixin';

export default Controller.extend(LoadingMixin, {
  /**
   * Determines if the processor has finished.
   */
  hasFinished: false,

  errorProcessor: inject(),

  /**
   * The URL processing service.
   */
  urlProcessor: inject(),

  init() {
    this._super(...arguments);
    this.set('results', []);
  },

  /**
   * Actions
   */
  actions: {
    /**
     * Processes the currently set HTML.
     */
    async process() {
      this.showLoading();
      this._clearValuesForPreProcess();

      try {
        const urls = await this.get('urlProcessor').extractFrom(this.get('model.ourHtml'));
        this.set('results', urls);
      } catch (e) {
        this.get('errorProcessor').show(e);
      } finally {
        this.set('hasFinished', true);
        this.hideLoading();
      }
    },
  },

  /**
   * Clears required value before processing.
   */
  _clearValuesForPreProcess() {
    this.get('results').clear();
    this.set('hasFinished', false);
  },
});
