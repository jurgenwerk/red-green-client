import Ember from 'ember';

export default Ember.Component.extend({
  barStyle: Ember.computed('widthPercent', function() {
    const css = `width: ${this.get('widthPercent')}%`;
    return Ember.String.htmlSafe(css);
  })
});
