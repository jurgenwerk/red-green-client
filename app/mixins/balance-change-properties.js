import Ember from 'ember';

export default Ember.Mixin.create({
  balanceChanges: Ember.computed.alias('model'),
  incomes: Ember.computed('balanceChanges.[]', function() {
    return this.get('balanceChanges').filterBy('changeType', 'income');
  }),
  expenses: Ember.computed('balanceChanges.[]', function() {
    return this.get('balanceChanges').filterBy('changeType', 'expense');
  }),
  incomeValues: Ember.computed('incomes.[]', 'incomes.@each.value', function() {
    return this.get('incomes').mapBy('value');
  }),
  expenseValues: Ember.computed('expenses.[]', 'expenses.@each.value', function() {
    return this.get('expenses').mapBy('value');
  }),
  incomeSum: Ember.computed.sum('incomeValues'),
  expenseSum: Ember.computed.sum('expenseValues'),
  sumDifference: Ember.computed('incomeSum', 'expenseSum', function() {
    return this.get('incomeSum') - this.get('expenseSum');
  })
});
