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

// The ads array argument
 const ads_new = [
     new Ad("meridian",
         "./templateA.html",
         ["Waterproof", "Shock resistant", "Cordless", "90 Minutes Trim Time Fully Charged"],
         ["./pics/Meridian_balls.jpg", "./pics/Meridian_case.jpg"],
         [new Day("monday",1,6,12),
                   new Day("wednesday",3,13,20)],
         [2022,0,1],
         [2022,11,31],
         7,
         [1,2]
     ),
     new Ad("Mcdonalds",
        "./templateB.html",
        ["Big mac ............................................ 34nis",
               "Mac Royal......................................... 42nis",
               "Big America...................................... 48nis",
               "Big Tokyo.......................................... 48nis",
               "Big Japna.......................................... 48nis",
               "Big Mombai....................................... 60nis",
               "Big Texas............................................ 48nis",
               "McNuggets........................................ 30nis",
               "Potuto&chips..................................... 25nis",
               "Happy Meal....................................... 34nis"],
        ["./pics/Mac.jpg"],
        [new Day("tuesday",2,10,16),
               new Day("wednesday",3,10,16)],
        [2022,2,3],
        [2022,3,31],
        10,
        [1,3]
    ),
     new Ad("Trivago",
         "./templateC.html",
         ["dekel ohel batahat ve gam ahoto"], //delete it!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         [],
         [new Day("sunday",0,8,22),
             new Day("monday",1,8,22),
             new Day("tuesday",2,8,22),
             new Day("wednesday",3,8,22),
             new Day("thursday",4,8,22),
             new Day("friday",5,8,22),
             new Day("saturday",6,8,22)],
         [2022,4,1],
         [2022,5,30], //need to change the 30 to 15
         3,
         [2,3]
     ),
     new Ad("Livnat Poran",
         "./templateA.html",
         ["Halita? niftsata?", "we are here for you!"],
         [],
         [new Day("monday",1,15,19)],
         [2022,2,29],
         [2022,3,15],
         6,
         [1]
     ),
     new Ad("Durex",
         "./templateB.html",
         ["Hey fella!",
                "Don't forget to wear your mask",
                "Don't limit yourself with treats",
                "freedom means responsibility",
                "Toys change, playtime Doesn't",
                "Protect yourself and your love ones",
                "Get in you closest drag store"],
         ["./pics/sand.jpg","./pics/ps5.jpg"],
         [new Day("monday",1,1,23),
             new Day("tuesday",2,1,23),
             new Day("wednesday",3,1,23)],
         [2022,4,1],
         [2022,4,30],
         9,
         [3]
     )
 ];

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
    for(let i = 0; i < ads_new.length; i++){ // CHANGE IT TO FOREACH
        if(my_time[4] == ads_new[i].fromDate[0]){ // checking year
            if(my_time[3] >= ads_new[i].fromDate[1] && my_time[3] <= ads_new[i].toDate[1]){ // checking month
                if(my_time[2] >= ads_new[i].fromDate[2] && my_time[2] <= ads_new[i].toDate[2]){ // checking day in month
                        if(checkMyDay(my_time,ads_new[i])) // checking the day&hour in the week
                            ads_array.push(ads_new[i]);
                }
            }
        }
    }
    localStorage.ads = JSON.stringify(ads_array);
    return ads_array;
}

function checkMyDay(time, current_ad){
    for(let i = 0; i < current_ad.days.length; i++){
        if(time[1] == current_ad.days[i]["number"]){
            if(time[0] >= current_ad.days[i]["fromHour"] && time[0] < current_ad.days[i]["toHour"])
                return true;
        }
    }
    return false;
}

function adsPublisher(){
    let ads_array = JSON.parse(localStorage.ads);
    let single_ad = ads_array[0];
    ads_array.shift();
    localStorage.ads = JSON.stringify(ads_array);
    printHead(single_ad);
    printText(single_ad);
    // timeDelay = setTimeout(swift,single_ad["timeDuration"]*1000);
    setTimeout(swift,single_ad["timeDuration"]*1000);
}

function printHead(current_ad){
    document.write('<header id="head">' + current_ad["name"] + "(based on " + current_ad["templateUrl"] + ")<br/>" + '</header>');
}

function printText(current_ad){ // print the text and images
    for(let elmnt of ads_new){ // CHANGE TO FOREACH
        if(!elmnt["name"].localeCompare(current_ad["name"])){
            var template = current_ad["templateUrl"]
            for(let text of elmnt["texts"]){
                document.write('<body id="body">' + text + "<br/>" + '</body>');
            }
            for(let img of elmnt["imageUrl"])
            printImg(img);
        }
    }
}

function printImg(source){
    var img = document.createElement("img");
    img.src = source;
    img.style.height = '300px';
    img.style.width = '600px';
    img.style.marginBlock = '20px';
    var block = document.getElementById("x");
    block.appendChild(img);
}

function templateSelector(){
    let tmp = adSelector();
    $("#templates").text(tmp[0].texts[0]).css("background-color","yellow");
    // let ads_array = JSON.parse(localStorage.ads);
    // document.location.href = ads_array[0]["templateUrl"];
}

function swift(){
    let ads_array = JSON.parse(localStorage.ads);
    if(ads_array.length != 0)
        document.location.href = ads_array[0]["templateUrl"];
    else
        document.location.href = "main.html";
}