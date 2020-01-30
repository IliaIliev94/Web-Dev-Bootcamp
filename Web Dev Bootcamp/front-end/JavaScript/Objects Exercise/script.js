let movies = [
    {
        title: "Annihalation",
        rating: 6.9,
        hasWatched: true
    },
    {
        title: "Bird Box",
        rating: 6.6,
        hasWatched: false
    },
    {
        title: "Terminator: Dark Fate",
        rating: 6.5,
        hasWatched: true
    }
]

for(let i = 0; i < movies.length; i++) {
    if(movies[i].hasWatched) {
        console.log("You have watched " + "\"" + movies[i].title + "\"" + " - " + movies[i].rating + " stars");
    }
    else {
        console.log("You have not seen " + "\"" + movies[i].title + "\"" + " - " + movies[i].rating + " stars");
    }
}