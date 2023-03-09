//id
const  info = `
    query ($id: Int) {
        Media(id: $id, type: ANIME) {
            title{
                english
                romaji
            }
            coverImage{
                large
            }
            description
            format
            status
            episodes
            duration
            genres
            averageScore
        }
  }
`;

const trailer = `
query ($id: Int) {
    Media(id: $id, type: ANIME) {
        trailer{
            id
            site
        }
    }
}
`;

//titolo e poi io id
const recommendations = `
    query ($id: Int) {
        Media(id: $id, type: ANIME) {
            recommendations(perPage: 6){
                nodes{
                    mediaRecommendation{
                        title{
                            english
                            romaji
                        }
                    }
                }
                
            }
        }
    }
`;

//nulla
const trending = `
    query{
        trending:Page(page:1,perPage:6){
            media(sort:TRENDING_DESC,type:ANIME){
                title{
                    english
                    romaji
                }
            }
        }
    }
`

//genere
const genreTrending = `
    query($genre: String){
        trending:Page(page:1,perPage:6){
            media(sort:POPULARITY_DESC,type:ANIME, genre: $genre){
                title{
                    english
                    romaji
                }
            }
        }
    }
`

//stagione e anno
const latest =  `
    query ($season: MediaSeason, $year: Int)
    {
        Page(page: 1, perPage: 6) {
            media(season: $season, seasonYear: $year, type: ANIME, format: TV sort: POPULARITY_DESC) {
                title {
                    english
                    romaji
                }
                
                airingSchedule(perPage: 1, notYetAired: true){
                    nodes{
                        airingAt
                    }
                    
                }
                startDate{
                    month
                    year
                }
            }
        }
    }
`

module.exports = {
    info: info,
    recommendations: recommendations,
    trending: trending,
    genreTrending: genreTrending,
    latest: latest,
    trailer: trailer
}