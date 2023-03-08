const mysql = require('mysql')
const { conn } = require('../config').db.mysql
const { 
    ERR_INVALID_PARAMS,
} = require('../defines/error')

module.exports = {
    /**
     * 
     * 구매 모듈
     * 
     * @param {Object | queryString.ParsedUrlQuery} params  key, userid, goodsid 정보
     * @param {*}                                   cb      응답 객체
     */
    register : function(params, cb) {
        let response = {
            key : params.key,
            errorcode : 0,
            errormessage : "success"
        }

        const {
            userid,
            goodsid
        } = params;

        if(userid === null || goodsid === null){
            response.errorcode = ERR_INVALID_PARAMS.code
            response.errormessage = ERR_INVALID_PARAMS.message
            cb(response)
        }else{
            let connection = mysql.createConnection(conn)
            connection.connect()
            connection.query("insert into purchases(userid, goodsid) values(?, ?)"
                            , [userid, goodsid]
                            , (err, results, fields) => {
                                if(err){
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
     * 구매 목록 조회 모듈
     * 
     * @param {Object | queryString.ParsedUrlQuery} params  key, userid 정보 
     * @param {*}                                   cb      응답 객체
     */
    inquiry : function(params, cb) {
        let response = {
            key : params.key,
            errorcode : 0,
            errormessage : "success"
        }

        const {
            userid,
        } = params;

        if(userid === null){
            response.errorcode = ERR_INVALID_PARAMS.code
            response.errormessage = ERR_INVALID_PARAMS.message
            cb(response)
        }else{
            let connection = mysql.createConnection(conn)
            connection.connect()
            connection.query("select id, goodsid, date from purchases where userid=?"
                            , [userid]
                            , (err, results, fields) => {
                                if(err) {
                                    response.errorcode = 1;
                                    response.errormessage = err
                                }else{
                                    response.results = results
                                }
                                cb(response)
                            })
            connection.end()
        }
    }
}