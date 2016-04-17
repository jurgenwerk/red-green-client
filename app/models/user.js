import DS from 'ember-data';
import Ember from 'ember';
import currencies from 'red-green-client/constants/currencies'

export default DS.Model.extend({
  currency: DS.attr('string'),
  email: DS.attr('string'),
  currencySymbol: Ember.computed('currency', function() {
    return currencies[this.get('currency')].symbol;
  })
});
