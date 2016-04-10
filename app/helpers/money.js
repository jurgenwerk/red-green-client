import Ember from 'ember';
import accounting from "accounting";

export function money(params){
  // value is in cents
  const value = params[0]/100;
  const symbol = params[1];
  return accounting.formatMoney(value, symbol);
}

export default Ember.Helper.helper(money);
