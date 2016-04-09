import Ember from 'ember';
import ENV from "../config/environment";

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  session: Ember.inject.service(),
  actions: {
    signup(email, password) {
      const userParams = {
        data: {
          attributes: {
            email: email,
            password: password,
            currency: 'USD'
          }
        }
      };

      this.controller.set('isSigningUp', true);

      const url = `${ENV.apiBaseURL}/users`;
      const request = this.get('ajax').request(url, {
        method: 'POST',
        data: userParams
      });

      request
        .then(() => this.get('session').authenticate('authenticator:oauth2', email, password))
        .catch(() => this.controller.set('signupError', 'Signup error.'))
        .finally(() => this.controller.set('isSigningUp', false));
    }
  }
});
