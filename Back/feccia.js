const http = require('http')

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
        console.log(data)
        callback(data,res)
    }
    function handleError(error) {
        console.error(error);
    }
}

module.exports = {
    request: request
}