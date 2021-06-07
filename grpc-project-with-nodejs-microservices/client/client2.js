const PROTO_PATH = ".//protoFiles/orders.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const OrderService = grpc.loadPackageDefinition(packageDefinition).OrderService;
const client2 = new OrderService(
    "localhost:30044",
    grpc.credentials.createInsecure()
);

module.exports = client2;