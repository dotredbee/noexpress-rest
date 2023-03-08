const members = require('./members')
const goods = require('./goods')
const purchases = require('./purchases')

const response = require('../response').response

/**
 * 
 * pathname을 구분지어 각각 맞는 모듈에 요청후 응답한다.
 * 
 * @param {http.serverResponse} res 
 * @param {String} method 
 * @param {String} pathname 
 * @param {String | queryString.ParsedUrlQuery} params 
 * @returns 
 */
exports.onRequest = function onRequest(res, method, pathname, params) { 
    switch(pathname) {
        case "/members" : 
            members.onRequest(res, method, pathname, params, response)
            break;
        case "/goods" :
            goods.onRequest(res, method, pathname, params, response)
            break;
        case "/purchases" :
            purchases.onRequest(res, method, pathname, params, response)
            break;
        default :
            res.writeHead(404);
            return res.end();
    }    
}
