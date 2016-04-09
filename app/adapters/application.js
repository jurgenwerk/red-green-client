import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from "../config/environment";

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
  namespace: ENV.apiNamespace,
  host: ENV.serverURL,

  pathForType (type) {
    let underscored = Ember.String.underscore(type);
    return Ember.String.pluralize(underscored);
  },

  // this is a fix for when a device sleeps for longer than token lasts
  // (ESA bug https://github.com/simplabs/ember-simple-auth/issues/831)
  ajax() {
    const session = this.get('session');

    if (new Date().getTime() > session.get('data.authenticated.expires_at')) {
      const authenticator = this.container.lookup(session.get('data.authenticated.authenticator'));
      return authenticator._refreshAccessToken().then(() => {
        return this._super(...arguments);
      });
    } else {
      return this._super(...arguments);
    }
  }
});
