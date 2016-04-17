import Ember from 'ember';
import moment from 'moment';

export function periodInWords(params/*, hash*/) {
  return moment(params[0]).format("MMMM YYYY");
}

export default Ember.Helper.helper(periodInWords);
