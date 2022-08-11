import pkg from 'aws-sdk';


const dynamoDbClient = new pkg.DynamoDB.DocumentClient({region: 'ap-south-1'});

console.log(dynamoDbClient);


async function createEmployee(params) {
    console.log('inside the createEmployee method');
    console.log(params);
    return await dynamoDbClient.put(params).promise();
}


export const handler = (event) => {

    const fname = event.queryStringParameters && event.queryStringParameters.fname;

    const lname = event.queryStringParameters && event.queryStringParameters.lname;

    const age = event.queryStringParameters && event.queryStringParameters.age;


    console.log(`Employee ${fname} ${lname} has age: ${age}`);

    const params = {
        TableName: 'employee',
        Item: {
            fname, lname, age
        }
    };

    console.log('successfully created the params object to be send to the dynamodb insert method');

    try {

        const data = createEmployee(params);
        
        console.log('data coming from the createEmployee method ');
        console.log(data);

        return {
            statusCode: 200,
            message: JSON.stringify(data)
        };

    } catch(err) {
        return {error: err};
    }


};


