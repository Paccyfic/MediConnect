import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FlutterwaveInit } from 'flutterwave-react-native';

interface MyCartState {
  isPending: boolean;
}

class MyCart extends React.Component<{}, MyCartState> {
  abortController: AbortController | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      isPending: false,
    };
  }

  componentWillUnmount() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  handlePaymentInitialization = async () => {
    this.setState(
      {
        isPending: true,
      },
      async () => {
        // set abort controller
        this.abortController = new AbortController();
        try {
          // initialize payment
          const paymentLink = await FlutterwaveInit(
            {
              tx_ref: generateTransactionRef(),
              authorization: '[merchant public key]',
              amount: 100,
              currency: 'USD',
              customer: {
                email: 'customer-email@example.com',
              },
              payment_options: 'card',
            },
            this.abortController.signal
          );
          // use payment link

          this.usePaymentLink(paymentLink);
        } catch (error: any) {
          // do nothing if our payment initialization was aborted
          if (error.code === "ABORTERROR") {
            return;
          }
          // handle other errors
          this.displayErrorMessage(error.message);
        }
      }
    );
  };

  generateTransactionRef = (): string => {
    // Generate a transaction reference
    return 'unique_transaction_ref';
  };

  usePaymentLink = (link: string) => {
    // Use the payment link (navigate to a webview or open in browser)
    console.log('Payment link:', link);
  };

  displayErrorMessage = (message: string) => {
    // Display error message to the user
    console.error('Error:', message);
  };

  render() {
    const { isPending } = this.state;
    return (
      <View>
        {/* Other components */}
        <TouchableOpacity
          style={[
            styles.paymentButton,
            isPending ? styles.paymentButtonBusy : {},
          ]}
          disabled={isPending}
          onPress={this.handlePaymentInitialization}
        >
          <Text>Pay $100</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paymentButton: {
    // your button styling here
  },
  paymentButtonBusy: {
    // your busy button styling here
  },
});

export default MyCart;
