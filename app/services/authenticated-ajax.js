import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  session: Ember.inject.service(),
  headers: Ember.computed('session', function() {
    const headers = {};
    this.get('session').authorize('authorizer:application',
      (headerName, headerValue) => {
        headers[headerName] = headerValue;
      }
    );

    return headers;
  })
});
