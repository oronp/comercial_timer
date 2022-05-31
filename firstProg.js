class Ad{
    constructor(name,templateUrl,texts,imagesUrl,days,fromDate,toDate,timeDuration,screens,) {
        this.name = name;
        this.templateUrl = templateUrl;
        this.texts = texts;
        this.imageUrl = imagesUrl;
        this.days = days;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.timeDuration = timeDuration;
        this.screens = screens;
    }
}

class Day{
    constructor(name,number,fromHour,toHour) {
        this.name = name;
        this.number = number;
        this.fromHour = fromHour;
        this.toHour = toHour;
    }
}

var ads_new; //will represent the right ads to publish each time.

async function httpGet(){
    let ads = '';
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/loadData',
        dataType: 'text',
        async: false,
        success: function(data){
            ads = JSON.parse(data);
            ads_new = ads;
        }
    });
}

function time(){
    let date_now = new Date();
    let day_in_week = date_now.getDay();
    let day_in_month = date_now.getDate();
    let month = date_now.getMonth();
    let year = date_now.getFullYear();
    let hour = date_now.getHours();
    return [hour,day_in_week,day_in_month,month,year];
}

function adSelector(){
    let ads_array = [];
    let my_time = time(); // [hour,day_in_week,day_in_month,month,year]
    let length = ads_new.length;
    ads_array.push(ads_new[0],ads_new[1],ads_new[2]); // in case nothing match and we need to test
    for(let i = 0; i < length; i++){
        if(my_time[4] == ads_new[i].fromDate[0]){ // checking year
            if(my_time[3] >= ads_new[i].fromDate[1] && my_time[3] <= ads_new[i].toDate[1]){ // checking month
                if(my_time[2] >= ads_new[i].fromDate[2] && my_time[2] <= ads_new[i].toDate[2]){ // checking day in month
                    if(checkMyDay(my_time,ads_new[i])) // checking the day&hour in the week
                        ads_array.push(ads_new[i]);
                }
            }
        }
    }
    if(ads_array.length > 0){
        localStorage.ads = JSON.stringify(ads_array);
        return ads_array;
    }
    else
        document.write("no ads for you right now ma man");
}

function checkMyDay(time, current_ad){
    for(let current_day of current_ad.days){
        if(time[1] == current_day["number"]){
            if(time[0] >= current_day["fromHour"] && time[0] < current_day["toHour"])
                return true;
        }
    }
    return false;
}

function adsPublisher(){
    ads_new = JSON.parse(localStorage.ads);
    let single_ad = ads_new[0];
    ads_new.shift();
    localStorage.ads = JSON.stringify(ads_new);
    console.log(single_ad);
    printHead(single_ad);
    printText(single_ad);
    let timeDelay = setTimeout(swift,single_ad["timeDuration"]*1000);
}

function printHead(current_ad){
    document.write('<header id="head">' + current_ad["name"] + "(based on " + current_ad["templateUrl"] + ")<br/>" + '</header>');
}

function printText(current_ad){ // print the text and images
    let length = current_ad["texts"].length;
    for(let i = 0; i < length; i++) {
        document.write('<body id="body">' + current_ad["texts"][i] + "<br/>" + '</body>');
    }
    for(let j = 0; j < current_ad.imageUrl.length; j++)
        printImg(current_ad.imageUrl[j]);
}

function printImg(source){
    let img = document.createElement("img");
    img.src = source;
    img.style.height = '300px';
    img.style.width = '600px';
    img.style.marginBlock = '20px';
    let block = document.getElementById("x");
    block.appendChild(img);
}

async function templateSelector(){
    httpGet();
    adSelector();
    let ads_array = JSON.parse(localStorage.ads);
    document.location.href = ads_array[0]["templateUrl"];
}

function swift(){
    let ads_array = JSON.parse(localStorage.ads);
    console.log(ads_array);
    if(ads_array.length != 0)
        document.location.href = ads_array[0]["templateUrl"];
    else
        document.location.href = "main.html";
}