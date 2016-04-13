import Ember from 'ember';
import BalanceChangePropertiesMixin from 'red-green-client/mixins/balance-change-properties';
import moment from 'moment';

export default Ember.Controller.extend(BalanceChangePropertiesMixin, {
  session: Ember.inject.service(),
  queryParams: ['period'],
  period: moment().format("YYYY-MM"), //default period
  actions: {
    goPeriodBack() {
      const previousPeriod = moment(this.get('period')).subtract(1, "month").format("YYYY-MM");
      this.set('period', previousPeriod);
    },
    goPeriodNext() {
      const nextPeriod = moment(this.get('period')).add(1, "month").format("YYYY-MM");
      this.set('period', nextPeriod);
    },
    logout() {
      this.get('session').invalidate();
    }
  }
});
