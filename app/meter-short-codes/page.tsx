import ShortCodeTable from "@/components/ShortCodeTable";

const MeterShortCodes = () => {
  return (
    <div className="">
      <div className="mb-2 text-xl font-bold leading-normal animate-once md:text-left md:text-4xl md:leading-tight">
        Meter Short Code
      </div>
      <p
        className="mb-8 md:w-2/3
      "
      >
        Meter short codes are a convenient way to access information about your
        electricity meter, such as your balance, consumption, and tamper status.
        Different meter manufacturers have different short codes, so it is
        important to consult your meter&apos;s manual for the specific codes for
        your meter.
      </p>
      <ShortCodeTable></ShortCodeTable>
    </div>
  );
};

export default MeterShortCodes;
