const moongose = require('mongoose');

const connectDb = async () =>{
    try {
        const connection= await moongose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })

        const url =  `${connection.connection.host}:${connection.connection.port}`;
        console.log('Mongo DB connect on: ' + url);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDb