const mysql = require('mysql')
const { conn } = require('../config').db.mysql
const { 
    ERR_INVALID_PARAMS,
    ERR_INVALID_PWD
} = require('../defines/error')

module.exports = {
    /**
     * 
     * 회원 생성 모듈
     * 
     * @param {Object | queryString.ParsedUrlQuery} params  key, username, passowrd 정보 
     * @param {Function}                            cb      응답 콜백
     */
    register : function(params, cb) {
        let response = {
            key : params.key,
            errorcode : 0,
            errormessage : "success" 
        }

        const { 
            username,
            password
        } = params;

        if(username === null || password === null) {
            response.errorcode = ERR_INVALID_PARAMS.code;
            response.errormessage = ERR_INVALID_PARAMS.message;

            cb(response)
        }else{
            let connection = mysql.createConnection(conn)
            connection.connect()
            connection.query("insert into members(username, password) values(?, ?)"
                            , [username, password]
                            , (err, results, fields) => {
                                if(err){
                                    response.errorcode = 1;
                                    response.errormessage = err
                                }
                                cb(response)
                            })
            connection.end();
        }

    },

    
    /**
     * 
     * 로그인 모듈
     * 
     * @param {Object | queryString.ParsedUrlQuery} params   key, username, passowrd 정보
     * @param {Object}                              cb       응답 콜백        
     */
    inquiry : function(params, cb) {
        let response = {
            key : params.key,
            errorcode : 0,
            errormessage : "success"
        };
        
        const {
            username, 
            password
        } = params;

        if(username === null || password === null) {
            response.errorcode = ERR_INVALID_PARAMS.code;
            response.errormessage = ERR_INVALID_PARAMS.message
            cb(response)
        }else{
            const connection = mysql.createConnection(conn)
            connection.connect()
            connection.query("select id from members where username = ? and password = ?"
                            , [username, password]
                            , (err, results, fields) => {
                                if(err || results.length === 0){
                                    response.errorcode = ERR_INVALID_PWD.code;
                                    response.errormessage = err ? err : ERR_INVALID_PWD.message
                                }else{
                                    response.userid = results[0].id;
                                }
                                cb(response)
                            })
            connection.end()
        }
    },

    /**
     * 
     * 회원 삭제 모듈
     * 
     * @param {Object | queryString.ParsedUrlQuery} params  key, username 정보
     * @param {*}                                   cb      응답 객체
     */
    unregister : function(params, cb) {
        let response = {
            key : params.key,
            errorcode : 0,
            errormessage : "success"
        };
        
        const {
            username, 
        } = params;

        if(username === null || password === null) {
            response.errorcode = ERR_INVALID_PARAMS.code;
            response.errormessage = ERR_INVALID_PARAMS.message
            cb(response)
        }else{
            const connection = mysql.createConnection(conn)
            connection.connect()
            connection.query("delete from members where username = ?"
                            , [username]
                            , (err, results, fields) => {
                                if(err){
                                    response.errorcode = 1
                                    response.errormessage = err
                                }
                                cb(response)
                            })
            connection.end()
        }
    }
}