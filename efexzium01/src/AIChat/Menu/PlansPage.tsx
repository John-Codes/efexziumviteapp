import './Plans.css';

const PlansPage = () => {
  const monthlyPrice = (2.50 * 30).toFixed(2);

  return (
    <div id="root">
      <div className="plans-container">
        <div className="stars"></div>
        <div className="content">
          <h1 className="main-title">Premium Access</h1>
          <div className="plans-grid">
            <div className="plan-card">
              <h2 className="plan-title">Daily Premium</h2>
              <p className="plan-description">
                Get full access to all premium features and content with our simple daily subscription.
              </p>
              <div className="plan-price">
                <div className="text-3xl font-bold mb-2">${'2.50'}/day</div>
                <div className="text-sm opacity-80">
                  (Approximately ${monthlyPrice}/month)
                </div>
              </div>
              <ul className="text-left w-full space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Full Platform Access
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Premium Content
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Cancel Anytime
                </li>
              </ul>
              {/* Original PayPal button container and scripts */}
              <div id="paypal-button-container-P-2WB2102078870682NM4P3HEQ"></div>
              <script src="https://www.paypal.com/sdk/js?client-id=AYihfJFFBqc1y7RajPEL63YwvY7Yx7DmP_fKzH_B4JFCDBcJbKQd83PXvUYIC5c6axJUZekd6y2ysScF&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script>
              <script>
                {`
                paypal.Buttons({
                    style: {
                        shape: 'rect',
                        color: 'gold',
                        layout: 'vertical',
                        label: 'subscribe'
                    },
                    createSubscription: function(data, actions) {
                      return actions.subscription.create({
                        /* Creates the subscription */
                        plan_id: 'P-2WB2102078870682NM4P3HEQ'
                      });
                    },
                    onApprove: function(data, actions) {
                      alert(data.subscriptionID); // You can add optional success message for the subscriber here
                    }
                }).render('#paypal-button-container-P-2WB2102078870682NM4P3HEQ'); // Renders the PayPal button
                `}
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;