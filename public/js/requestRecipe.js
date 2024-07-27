const request = require('sync-request');


//sync-request Package
module.exports.getCategory = (apiUrl) => {
    const response = request('GET', apiUrl);
    data = JSON.parse(response.getBody()).result
    return data;
}

module.exports.getRanking = (id) => {
    const apiUrl = 'https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1056685797032393180';
    const response = request('GET', apiUrl);
    data = JSON.parse(response.getBody()).result

}

// //const response = '';
// request(options, async (error, response, body) => res = body );
// console.log(response)