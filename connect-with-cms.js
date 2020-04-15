const axios = require("axios")
// const {account} = require('./account-test')
const {account_mt5 } = require('./account-mt5')
const {account_mt4} = require('./account-mt4')
const define_server = {
    // "_id" : "5e7cbdd9e761af0cd885710d", 
    // "status" : "CONNECTED", 
    // "createdAt" : "2020-03-26T14:36:09.490+0000", 
    // "updatedAt" : "2020-03-26T14:36:09.490+0000", 
    "isListenPrice" : 0, 
    "mtServer" : "94.237.64.63:8080"
}

var broker_has_connected = []
const check_duplicate_broker = false
const account = [...account_mt4,...account_mt5]
var i = 0

const connect = async (data)=> {
    console.log("---------------------",i)
    // if(check_duplicate_broker)
    // {
    //     if(broker_has_connected.indexOf(data.server)!==-1)
    //     {
    //         i=i+1
    //         if(i<account.length)
    //         {
    //             return await connect(account[i])
    //         } 
    //         return;
    //     }
    //     else
    //     {
    //         broker_has_connected.push(data.server)
    //     }
    // }
   return await  axios.post('http://api-cms-dev.tiktiktrading.com:3502/api/v1/mt-account/connect',
   {
       ...data,
       ...define_server
   })
      .then(async (response) =>{
        console.log("response");
        i=i+1;
        if(i<account.length)
        {
           return await setTimeout(async ()=> {await connect(account[i])},6000*i)
        }
        
      })
      .catch(async (error)=> {
          console.log("error")
          i=i+1
          if(i<account.length)
          {
            return  await connect(account[i])
          }
      });
}
connect(account[i])

// "isListenPrice" : 0, 
// "mtServer" : "94.237.64.63:8080"