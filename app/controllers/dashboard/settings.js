import Ember from 'ember';
import currencies from 'red-green-client/constants/currencies';

export default Ember.Controller.extend({
  currencies: currencies,
  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.currentUser'),
  userData: Ember.Object.create(), //object for storing updated attributes until we save
  actions: {
    updateEmail(value) {
      this.set('userData.email', value);
    },
    updateCurrency(value) {
      this.set('userData.currency', value);
    },
    save() {
      const attrsToSave = {};
      if (Ember.isPresent(this.get('userData.email'))) {
        attrsToSave.email = this.get('userData.email');
      }
      if (Ember.isPresent(this.get('userData.currency'))) {
        attrsToSave.currency = this.get('userData.currency');
      }

      this.get('currentUser').setProperties(attrsToSave);

      this.get('currentUser').save().then(() => {
        this.set('saveMessage', 'Saved.');
      });
    }
  }
});
