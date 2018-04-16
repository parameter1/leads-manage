import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('link-tracking', function() {

  });
  this.route('customer', function() {
    this.route('edit', { path: ':id' });
    this.route('create');
  });
  this.route('tag', function() {
    this.route('edit', { path: ':id' });
    this.route('create');
  });
  this.route('user', function() {
    this.route('edit', { path: ':id' });
    this.route('create');
  });
  this.route('email', function() {
    this.route('deployment', function() {
      this.route('view', { path: ':id' });
    });
  });
});

export default Router;
