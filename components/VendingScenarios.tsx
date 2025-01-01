import { scenariosData } from "@/lib/vending-scenario";
import React from "react";
import { Locale } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";

const PrepaidMeterCharges = async ({ locale }: { locale: Locale }) => {
  // Mocked tabular data for each scenario
  const translation = await getTranslation(locale);

  return (
    <div className="">
      <h1 className="heading-text mb-4 !text-left md:mb-8">
        {translation("prepaid_meter_charges.title")}
      </h1>

      <p className="flex flex-col space-y-4 text-base text-gray-700 md:mb-4 md:flex-row md:space-x-4 md:space-y-0">
        {translation("prepaid_meter_charges.description")}
      </p>
      {/*Add this*/}
      {/* <p className="mb-4">
        In the first scenario, the customer deos vending for the <b>1st</b> time
        in the month.In second scenario customer does vending <b>2nd</b> time in
        the same month. And in the third scenario, customer does vending after
        three months.
      </p> */}

      <p className="flex flex-col space-y-4 text-base text-gray-700 md:mb-4 md:flex-row md:space-x-4 md:space-y-0">
        {translation("prepaid_meter_charges.example")}
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
