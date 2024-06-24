interface ShortCode {
  id?: number;
  information: string;
  hexing: string;
  inhe1P: string;
  inhe3P: string;
  linyang: string;
  eastern: string;
}

export const meterShortCodes: Array<ShortCode> = [
  {
    information: "Meter Activation",
    hexing: "865",
    inhe1P: "37120",
    inhe3P: "37120",
    linyang: "865",
    eastern: "Clear Temper Token",
  },
  {
    information: "Logoff Return Token",
    hexing: "818",
    inhe1P: "54",
    inhe3P: "C6015",
    linyang: "",
    eastern: "051",
  },
  {
    information: "Relay tripping cause",
    hexing: "806",
    inhe1P: "",
    inhe3P: "",
    linyang: "008",
    eastern: "041",
  },
  {
    information: "Emergency balance start",
    hexing: "811",
    inhe1P: "89898686",
    inhe3P: "89898686",
    linyang: "809",
    eastern: "13501",
  },
  {
    information: "Meter numer",
    hexing: "804",
    inhe1P: "30",
    inhe3P: "C10",
    linyang: "100",
    eastern: "011",
  },
  {
    information: "Sanction load",
    hexing: "869",
    inhe1P: "19",
    inhe3P: "21350",
    linyang: "007",
    eastern: "004",
  },
  {
    information: "Remaining balance",
    hexing: "801",
    inhe1P: "00",
    inhe3P: "C501",
    linyang: "019",
    eastern: "010",
  },
  {
    information: "Remaining emergency balance",
    hexing: "981",
    inhe1P: "38/59",
    inhe3P: "",
    linyang: "106",
    eastern: "",
  },
  {
    information: "Last recharge amount",
    hexing: "817",
    inhe1P: "31",
    inhe3P: "CL401",
    linyang: "200",
    eastern: "050",
  },
  {
    information: "Last recharge token",
    hexing: "830",
    inhe1P: "53",
    inhe3P: "C6014",
    linyang: "201",
    eastern: "",
  },
  {
    information: "Token sequence number",
    hexing: "889",
    inhe1P: "52",
    inhe3P: "C6013",
    linyang: "011",
    eastern: "090",
  },
  {
    information: "Current month uses",
    hexing: "814",
    inhe1P: "01",
    inhe3P: "",
    linyang: "803",
    eastern: "047",
  },
  {
    information: "Last month uses",
    hexing: "820",
    inhe1P: "",
    inhe3P: "",
    linyang: "820",
    eastern: "053",
  },
  {
    information: "Status of friendly mode",
    hexing: "900",
    inhe1P: "51/56",
    inhe3P: "C6011,C6012",
    linyang: "785",
    eastern: "100",
  },
  {
    information: "Voltage",
    hexing: "877",
    inhe1P: "07",
    inhe3P: "L1-3270,L2-5270,L3-7270",
    linyang: "760",
    eastern: "070",
  },
  {
    information: "Current",
    hexing: "874",
    inhe1P: "08",
    inhe3P: "L1-3170,L2-5170,L3-7170",
    linyang: "763",
    eastern: "071",
  },
  {
    information: "Overdraw theshold",
    hexing: "810",
    inhe1P: "38",
    inhe3P: "C505",
    linyang: "106",
    eastern: "044/045",
  },
  {
    information: "Tariff solution",
    hexing: "809/886",
    inhe1P: "03",
    inhe3P: "C701",
    linyang: "005",
    eastern: "008",
  },
  {
    information: "Relay closing time",
    hexing: "892",
    inhe1P: "",
    inhe3P: "",
    linyang: "",
    eastern: "",
  },
  {
    information: "Relay tripping time",
    hexing: "893",
    inhe1P: "",
    inhe3P: "",
    linyang: "",
    eastern: "",
  },
];

meterShortCodes.forEach((item, index) => {
  item.id = index + 1;
});
