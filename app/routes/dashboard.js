import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    period: {
      refreshModel: true
    }
  },
  session: Ember.inject.service(),
  beforeModel(transition) {
    // trigger AuthenticatedRouteMixin’s beforeModel
    this._super(...arguments);

    if (transition.targetName === "dashboard.index"){
      transition.abort();
      this.transitionTo('dashboard.overview');
    }
  },
  model(params) {
    return this.store.query('balance-change', { filter: { period: params.period } });
  },
  actions: {
    logout() {
      this.get('session').invalidate();
    },
    refreshRoute() {
      this.refresh(); //refreshes the model
    }
  }
});
