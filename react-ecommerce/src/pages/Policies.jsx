import React from 'react';

const Policies = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-5">Policies & Store Rules</h1>

      {/* Policies & Terms Section */}
      <section className="mb-5">
        <h2 className="mb-3">Policies & Terms</h2>

        <h4>1. Terms of Use</h4>
        <p>
          By using this website, you agree to comply with our terms of use.
          All content, products, and services are provided as-is.
        </p>

        <h4>2. Privacy Policy</h4>
        <p>
          We respect your privacy and only collect information necessary to provide our services.
          Your data will never be sold to third parties.
        </p>

        <h4>3. Payment & Refunds</h4>
        <p>
          Payments are processed securely through trusted gateways.
          Refunds are issued according to our refund policy.
        </p>

        <h4>4. Shipping & Delivery</h4>
        <p>
          Delivery times may vary depending on location and availability.
          We are not responsible for delays caused by shipping carriers.
        </p>

        <h4>5. Intellectual Property</h4>
        <p>
          All content, logos, images, and products are the property of the site owner.
          Copying or reproducing content without permission is prohibited.
        </p>
      </section>

      {/* Store Rules Section */}
      <section className="mb-5">
        <h2 className="mb-3">Store Rules</h2>

        <h4>1. Customer Conduct</h4>
        <p>
          Customers must behave respectfully while using our website and services.
          Abusive language or actions will not be tolerated.
        </p>

        <h4>2. Account Responsibility</h4>
        <p>
          Customers are responsible for keeping their account information secure.
          Sharing your account or password is not allowed.
        </p>

        <h4>3. Ordering Rules</h4>
        <p>
          Orders must be placed with accurate and complete information.
          Fake or fraudulent orders may result in account suspension.
        </p>

        <h4>4. Payment Rules</h4>
        <p>
          Payments must be completed using our approved methods.
          Refunds will only be processed according to our refund policy.
        </p>

        <h4>5. Product Returns & Exchanges</h4>
        <p>
          Products can only be returned or exchanged if they meet our return/exchange policy.
          Items must be in original condition.
        </p>

        <h4>6. Shipping & Delivery</h4>
        <p>
          Customers should provide correct delivery information.
          Delays caused by incorrect addresses are the customer's responsibility.
        </p>

        <h4>7. Intellectual Property</h4>
        <p>
          All content, logos, and products on this site are the property of the store.
          Copying or reproducing content without permission is prohibited.
        </p>
      </section>

      <section>
        <h4>Contact</h4>
        <p>
          For questions about our policies or store rules, please contact us via our support email or contact form.
        </p>
      </section>
    </div>
  );
};

export default Policies;