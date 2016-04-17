import Ember from 'ember';
import BalanceChangePropertiesMixin from 'red-green-client/mixins/balance-change-properties';

export default Ember.Controller.extend(BalanceChangePropertiesMixin, {
  dashboard: Ember.inject.controller(),
  session: Ember.inject.service(),
  period: Ember.computed.alias('dashboard.period'),
  avgExpensePerDay: Ember.computed('expenseSum', function() {
    const dateParts = this.get('period').split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const daysInMonth = new Date(year, month, 0).getDate();
    return this.get('expenseSum')/daysInMonth;
  })
});
