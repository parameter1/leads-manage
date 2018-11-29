import Controller from '@ember/controller';
import moment from 'moment';

export default Controller.extend({
  center: moment(),
  range: {
    start: moment().startOf('week'),
    end: moment().endOf('week'),
  },

  actions: {
    setRange(range) {
      const { start, end } = range;
      this.set('range', {
        start: start ? moment(start).startOf('week') : start,
        end: end ? moment(end).endOf('week') : end,
      });
    },
  },
});
