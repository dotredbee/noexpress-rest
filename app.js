const http = require('http')
const url = require('url')
const queryString = require('querystring')
const router = require('./routes')


const dotenv = require('dotenv')
dotenv.config();

const mysql = require('mysql')
const conn = {
    host : 'localhost',
    user : 'pventi',
    password : 'pventi',
    database : 'monolithic'
}

const connection = mysql.createConnection(conn)
connection.connect()
connection.query("query", (err, results, fiedls) => {
    
})
connection.end()

const server = http.createServer((req, res) => {
    const method = req.method;
    const uri = url.parse(req.url, true)
    const pathname = url.pathname;

    if(method === "POST" || method === "PUT"){
        let body = "";
        req.on("data", function(data){
            body += data;
        })

        req.on("end", function() {
            let params;
            if(req.headers["content-type"] === "application/json"){
                console.log(body)
                params = JSON.parse(body)
            }else{
                params = queryString.parse(body)
            }
            router.onRequest(res, method, pathname, params)
        })
    }else{ 
        router.onRequest(res, method, pathname, uri.query)
    }
})

server.listen(8000, () => console.log(`Server start...${8000}`))