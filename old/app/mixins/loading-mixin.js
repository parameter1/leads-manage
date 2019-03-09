import Mixin from '@ember/object/mixin';
import { inject } from '@ember/service';
import $ from 'jquery';

export default Mixin.create({
  loadingDisplay: inject(),

  showLoading() {
    $('body').addClass('transitioning');
    this.get('loadingDisplay').show();
  },
  hideLoading() {
    this.get('loadingDisplay').hide();
    $('body').removeClass('transitioning');
  },
});
