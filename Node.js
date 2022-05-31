'use strict';
const express = require("express");
const app = express();
const all_ads = require('./Ad_json.json');
const fs = require('fs');
const ads_array = require("./ads.json");
app.use(express.static(__dirname));

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1> Browsing the ${subreddit} </h1>`)
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1> Viewing the ${postId} </h1>`)
})

app.get('/', (req, res) => {
    res.send('This is home!')
})

app.get('/screen=1', (req, res) => {
    if(ads_by_screen(1))
        res.sendFile(__dirname + '/main.html');
    else
        res.send('No ads for you today my brother');
})

app.get('/screen=2', (req, res) => {
    if(ads_by_screen(2))
        res.sendFile(__dirname + '/main.html');
    else
        res.send('No ads for you today my brother');
})

app.get('/screen=3', (req, res) => {
    if(ads_by_screen(3))
        res.sendFile(__dirname + '/main.html');
    else
        res.send('No ads for you today my brother');
})

app.get('*', (req, res) => {
    res.send('PAGE DOES NOT EXIST!')
})

app.post('/loadData',(req,res)=>{
    res.json(ads_array);
});

app.post('/noAds', (req, res) => {
    res.send('No ads for you today my brother')
})

app.listen(8080, () => {
    console.log("LISTENING ON PORT 8080!")
})

// functions!

function ads_by_screen(screen_number){
    let ads_new = [];
    ads_new.push(all_ads["Ad1"],all_ads["Ad2"],all_ads["Ad3"]) // in case nothing match and we need to test
    for(let i = 0; i < all_ads.amount.number; i++){
        let ad_name = "Ad" + (i+1);
        for(let screen of all_ads[ad_name].screens){
            if(screen == screen_number)
                ads_new.push(all_ads[ad_name])
        }
    }
    if(ads_new.length == 0)
        return false;
    fs.writeFileSync('ads.json',JSON.stringify(ads_new));
    return true;
}