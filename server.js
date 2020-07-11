const express = require('express');
const app = express();
const fs = require('fs');
const port = 4001;


function getBlogPosts() {
    let text = fs.readFileSync('database.json');
    return JSON.parse(text);
}
function savePost(posts) {
    let text = JSON.stringify(posts);
    fs.writeFileSync('database.json', text);
}
function updatePorperties(src, dest) {
dest.date = src.date;
dest.Author = src.Author;
dest.Title = src.Title;
dest.content = src.Title
}



app.use(express.json());

app.get('/posts', (req,res) => {
let blogpost = getBlogPosts();
return res.json(blogpost);

})

app.get('/post/:id', (req,res) => {
    let postId = parseInt(req.params.id);
    let data = getBlogPosts().filter(post => post.id === postId);
    res.json(data[0]); 
})
app.get('/post/Author/:Author', (req,res) => {
    let postAuthor = req.params.Author;
    let data = getBlogPosts().filter(post => post.Author === postAuthor);
    res.json(data[0]); 
})
app.post('/post', (req, res) => {
    let newPost = req.body;
    let posts = getBlogPosts();
    newPost.id = posts.length + 1;
    posts.push(newPost);
    savePost(posts);
    return res.json(newPost)
})
app.put('/post/:id', (req,res) => {
    let newPost = req.body;
    let postId = parseInt(req.params.id);
    let posts = getBlogPosts();
    let postToUpdate = posts.filter(post => post.id === postId)[0];
    updatePorperties(newPost, postToUpdate);
    savePost(posts);
    res.json(postToUpdate)
})

app.delete('/post/:id', (req,res) => {
    let postId = parseInt(req.params.id);
    let posts = getBlogPosts();
    let idArray = posts.map(function(item) { return item.id; })
    let removeIndex = idArray.indexOf(postId)
    posts.splice(removeIndex, 1);
    saveCities(posts)
    return response.json(posts);
})

app.listen(port, console.log(`server is listening to port: ${port}`))

// const express = require('express');
// const fs = require('fs');
// const app = express();
// const port = 3001;

// function copyPropertiesFrom(src, dest) {
//     dest.cityName = src.cityName;
//     dest.country = src.country;
//     dest.latitude = src.latitude;
//     dest.longitude = src.longitude;
//     dest.weather = src.weather;
// }
// function getCities() {
//     let text = fs.readFileSync('database.json');
//     return JSON.parse(text);
// }
// function saveCities(cities) {
//     let text = JSON.stringify(cities);
//     fs.writeFileSync('database.json', text);
// }
// // Parse URL-encoded bodies (as sent by HTML forms)
// //app.use(express.urlencoded());
// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());
// // GET THE CITY BY ID (ON THE URL)
// app.get('/city/:cityId', (request, response) => {
//     let cityId = parseInt(request.params.cityId);
//     let data = getCities()
//         .filter(city => city.id === cityId);
//     response.json(data[0]);
// });
// // POST THE CITY
// app.post('/city', (request, response) => {
//     let newCity = request.body;
//     let cities = require('./database.json');
//     newCity.id = cities.length + 1;
//     cities.push(newCity);
//     saveCities(cities);
//     return response.json(newCity);
// });
// // PUT THE CITY
// app.put('/city/:id', (request, response) => {
//         let newCity = request.body;
//         let cityId = parseInt(request.params.id);
//         let cities = require('./database.json');
//         let cityToUpdate = cities.filter(city => city.id === cityId)[0];
//         copyPropertiesFrom(newCity, cityToUpdate);
//         saveCities(cities);
    
//         return response.json(cityToUpdate);
// });
// // DELETE THE CITY
// app.delete('/city/:id', (request, response) => {
//     let cityId = parseInt(request.params.id);
//     let cities = require('./database.json');
//     //let indexCityToDelete = cities.findIndex(city => city.Id === cityId)
//     let idArray = cities.map(function(item) { return item.id; })
//     let removeIndex = idArray.indexOf(cityId)
//     cities.splice(removeIndex, 1);
//     saveCities(cities)
//     return response.json(cities);
// });
// app.listen(port, () => console.log(`Weather app listening at http://localhost:${port}`))


