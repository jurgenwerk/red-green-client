import Ember from 'ember';
import accounting from "accounting";
import moment from 'moment';

export default Ember.Component.extend({
  init() {
    this._super(...arguments); // to ensure this hook is called for the object we’re extending from
    const valueForInput = this.get('balanceChange.value') ?
      this.formatValue(this.get('balanceChange.value')) : null;
    this.set('valueForInput', valueForInput);
    this.set('balanceChangeData', this.get('balanceChange').getProperties('value', 'entryDate'));
  },
  formatValue(value) {
    // take cents and turn it into display value for input
    return accounting.formatMoney(value/100, "");
  },
  unformatInput(input) {
    // take the user input and turn it into cents
    return Math.round(accounting.unformat(input)*100);
  },
  valueForDate: Ember.computed('balanceChangeData.entryDate', {
    get() {
      return this.get('balanceChangeData.entryDate');
    },
    set(key, value) {
      this.set('balanceChangeData.entryDate', moment(value).format("YYYY-MM-DD"));
      return value;
    }
  }),
  valueIsNegative: Ember.computed('balanceChangeData.value', function() {
    return this.get('balanceChangeData.value') < 0;
  }),
  isValid: Ember.computed('balanceChangeData.value', 'valueIsNegative', function() {
    return this.get('balanceChangeData.value') && !this.get('valueIsNegative');
  }),
  disableButton: Ember.computed('balanceChange.isSaving', 'isValid', function() {
    return this.get('balanceChange.isSaving') || !this.get('isValid');
  }),
  actions: {
    updateValueFromInput(value) {
      this.set('balanceChangeData.value', this.unformatInput(value));
    }
  }
});
