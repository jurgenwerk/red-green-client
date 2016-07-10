import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from "../config/environment";

export default AjaxService.extend({
  session: Ember.inject.service(),
  trustedHosts: [ENV.serverURL.split('//')[1]],
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
