var PROTO_PATH = __dirname + '/grpc.proto';
var _ = require('lodash');
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
const {account_mt5 } = require('./account-mt5')
const {account_mt4} = require('./account-mt4')
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var grpcChat = protoDescriptor.tiktik.nj4x.main.grpc;
var metadata = new grpc.Metadata();
const account = [...account_mt4,...account_mt5]
var i =0
// metadata.add('body', "khoa node");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let ac = {
    "isListenPrice":1,
    id: "1"
}

var client = new grpcChat.NJ4XService('203.205.21.180:8080',
    grpc.credentials.createInsecure());

    const connect = async (data)=>{
        if(i!=0)
        {
            client.SubscribeSymbols({
              ...account[i-1],
                isListenPrice: 1,
                symbols: ["*"]
            }, (e, da) => {
                console.log(e)
                console.log(da)
            })
        }
       await client.ConnectTerminal({
            ...ac,
            ...data
        },async (err, data) => {
            console.log(data)
            console.log(err)
            i =i+1
            if(i<account.length)
            {
                await setTimeout(async ()=> {await connect(account[i])},30000)
            }
            
        });
    }
connect(account[i])


// call.on('data', function(ChatMessage) {
//     console.log(ChatMessage);
// });
// call.on('end', function() {
//     console.log('Server ended call');
// });
// call.on('error', function(e) {
//     console.log(e);
// });

// rl.on("line", function(line) {
//     if (line === "quit") {
//         call.end();
//         rl.close();
//     } else {
//         call.write({
//             body: line
//         });
//     }
// });

console.log('Enter your messages below:');