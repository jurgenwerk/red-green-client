import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from "../config/environment";

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),
  authenticatedAjax: Ember.inject.service(),
  sessionAuthenticated() {
    // for keeping the defaults (attempted transition,
    // routeAfterAuth config etc..)
    this._super(...arguments);
    this.loadUser();
  },
  loadUser() {
    if (!this.get('session.isAuthenticated')) {
      return;
    }

    const url = `${ENV.apiBaseURL}/users/me`;
    const request = this.get('authenticatedAjax').request(url);
    request.then((userData) => {
      this.store.pushPayload(userData);
      const user = this.store.peekRecord('user', userData.data.id);
      this.set('session.currentUser', user);
    });
  },
  beforeModel() {
    this.loadUser();
  }
});
