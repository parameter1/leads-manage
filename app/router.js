import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('lead-report', { path: 'lead-report/:hash' }, function() {
    this.route('email', { path: '/'}, function() {
      this.route('metrics', { path: '/' });
      this.route('leads');
      this.route('activity');
      this.route('export');
    });
    this.route('forms', function() {
      this.route('submissions', { path: ':form_id' });
    });
    this.route('ads', function() {
      this.route('leads', { path: '/' });
      this.route('export');
    });
    this.route('disabled');
  });
  this.route('link', function() {
    this.route('tracking', function() {

    });
    this.route('urls', function() {
      this.route('edit', { path: ':id' }, function() {
        this.route('email-sends');
      });
    });
    this.route('hosts');
  });
  this.route('customer', function() {
    this.route('edit', { path: ':id' });
    this.route('create');
  });
  this.route('identity', function() {
    this.route('view', { path: ':id' });
  });
  this.route('campaign', function() {
    this.route('edit', { path: ':id' }, function() {
      this.route('email', function() {
        this.route('links');
        this.route('identities');
      });
      this.route('forms', function() {
        this.route('submissions', { path: ':form_id' });
      });
      this.route('ads');
    });
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
    this.route('send', function() {
      this.route('view', { path: ':id' }, function() {
        this.route('urls');
      });
    });
    this.route('category', function() {
      this.route('view', { path: ':id' });
    });
    this.route('reporting');
  });
  this.route('form', function() {
    this.route('edit', { path: ':id' }, function() {
      this.route('entries');
    });
    this.route('create');
  });
  this.route('behavior', function() {
    this.route('edit', { path: ':id/edit' });
    this.route('view', { path: ':id' }, function() {
      this.route('run');
      this.route('results', function() {
        this.route('rows', { path: ':result_id' }, function() {
          this.route('exports');
        });
      });
    });
    this.route('create');
  });
});

export default Router;
