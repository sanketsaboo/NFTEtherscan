const express = require("express");
const bodyParser = require("body-parser");
const app = express()
const ejs = require("ejs");
const Moralis = require('moralis/node')
const axios = require("axios");

const sdk = require('api')('@opensea/v1.0#1e41yo45l0vihg6s');

require("dotenv").config();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var ethAdd  = "0xa1096194eedaa4157f0e689db04617b5ff81e64c";
var apiKey =  process.env.apiKey;
var address="0x9056d15c49b19df52ffad1e6c11627f035c0c960";
const serverUrl = process.env.serverUrl;
const appId = process.env.appId;

Moralis.start({ serverUrl, appId });

// const findDuplicates = (arr = []) => {
//   let map = {};
//   let res = [];
//   for(let i = 0; i < arr.length; i++) {
//      if(map[arr[i]]) {
//         if(map[arr[i]] === 1) {
//            res.push(arr[i]);
//         }
//         map[arr[i]] = map[arr[i]] + 1;
//      } else {
//         map[arr[i]] = 1;
//      };
//   };
//   return res;
// };


// fetchData,fetchDataContract Returns the list of ERC-721 ( NFT ) tokens transferred by an address, with optional filtering by token contract.
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

const fetchDataContract = async (address1) => {
  const data1 = await axios.get(
    "https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=" +
      address1 +
      "&startblock=0&endblock=99999999&sort=asc&apikey=" +
      apiKey,
  );
 
  return data1;
};




app.get("/Q1", async(req, res) => {
//Address to be checked This whole thing is done using Etherscan

    var address1 = "0x614917F589593189ac27aC8B81064CBe450C35e3";
    var address2 = "0x59468516a8259058baD1cA5F8f4BFF190d30E066";

    var arr1to = [];
    var arr1from=[];
    var arr1to = [];
    var arr1from=[];
    //calling the function fetchData
    const {data1, data2} =  await fetchData(address1, address2);
    // console.log(data1.data.result.length);
    // console.log(data2.data.result.length);
    //Getting only the result data
    var arr1 = data1.data.result;
    var arr2 = data2.data.result;
    //Find all the transactions and store them into any array
    for (var i = 0; i < arr1.length; i++) {
      arr1to[i] = arr1[i].to;
      arr1from[i]=arr1[i].from;
    }
    arr1to = [...new Set(arr1to)];
    arr1from = [...new Set(arr1from)];

    for (var i = 0; i < arr2.length; i++) {
      arr2to[i] = arr2[i].to;
      arr2from[i]=arr2[i].from;
    }
    arr2to = [...new Set(arr2to)];
    arr2from = [...new Set(arr2from)];

    //Concatination of arrays and use of set to make sure that no duplicate items are presnt in the given array
    arr1= arr1to.concat(arr1from)
    arr1 = [...new Set(arr1)];
    arr2= arr2to.concat(arr2from)
    arr2 = [...new Set(arr2)];
    //Checks if the element of arr1 is presnt i arr2 or not and then inckudes it.
    const filteredArray = arr1.filter((value) => arr2.includes(value));
    console.log("This is the length :-")

    b = [...new Set(filteredArray)];
    console.log(b.length)
    
    res.send(b)
    
 

  });

  app.get("/Q2", async(req, res) => {
    var ethAdd  = "0xa1096194eedaa4157f0e689db04617b5ff81e64c";
    var address="0x9056d15c49b19df52ffad1e6c11627f035c0c960"

    var arr1 = [];
    var arr2 = [];
    const data1 = await axios.get(
    "https://api.etherscan.io/api?module=account&action=tokennfttx&address=" +
        address +
        "&startblock=0&endblock=99999999&sort=asc&apikey=" +
        apiKey,
    );

    //Here we get the balance of the user in Wei 
    const ether = await axios.get(
    "https://api-ropsten.etherscan.io/api?module=account&action=balance&address="+ethAdd+
    "&tag=latest&apikey="+apiKey,
    )
    // console.log(data1.data.result)
    var prices=[]
    //Here we get the balance of the user in Ether
    var eths= ether.data.result/1000000000000000000
    x=data1.data.result
      //Here I'm generating a new date and removing 120 days from it and then converting that value to unix timestamp
      
      var today = new Date();
      var priorDate = new Date(new Date().setDate(today.getDate() - 120));
      var prevUnixDate = Math.floor(new Date(priorDate).getTime() / 1000);
      // console.log(complete.length)
      countMinted=0
      //and then if the t0imestamp is greater than previous date(120days)
      for (i=0;i<x.length;i++){
        if (x[i].timeStamp>prevUnixDate){
          arr2.push(x[i])
          
          
        }
        // console.log(price)
         // if 0x0000000000000000000000000000000000000000 then minted
        if(x[i].from =='0x0000000000000000000000000000000000000000'){
          countMinted=countMinted+1
        }
       
      }

      var price=[]

    for(j=0;j<arr2.length;j++){

      //Getting the price for transaction using hash
        const ele = await axios.get(     
            "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash="+arr2[j].hash+
            "&apikey="+apiKey,
          )
          // price.push(ele.result.value/1000000000000000000)
          console.log( parseInt(ele.data.result.value, 16))
         
        price.push( parseInt(ele.data.result.value, 16))
        
    }
    console.log(price)

    //Tried using Moralis NFT API gets the NFT transfers. 
    //Returns an object with the number of NFT transfers and the array of NFT transfers

    // const options = { address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" , chain: "eth" };
    // const nftTransfers = await Moralis.Web3API.token.getContractNFTTransfers(options);
    // console.log(nftTransfers);
    res.render("Q2",{data:arr2,eths,countMinted,price})
    // res.send({data:x})
 

  });
  
//Tired using opensea api

// app.get("/Q3",async(req, res) => {
//   sdk['retrieving-a-single-contract']({asset_contract_address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'})
//   .then(res => console.log(res))
//   .catch(err => console.error(err));
// })


app.get("/Q5",async(req, res) => {
      var arr2=[]
      const data1 = await fetchDataContract("0x614917F589593189ac27aC8B81064CBe450C35e3")
      var arr1 = data1.data.result;
      let price=[]
      let Minted =[]
      let countMinted=0
    
      let countMintedNOt=[]
      let countMintedNOtPrice=[]
      let MintedPrice=[]
      let notMintTimestamp=[]
      // console.log(data1.data.result)
  
  //It was taking too mch time as it checks all the transactions So as of now I have limited the calls to only 100
    // for (var i = 0; i < arr1.length; i++) {
      for (var i = 0; i < 100; i++) {
      const ele = await axios.get(     
        "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash="+arr1[i].hash+
        "&apikey="+apiKey,
      )
      
        if(arr1[i].from =='0x0000000000000000000000000000000000000000'){
          countMinted=countMinted+1
          // console.log("-------Inside MIntedd",arr1[i].tokenID);
          Minted.push(arr1[i])
          MintedPrice.push(parseInt(ele.data.result.value, 16))
        }
        else{
          //Here we get all the transactions after  minting
          countMintedNOt.push(arr1[i])
          
          countMintedNOtPrice.push(parseInt(ele.data.result.value, 16))
          x=parseInt(ele.data.result.value, 16)
          console.log(x)
          // countMintedNOtPrice(parseInt(ele.data.result.value, 16))
          arr2.push(arr1[i].tokenID)
          notMintTimestamp.push()
        }
    
        console.log(Minted.length)
        console.log(countMintedNOt)
        console.log(countMintedNOtPrice)
      }
        res.render("Q5",{data:Minted,arr2,price,countMintedNOt,countMintedNOtPrice,MintedPrice})

  
  
    
    })
app.listen(3000, function () {
    console.log("Server has been started");
  });

  