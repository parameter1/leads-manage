import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  startsEnds: computed('model.range.{start,end}', function() {
    const now = Date.now();
    const start = this.get('model.range.start');
    const end = this.get('model.range.end');
    if (start > now) return `Starts ${moment().to(start)}`;
    if (end > now) return `Ends ${moment().to(end)}`;
  }),
});
