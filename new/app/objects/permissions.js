import EmberObject from '@ember/object';
import { typeOf } from '@ember/utils';
import Rules from './permission-rules';

export default EmberObject.extend({

  allowAll: false,

  fullAccess(bit = true) {
    this['allowAll'] = Boolean(bit);
  },

  set(key, rules) {
    const toSet = (typeOf(rules) === 'boolean') ? { all: rules } : rules;
    return this._super(key, Rules.create(toSet));
  },

  unknownProperty() {
    const toSet = (true === this.get('allowAll')) ? { all: true } : { };
    return Rules.create(toSet);
  },
});
