const fs = require('fs');
const feccia = require('./feccia.js')
const Queries = require('./Queries.js')
const ids = JSON.parse(fs.readFileSync('./Back/ids.json'))

const mesi = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"]

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
    let media = obj.data.Media
    let data = {
        title: media.title.english!=null?media.title.english:media.title.romaji,
        description: media.description,
        format: media.format,
        status: media.status,
        episodes: media.episodes,
        duration: media.duration,
        genres: media.genres,
        averageScore: media.averageScore,

    }
    goodEnding(data,res)
}

function recommendationsHandle(obj, res){
    let n = []
    for(let i =0;i<obj.data.Media.recommendations.nodes.length;i++){
        let title = obj.data.Media.recommendations.nodes[i].mediaRecommendation.title
        n.push(title.english!=null?title.english:title.romaji)
    }
    let data = {
        title1: n[0],
        title2: n[1],
        title3: n[2],
        title4: n[3],
        title5: n[4],
        title6: n[5],
    }
    goodEnding(data,res)
}

function trendingHandle(obj, res){
    let n = []
    for(let i =0;i<obj.data.trending.media.length;i++){
        let title = obj.data.trending.media[i].title
        n.push(title.english!=null?title.english:title.romaji)
    }
    let data = {
        title1: n[0],
        title2: n[1],
        title3: n[2],
        title4: n[3],
        title5: n[4],
        title6: n[5],
    }
    goodEnding(data,res)
}

function latestHandle(obj, res){
    let a = []
    let n = []
    for(let i = 0;i<obj.data.Page.media.length;i++){
        let media = obj.data.Page.media[i]
        if(media.airingSchedule.nodes.length!=0){
            let d = new Date(media.airingSchedule.nodes[0].airingAt*1000)
            a.push(d.getDate()+" "+mesi[d.getMonth()]+" "+d.getFullYear())
        }
        else{
            a.push(mesi[media.startDate.month-1]+" "+media.startDate.year)
        }
        n.push(media.title.english!=null?media.title.english:media.title.romaji)
    }

    let data = {
        title1: n[0],
        title2: n[1],
        title3: n[2],
        title4: n[3],
        title5: n[4],
        title6: n[5],
        release1: a[0],
        release2: a[1],
        release3: a[2],
        release4: a[3],
        release5: a[4],
        release6: a[5],
    }
    goodEnding(data,res)
}



function api(res,obj){
    try{
        let og = {
            "info": [Queries.info,{id: titleToId(obj.title)},infoHandle],
            "recommendations": [Queries.recommendations,{id: titleToId(obj.title)},recommendationsHandle],
            "trending": [Queries.trending,{},trendingHandle],
            "genreTrending": [Queries.genreTrending,{genre: obj.genre},trendingHandle],
            "latest": [Queries.latest,seasonAndYear(),latestHandle]
        
        }[obj.query]
        feccia.request(og[0],og[1],og[2],res)
    }
    catch{
        res.writeHead(400)
        res.write('Bad query')
        res.end()
    }
}

module.exports = {
    api: api,
  }