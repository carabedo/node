const {Pool} = require('pg')

const pool = new Pool({
    connectionString : "postgres://lejozdwuriuoua:83aee97b4c6ce56e4c765d8cace7b1e2328a9b5b21eb14f32efd41f60adac2b7@ec2-44-195-100-240.compute-1.amazonaws.com:5432/dba96mapd29b5m",
    ssl : {
        rejectUnauthorized: false
    }

})

module.exports = {
    pool
}