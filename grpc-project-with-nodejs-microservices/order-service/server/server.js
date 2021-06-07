//tutorial link
//https://blog.logrocket.com/creating-a-crud-api-with-node-express-and-grpc/


const PROTO_PATH = "./orders.proto";

var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

var ordersProto = grpc.loadPackageDefinition(packageDefinition);

const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();
const orders = [
    {
        id: "a68b823c-7ca6-44bc-b721-fb4d5312cafz",
        title: "IPhone X",
        price: 500,
        userID: "a68b823c-7ca6-44bc-b721-fb4d5312cafc"
    },
    {
        id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92bz",
        title: "IPhone XMAX",
        price: 1000,
        userID: "a68b823c-7ca6-44bc-b721-fb4d5312cafc"
    },
    {
        id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92ba",
        title: "Samsung Note 8",
        price: 600,
        userID: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7"
    }
];

server.addService(ordersProto.OrderService.service, {
    getAll: (_, callback) => {
        callback(null, { orders });
    },
});

server.bind("127.0.0.1:30044", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30044");
server.start();