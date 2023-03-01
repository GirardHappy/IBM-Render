import fetch from 'node-fetch'

const trending = `
    query{
        trending:Page(page:1,perPage:6){
            media(sort:TRENDING_DESC,type:ANIME){
                title{
                    english
                }
            }
        }
    }
`

const variables = {}

var url = 'https://graphql.anilist.co'
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: trending,
            variables: variables
        })
    };

var a = fetch.fetch(url,options)
