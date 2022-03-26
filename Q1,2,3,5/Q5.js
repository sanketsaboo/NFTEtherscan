


const axios = require("axios");
var address1 = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
var address2 = "0x1312e3C05aC40367cb80FF5fAAb1F75D563711c5";
var apiKey = "WTA2YH3YGEH5BJAGH8G2TSHQCFS8IA923A";
arr2 = [];
const fetchDataContract = async (address1) => {
  const data1 = await axios.get(
    "https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=" +
      address1 +
      "&startblock=0&endblock=99999999&sort=asc&apikey=" +
      apiKey,
  );
 
  return data1;
};

Promise.resolve(fetchDataContract(address1)).then((data) => {
  const data1 = data;
  console.log(data1.data.result);
  var arr1 = data1.data.result;
  var countMinted=0
  var notmintedArr=[]
  for (var i = 0; i < arr1.length; i++) {
    if(arr1[i].from =='0x0000000000000000000000000000000000000000'){
      countMinted=countMinted+1
    }
    else{
      notmintedArr.push(arr1[i])
    }
    arr1[i] = arr1[i].tokenID;
    
  }

  // console.log(arr1)
  // const filteredArray = arr1.filter((value) => arr2.includes(value));
  // arr1 = [...new Set(arr1)];
  print(notmintedArr)
  console.log(countMinted)
  console.log(arr1.length)
  // console.log(filteredArray.length);

});
