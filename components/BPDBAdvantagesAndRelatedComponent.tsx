const BPDBAdvantagesAndRelatedComponent = () => {
  return (
    <div className="mb-8 space-y-4 text-base md:mb-16 md:flex-row md:space-x-4 md:space-y-0">
      <div className="mb-4">
        <h2 className="heading-text text-xl font-bold">
          Traditional Postpaid Billing
        </h2>
        <p className="mb-2">
          Traditional postpaid billing involves meter readers collecting
          readings from consumers postpaid meters, leading to time-consuming and
          manpower-intensive processes. Billing accuracy is compromised by human
          errors, and consumers face challenges paying bills after electricity
          usage. To address these issues, BPDB introduced prepaid metering.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="heading-text text-xl font-bold">
          Advantages of Prepaid Meters
        </h2>
        <ul className="ml-6 list-disc">
          <li>
            Efficient energy management: Customers control usage by paying for
            affordable energy, promoting responsible consumption.
          </li>
          <li>
            Awareness of energy misuse: Prepaid meters help users identify and
            address energy inefficiencies in appliances, fostering
            energy-conscious behavior.
          </li>
          <li>
            Elimination of overbilling: Users only pay for what theyve prepaid,
            avoiding concerns about end-of-month bills.
          </li>
          <li>
            Accuracy in billing: Prepayment meters dont rely on meter readings,
            preventing overcharging.
          </li>
          <li>
            TOU tariff benefits: Customers with compatible prepaid meters can
            still take advantage of time-of-use tariff rates and slab
            facilities.
          </li>
          <li>
            1% rebate on energy charges, as per the existing tariff order.
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="heading-text text-xl font-bold">
          Third-Party Vending System
        </h2>
        <p className="mb-2">
          The traditional system requires physical visits to Utility Vending
          Stations during office hours for purchasing prepaid energy tokens.
          BPDB introduced the Third-Party Vending System through Grameenphone,
          Robi, and bKash, providing secure, cost-effective, and 24/7 vending
          services via mobile USSD and apps. Objectives include reducing costs,
          enhancing customer service, ensuring transparency, securing cash flow,
          and modernizing the prepaid metering system.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="heading-text text-xl font-bold">
          Smart Metering System
        </h2>
        <p className="mb-2">
          BPDB focuses on deploying smart meters for remote monitoring and
          control. Benefits include automatic recharge for consumers and cost
          reduction for utilities through remote configuration, batch
          operations, and load management. Smart meters also improve data
          accuracy, reduce line loss, and enable critical and non-critical
          reporting functionalities.
        </p>
      </div>
    </div>
  );
};

export default BPDBAdvantagesAndRelatedComponent;
