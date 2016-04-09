import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  currency: DS.attr('string'),
  email: DS.attr('string')
});
