const axios = require("axios");
var address1 = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
var address2 = "0x1312e3C05aC40367cb80FF5fAAb1F75D563711c5";
var apiKey = "WTA2YH3YGEH5BJAGH8G2TSHQCFS8IA923A";
arr1 = [];
arr2 = [];
const fetchData = async (address1, address2) => {
  const data1 = await axios.get(
    "https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=" +
      address1 +
      "&startblock=0&endblock=99999999&sort=asc&apikey=" +
      apiKey,
  );
  const data2 = await axios.get(
    "https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=" +
      address2 +
      "&startblock=0&endblock=27025780&sort=asc&apikey=" +
      apiKey,
  );
  return { data1, data2 };
};

Promise.resolve(fetchData(address1, address2)).then((data) => {
  const { data1, data2 } = data;
  console.log(data1.data.result.length);
  console.log(data2.data.result.length);
  var arr1 = data1.data.result;
  var arr2 = data2.data.result;
  for (var i = 0; i < arr1.length; i++) {
    arr1[i] = arr1[i].to;
  }
  for (var i = 0; i < arr2.length; i++) {
    arr2[i] = arr2[i].to;
  }
  // console.log("This is array 1");
  // console.log(arr1);
  // console.log("This is array 2");
  // console.log(arr2);
  const filteredArray = arr1.filter((value) => arr2.includes(value));
  console.log("This is the intersection");
  console.log(filteredArray.length);

});
