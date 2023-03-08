const options = { 
    host : "127.0.0.1",
    port : "8000",
    headers : {
        "Content-Type" : "application/json"
    }
}

const http = require('http')

function request(cb, params) {
    let req = http.request(options, (res) => {
        let data = "";
        res.on('data', (chunk) => {
            data += chunk;
        })

        res.on('end', () => {
            console.log("-----------------data------------------") 
            console.log(options);
            console.log(data)
            cb()
        })
    })
    console.log(params)
    if(params) {
        req.write(JSON.stringify(params))
    }
    req.end()
}

function goods(cb){
    goods_post(() => {
        goods_get(() => {
            goods_delete(cb)
        })
    })

    function goods_post(cb){
        options.method = "POST";
        options.path = "/goods"
        request(cb, {
            name : "test Goods",
            category : "tests",
            price : 1000,
            description : "test"
        });
    }

    function goods_get(cb){
        options.method = "GET";
        options.path = "/goods";
        request(cb)
    }

    function goods_delete(cb) {
        options.method = "DELETE";
        options.path = "/goods?id=1";
        request(cb)
    }
}


function members(cb) {
    members_delete(() => {
       members_post(() => { 
            members_get(cb);
       }) 
    })

    function members_post(cb) {
        options.method = "POST";
        options.path = "/members"
        request(cb, { 
            username : "test",
            password : "1234",
            passwordConfirm : "1234",
        })
    }

    function members_get(cb) {
        options.method = "GET";
        options.path = "/members?username=test&password=1234";
        request(cb)
    }

    function members_delete(cb){ 
        options.method = "DELETE";
        options.path = "/members?username=test";
        request(cb)
    }
}

function purchases(cb){
    purchases_post(() => {
        purchases_get(() => cb())
    })

    function purchases_post(cb){
        options.method = "POST";
        options.path = "/purchases"
        request(cb, {
            userid : 1,
            goodsid : 1
        })
    }

    function purchases_get(cb){
        options.method = "GET"
        options.path = "/purchases?userid=1";
        request(cb)
    }
}

console.log("========================= members ===========================")
members(() => {
    console.log("========================= goods ===========================")
    goods(() => { 
        console.log("========================= purchases ===========================")
        purchases(() => {
            console.log("done")
        })
    })
})