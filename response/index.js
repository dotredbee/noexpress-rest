
/**
 * 받은 패킷을 응답객체에 포함시켜 클라이언트에 보내는 함수
 * 
 * @param {http.serverResponse} res
 * @param {json} packet json 형식으로 받은 패킷 
 */
exports.response = function (res, packet) { 
    res.writeHead(200, { 'Content-Type' : 'application/json' })
    res.end(JSON.stringify(packet))
}