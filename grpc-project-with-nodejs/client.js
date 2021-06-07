const PROTO_PATH = __dirname + '/proto/employee.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

function main() {
  let client = new employee_proto.Employee('localhost:4500',
                                       grpc.credentials.createInsecure());
  let employeeId;
  if (process.argv.length >= 3) {
    employeeId = process.argv[2];
  } else {
    employeeId = 1;
  }
  client.getDetails({id: employeeId}, function(err, response) {
    console.log('Server 1 Employee Details for Employee Id:',employeeId,'\n' ,response.message);
  });
}

function main2() {
  let client = new employee_proto.Employee('localhost:4600',
                                       grpc.credentials.createInsecure());
  let employeeId;
  if (process.argv.length >= 3) {
    employeeId = process.argv[2];
  } else {
    employeeId = 1;
  }
  client.getDetails({id: employeeId}, function(err, response) {
    console.log('Server 2 Employee Details for Employee Id:',employeeId,'\n' ,response.message);
  });
}

function main3() {
  let client = new employee_proto.Employee('localhost:4700',
                                       grpc.credentials.createInsecure());
  let employeeId;
  if (process.argv.length >= 3) {
    employeeId = process.argv[2];
  } else {
    employeeId = 1;
  }
  client.getDetails({id: employeeId}, function(err, response) {
    console.log('Server 3 Employee Details for Employee Id:',employeeId,'\n' ,response.message);
  });
}

main();
main2();
main3();