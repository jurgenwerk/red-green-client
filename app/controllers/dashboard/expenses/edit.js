import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    save(balanceChangeData) {
      this.get('model').setProperties(balanceChangeData);
      this.get('model').save().then((balanceChange) => {
        this.transitionToRoute('dashboard.expenses');
        this.send('refreshRoute');
      });
    }
  }
});
