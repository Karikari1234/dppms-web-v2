import { scenariosData } from "@/lib/vending-scenario";
import React from "react";

const PrepaidMeterCharges = () => {
  // Mocked tabular data for each scenario

  return (
    <div className="">
      <h1 className="heading-text mb-4 !text-left md:mb-8">
        Prepaid Meter Charges Explained
      </h1>

      <p className="flex flex-col space-y-4 text-base text-gray-700 md:mb-4 md:flex-row md:space-x-4 md:space-y-0">
        Prepaid meter consumers have to pay Meter Rent and Demand Charge as per
        the Govt. rule only for the 1st vending of the month. If a consumer buys
        the meter by a one-time payment, then the consumer does not have to pay
        meter rent monthly.
      </p>
      {/*Add this*/}
      {/* <p className="mb-4">
        In the first scenario, the customer deos vending for the <b>1st</b> time
        in the month.In second scenario customer does vending <b>2nd</b> time in
        the same month. And in the third scenario, customer does vending after
        three months.
      </p> */}

      <p className="flex flex-col space-y-4 text-base text-gray-700 md:mb-4 md:flex-row md:space-x-4 md:space-y-0">
        Prepaid meter charges are explained here using an example of Prepaid
        meter consumer of BPDB who is a LT-A Residential Consumer and uses
        Single Phase Connection and 2 KW Sanction Load .
      </p>
      {/* Render scenarios */}
      {scenariosData.map((scenario, index) => (
        <div
          key={index}
          className="mb-8 text-base  md:mb-16 md:flex-row md:space-x-4"
        >
          <h4 className="text-md mb-4 !text-left font-bold md:mb-8">
            Vending Scenario {index + 1}
          </h4>

          <div className="mb-4 flex flex-col space-y-4 text-base text-gray-700 md:mb-4 md:flex-row md:space-x-4">
            {scenario.description}
          </div>

          <div className="mb-4">
            <table className="min-w-full overflow-hidden rounded-md border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b px-4 py-2">Charge Details</th>
                  <th className="border-b px-4 py-2">Calculation</th>
                  <th className="border-b px-4 py-2">Amount of Money (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {scenario.charges.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td
                      className={`border-b px-4 py-2 text-center ${
                        row.chargeDetails === "Energy Amount" ? "font-bold" : ""
                      }`}
                    >
                      {row.chargeDetails}
                    </td>
                    <td
                      className={`border-b px-4 py-2 text-center ${
                        row.chargeDetails === "Energy Amount" ? "font-bold" : ""
                      }`}
                    >
                      {row.calculation}
                    </td>
                    <td
                      className={`border-b px-4 py-2 text-center ${
                        row.chargeDetails === "Energy Amount" ? "font-bold" : ""
                      }`}
                    >
                      {row.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Additional Text */}
    </div>
  );
};

export default PrepaidMeterCharges;
