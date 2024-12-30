import axios from "axios";
var qs = require("qs");
let data = qs.stringify({
  reqXml:
    '<xml customerNo="3214789" meterNo="010100000010" userName="zubayer" userPass="m7PM/lj+MYKoUcaydxQQe6Ez6Qal5N5DQAArpAmFcgOn+TLK3tN+VA==" />',
});

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: `${process.env.TEST_API_URL}/prepay/prepay/testCode/customIbcs!callCenterPrepaidTokenAPI.do`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie:
      "userName=zubayer; JSESSIONID=B510D96DA30A1CDF8F942296438225E8.tomcat7_a",
  },
  data: data,
};

const CustomerOrderInformationCard = async ({ x }: { x: any }) => {
  const search = x;
  const d: any = await axios
    .request(config)
    .then((response: { data: any }) => {
      console.log(JSON.stringify(response.data));
      return JSON.stringify(response.data);
    })
    .catch((error: any) => {
      console.log(error);
    });
  return <div>{search ? `${x!.id} : ${d}` : <div>No Data</div>}</div>;
};

export default CustomerOrderInformationCard;
