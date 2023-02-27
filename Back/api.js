const http = require('http')
const fs = require('fs');
const feccia = require('./feccia.js')
const Queries = require('./Queries.js')
const ids = JSON.parse(fs.readFileSync('./Back/ids.json'))


function seasonAndYear(){
    let d = new Date()
    return {season: ["WINTER","SPRING","SUMMER","FALL"][Math.floor(((d.getMonth()+1)%12)/3)], year: d.getFullYear()}
}

function titleToId(title){
    return parseInt(ids[title])
}

function goodEnding(data,res){
    console.log(JSON.stringify(data))
    res.write(JSON.stringify(data))
    res.end()
}

function infoHandle(obj, res){
    let data = {
        title: obj.data.Media.title.english,
        description: obj.data.Media.description,
        format: obj.data.Media.format,
        status: obj.data.Media.status,
        episodes: obj.data.Media.episodes,
        duration: obj.data.Media.duration,
        genres: obj.data.Media.genres,
        averageScore: obj.data.Media.averageScore,

    }
    goodEnding(data,res)
}

function recommendationsHandle(obj, res){
    let data = {
        title1: obj.data.Media.recommendations.nodes[0].mediaRecommendation.title.english,
        title2: obj.data.Media.recommendations.nodes[1].mediaRecommendation.title.english,
        title3: obj.data.Media.recommendations.nodes[2].mediaRecommendation.title.english
    }
    goodEnding(data,res)
}

function trendingHandle(obj, res){



    
    goodEnding(data,res)
}

function genreTrendingHandele(obj, res){



    
    goodEnding(data,res)
}

function latestHandle(obj, res){




    goodEnding(data,res)
}

function api(res,obj){
    res.writeHead(200,{"Content-Type": "application/json"})
    switch(obj.query){
        case "info": feccia.request(Queries.info,{id: titleToId(obj.title)},infoHandle,res); break;
        case "recommendations": feccia.request(Queries.recommendations,{id: titleToId(obj.title)},recommendationsHandle,res); break;
        case "trending": feccia.request(Queries.trending,{},trendingHandle,res); break;
        case "genreTrending": feccia.request(Queries.genreTrending,{genre: obj.genre},trendingHandle,res); break;
        case "latest": feccia.request(Queries.latest,seasonAndYear(),latestHandle,res); break;
    }
}



module.exports = {
    api: api,
  }