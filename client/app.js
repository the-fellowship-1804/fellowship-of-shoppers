import React from 'react';
import Routes from './routes';
import { Navbar } from './components';
import { StripeProvider } from 'react-stripe-elements';

class App extends React.Component {
  constructor() {
    super();
    this.state = { stripe: null };
  }
  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe('pk_test_1BGAQuuZplpLNN1Y5QC5V08o')
      });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe('pk_test_1BGAQuuZplpLNN1Y5QC5V08o')
        });
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <StripeProvider stripe={this.state.stripe}>
          <Routes />
        </StripeProvider>
      </div>
    );
  }
}

export default App;
