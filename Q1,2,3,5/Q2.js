const Moralis = require('moralis/node')
const axios = require("axios");
const fs = require('fs')

var ethAdd  = "0xa1096194eedaa4157f0e689db04617b5ff81e64c";
var apiKey = "WTA2YH3YGEH5BJAGH8G2TSHQCFS8IA923A";
// var address="0x9056d15c49b19df52ffad1e6c11627f035c0c960"
var address="0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
var arr1 = [];
var arr2 = [];

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const fetchData = async () => {
  const data1 = await axios.get(
    "https://api.etherscan.io/api?module=account&action=tokennfttx&address=" +
      address +
      "&startblock=0&endblock=99999999&sort=asc&apikey=" +
      apiKey,

      // "https://api.etherscan.io/api?module=account&action=txlist&address="+
      // address+
      // "&startblock=0&endblock=2702578&sort=asc&apikey="+
      // apiKey,

  // "https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress="+
  // address+
  //  "&apikey="+apiKey 
  );
  const ether = await axios.get(
    "https://api-ropsten.etherscan.io/api?module=account&action=balance&address="+ethAdd+
   "&tag=latest&apikey="+apiKey,
  )
  // console.log(data1)
  eths= ether.data.result/1000000000000000000
  x=data1.data.result
    // console.log(x)
    
  return x;
};

// const complete= fetchData();

// const serverUrl = "https://7wdknolmy2nu.usemoralis.com:2053/server";
// const appId = "rltlLfrfy34YNSJIo0LKrrun3bJ7y89GhI0twaez";
// Moralis.start({ serverUrl, appId });
// async function getNfts(){
//   const options = {  chain: "eth",  address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",};
//   // const nfts = await Moralis.Web3API.account.getNFTs(options);
//   // const userEthNFTs = await Moralis.Web3API.account.getNFTs();
  
//   // console.log(nfts);
//   const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);
//   // console.log(NFTTrades);
//   y=NFTTrades.result[0]
//   return y
// }

// Promise.resolve(getNfts()).then((data) => {
//   const NFTTrades = data;
//   // console.log(data)
// });

Promise.resolve(fetchData()).then((complete) => {
  

      var today = new Date();
      var priorDate = new Date(new Date().setDate(today.getDate() - 120));
      var prevUnixDate = Math.floor(new Date(priorDate).getTime() / 1000);
      // console.log(complete)
      countMinted=0
      for (i=0;i<complete.length;i++){
        // if (complete[i].timeStamp>prevUnixDate){
          // arr2.push(complete[i].hash)
          arr2.push(complete[i].blockHash)
         
          
        // }
        
        if(complete[i].from=='0x0000000000000000000000000000000000000000'){
          countMinted=countMinted+1
        }
      }
      // console.log(arr2)
        
      // console.log(arr2[0])
      // console.log(countMinted)


});



// //time satamp to date
// // var format = {
// //   day: "numeric",
// //   month: "2-digit",
// //   year: "numeric"
// // };

// // console.log(new Date(a).toLocaleString("en-us", format));











const serverUrl = "https://7wdknolmy2nu.usemoralis.com:2053/server";
      const appId = "rltlLfrfy34YNSJIo0LKrrun3bJ7y89GhI0twaez";

      Moralis.start({ serverUrl, appId });
      async function getNfts(){
        // const options = {  chain: "eth",  address: "0x9056d15c49b19df52ffad1e6c11627f035c0c960",};
        const options = {  chain: "eth",  address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",};

        // const nfts = await Moralis.Web3API.account.getNFTs(options);
        // const userEthNFTs = await Moralis.Web3API.account.getNFTs();
        
        // console.log(nfts);
      const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);
      console.log(NFTTrades);
      complete=NFTTrades.result
      var price=[]
          for (i=0;i<complete.length;i++){
            arr2[i]=complete[i].transaction_hash
            const myArray = complete[i].block_timestamp.split("T",1);
            // if (arr2[i]=='0xdaed47889d25974214cb2b578e7ec0ffa9d035436bcb542ae87140bb060f4b96' || arr2[i]=='0xc97ea7fa6e58eddc190a4fc410054cb15f909da793742af09bcce018a127e1e3'){
            //     console.log("Present-------------------")
            // }
    //  y= complete[i].block_timestamp.split("T")
    //  console.log(y)
              // if (y>prevUnixDate){
              //   arr2.push(complete[i])
               
                
              // }
              // console(arr2)
              const data1 = await axios.get(   "https://api.etherscan.io/api?module=account&action=txlist&address="+
              complete[i].transaction_hash+
              
                    "&startblock=0&endblock=2702578&sort=asc&apikey="+
                    apiKey ) 
                    // console.log(data1); 
                    if (typeof(data) ==='undefined' ){
                      price.push(0)
                    }
                    else if (data.result =='Max rate limit reached, please use API Key for higher rate limit' ){
                      price.push(0)
                      sleep(500)
                    }
                    else{
                      price.push(data1.result.price)        

                    }
    }
    console.log(price)
    // console.log(arr2.sort().reverse());
      // const nftOwners = await Moralis.Web3API.token.getNFTOwners(options);
      // console.log(nftOwners);
  //   const transfersNFT = await Moralis.Web3API.account.getNFTTransfers(options);
  //   complete=transfersNFT.result
  //   // console.log(transfersNFT);
  //   for (i=0;i<complete.length;i++){
  //   //  y= complete[i].block_timestamp.split("T")
  //   //  console.log(y)
  //             // if (y>prevUnixDate){
  //             //   arr2.push(complete[i])
               
                
  //             // }
  //             // console(arr2)
  //             const data1 = await axios.get(   "https://api.etherscan.io/api?module=account&action=txlist&address="+
  //             // complete[i].transaction_hash+
              
  //                   "0x6975be450864c02b4613023c2152ee0743572325&startblock=0&endblock=2702578&sort=asc&apikey="+
  //                   apiKey ) 
  //                   console.log(data1);         
  //   }
  }

    getNfts()