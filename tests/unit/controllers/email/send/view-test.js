import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | email/send/view', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:email/send/view');
    assert.ok(controller);
  });
});
