import EmberObject from '@ember/object';
import FormMixinMixin from 'leads-manage/mixins/form-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | form-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let FormMixinObject = EmberObject.extend(FormMixinMixin);
    let subject = FormMixinObject.create();
    assert.ok(subject);
  });
});
