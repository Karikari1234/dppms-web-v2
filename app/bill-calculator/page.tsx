import { EnergyCalculatorForm } from "@/components/BillCalculator";

const BillCalculator = () => {
  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4 rounded border border-gray-200 p-8 shadow-lg">
        <EnergyCalculatorForm />
      </div>
      <div className="text-sm">
        <span className="text-red-500">**</span>LT-A Tariff Customer(Single
        Phase Meter) rates only.
      </div>
    </div>
  );
};

export default BillCalculator;
