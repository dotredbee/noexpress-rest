const env = process.env;

module.exports = {
    db : { 
        mysql : {
            conn : {
                host : env.DB_HOST,
                port : env.DB_PORT,
                user : env.DB_USER,
                password : env.DB_PWD,
                database : env.DB_NAME
            }
        }
    }
}