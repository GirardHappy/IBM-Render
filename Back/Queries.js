//id
const  info = `
    query ($id: Int) {
        Media(id: $id, type: ANIME) {
            title{
                english
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

//titolo e poi io id
const recommendations = `
    query ($id: Int) {
        Media(id: $id, type: ANIME) {
            recommendations(perPage: 3){
                nodes{
                    mediaRecommendation{
                        title{
                            english
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
                }
            }
        }
    }
`

//stagione e anno
const latest =  `
    query ($season: MediaSeason, $year: Int)
    {
        Page(page: 1, perPage: 5) {
            pageInfo {
                hasNextPage
                total
            }
            media(season: $season, seasonYear: $year, type: ANIME, format: TV sort: POPULARITY_DESC) {
                title {
                    english
                }

                airingSchedule(notYetAired: true, perPage: 2)
                {
                    nodes {
                        episode
                        airingAt
                    }
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
    latest: latest
}