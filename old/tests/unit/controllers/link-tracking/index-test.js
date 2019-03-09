import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | link-tracking/index', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:link-tracking/index');
    assert.ok(controller);
  });
});
