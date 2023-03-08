const mysql = require('mysql')
const { conn } = require('../config').db.mysql
const { 
    ERR_INVALID_PARAMS,
} = require('../defines/error')
module.exports = {
    /**
     * 
     * 상품 등록 모듈
     * 
     * @param {Object | queryString.ParsedUrlQuery} params    name, category, price, description 정보
     * @param {Function}                            cb        응답 콜백
     */
    register : function(params, cb) {
        let response = {
            errorcode : 0,
            errormessage : 'success'
        }

        const {
            name,
            category,
            price,
            description
        } = params 
        if(name === null || category === null || price === null || description == null) {
            response.errorcode = ERR_INVALID_PARAMS.code;
            response.errormessage = ERR_INVALID_PARAMS.message
            cb(response)
        }else { 
            let connection = mysql.createConnection(conn)
            connection.connect()

            connection.query("insert into goods(name, category, price, description) values(?, ?, ?, ?)"
                            , [name, category, price, description]
                            , (err, results, fields) => {
                                if(err) {
                                    response.errorcode = 1;
                                    response.errormessage = err
                                }
                                cb(response)                                
                            })
            connection.end() 
        }

    },

    
    /**
     * 
     * 상품 전체 조회 모듈
     * 
     * @param {Function} cb    응답 콜백
     */
    inquiry : function(cb) {
        let response = {
            errorcode : 0,
            errormessage : "success"
        };
        
        let connection = mysql.createConnection(conn)
        connection.connect()
        connection.query("select * from goods", (err, results, fields) => {
            if(err || results.length === 0) {
                response.errorcode = 1;
                response.errormessage = err ? err : "no data";
            }else {
                response.results = results;
            }
            cb(response)
            
        })
    },

    /**
     * 
     * 상품 삭제 모듈
     * 
     * @param {Object | queryString.ParsedUrlQuery} params    id 정보
     * @param {Function}                            cb        응답 콜백
     */
    unregister : function(method, pathname, params, cb) {
        let response = {
            errorcode : 0,
            errormessage : "success"
        };

        const { id } = params;
        
        if(id === null) { 
            response.errorcode = ERR_INVALID_PARAMS.code;
            response.errormessage = ERR_INVALID_PARAMS.message
            cb(response)
        }else {
            let connection = mysql.createConnection(conn)
            connection.create()
            connection.query("delete from goods where id = ?"
                            , [id]
                            , (err, results, fields) => {
                                if(err) {
                                    response.errorcode = 1;
                                    response.errormessage = err
                                }
                                cb(response)
                            })            

            connection.end()
        }
    }
}