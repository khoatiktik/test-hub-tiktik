var PROTO_PATH = __dirname + '/grpc.proto';

// var _ = require('lodash');
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
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
// metadata.add('body', "khoa node");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var client = new grpcChat.NJ4XService('203.205.21.180:8080',
    grpc.credentials.createInsecure());

var call = client.ManageTerminal({});
var price = client.GetPriceRealtime({
    accountNumber: "82871",
    password: "dOxtl7bf",
    server: "mt5-demo01.pepperstone.com",
    version: 5,
    isListenPrice: 1,
    id: "1"
})
price.on('data', function(ChatMessage) {
    console.log(ChatMessage);
});
price.on('end', function() {
    console.log('Server ended price');
});
price.on('error', function(e) {
    console.log(e);
    price = client.GetPriceRealtime({
        accountNumber: "82871",
        password: "dOxtl7bf",
        server: "mt5-demo01.pepperstone.com",
        version: 5,
        isListenPrice: 1,
        id: "1"
    })
});

call.on('data', function(ChatMessage) {
    console.log(ChatMessage);
    // if (ChatMessage.action === "UPDATE") {
    //     if (ChatMessage.status === "CONNECTED") {
            // client.SubscribeSymbols({
            //     accountNumber: "82871",
            //     server: "mt5-demo01.pepperstone.com",
            //     version: 5,
            //     isListenPrice: 1,
            //     symbols: ["*"]
            // }, (e, da) => {
            //     console.log(e)
            //     console.log(da)
            // })
    //         // client.GetOrder({
    //         //     type: "history",
    //         //     accountNumber: "82871",
    //         //     server: "mt5-demo01.pepperstone.com",
    //         //     version: 5,
    //         // }, (e, dataa) => {
    //         //     console.log(dataa)
    //         // })
    //     }
    // }
});
call.on('end', function() {
    console.log('Server ended call');
});
call.on('error', function(e) {
    console.log(e);
});

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