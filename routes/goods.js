
const { register, inquiry, unregister } = require('../modules/goods.module')

/**
 * 
 * 상품 관리
 * 
 * method를 통해 각각의 맞는 모듈 호출 후 콜백을 통한 응답
 * 
 * POST : 상품 등록
 * GET : 상품 조회
 * DELETE : 상품 삭제
 * 
 * @param {http.serverResponse} res 
 * @param {String} method 
 * @param {String} pathname 
 * @param {String | queryString.ParsedUrlQuery} params 
 * @param {Function} cb callback 응답처리
 */
exports.onRequest = (res, method, pathname, params, cb) => {
    switch(method) {
        case "POST" :
            return register(params, (response) => process.nextTick(cb, res, response)) 
        
        case "GET" :
            return inquiry((response) => process.nextTick(cb, res, response))
        
        case "DELETE" : 
            return unregister(params, (response) => process.nextTick(cb, res, response))
        default : 
            return process.nextTick(cb, res, null)
    }
}