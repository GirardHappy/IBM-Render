const fetch = require('cross-fetch')

function request(query,variables,callback,res){
    //costruzione richiesta
    var url = 'https://graphql.anilist.co'
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

    //fetch
    fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

    //handle del fetch
    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }
    function handleData(data) {
        res.writeHead(200,{"Content-Type": "application/json"})
        callback(data,res)
    }
    function handleError(error) {
        res.writeHead(400)
        res.write('Bad fetch')
        res.end()
    }
}

module.exports = {
    request: request
}