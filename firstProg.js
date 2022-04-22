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
 var ads_new = [
     new Ad("meridian",
         "./templateA.html",
         ["Waterproof", "Shock resistant", "Cordless", "90 Minutes Trim Time Fully Charged"],
         ["pics/Meridian_balls.jpg", "pics/Meridian_case.jpg"],
         [new Day("monday",1,6,12),
                   new Day("wednesday",3,13,20)],
         [new Date(2022,1,1)],
         [new Date(2022,12,31)],
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
        ["pics/Mac.jpg"],
        [new Day("tuesday",2,10,16),
               new Day("wednesday",3,10,16)],
        [new Date(2022,1,3)],
        [new Date(2022,4,31)],
        10,
        [1,3]
    ),
     new Ad("Trivago",
         "./templateC.html",
         [],
         [],
         [new Day("sunday",0,8,22),
             new Day("monday",1,8,22),
             new Day("tuesday",2,8,22),
             new Day("wednesday",3,8,22),
             new Day("thursday",4,8,22),
             new Day("friday",5,8,22),
             new Day("saturday",6,8,22)],
         [new Date(2022,5,1)],
         [new Date(2022,6,15)],
         3,
         [2,3]
     ),
     new Ad("Livnat Poran",
         "./templateA.html",
         ["Halita? niftsata?", "we are here for you!"],
         [],
         [new Day("monday",1,15,19)],
         [new Date(2022,3,29)],
         [new Date(2022,5,14)],
         6,
         [2]
     ),
     new Ad("Durex",
         "./templateB.html",
         ["Don't forget to wear your mask",
                "Don't limit yourself with treats",
                "freedom means responsibility",
                "Toys change, playtime Doesn't",
                "Protect yourself and your love ones",
                "Get in you closest drag store"],
         ["./pics/sand.jpg","./pics/ps5.jpg"],
         [new Day("monday",1,1,23),
             new Day("tuesday",2,1,23),
             new Day("wednesday",3,1,23)],
         [new Date(2022,4,1)],
         [new Date(2022,4,31)],
         9,
         [3]
     )
 ];

function time(){
    var date_now = new Date();
    var day_in_week = date_now.getDay();
    var day_in_month = date_now.getDate();
    var month = date_now.getMonth();
    var year = date_now.getFullYear();
    var hour = date_now.getHours();
    return [hour,day_in_week,day_in_month,month,year];
}

function adSelector(){
    var ads_array = [];
    var my_time = time();
    if((my_time[1] == 1 || my_time[1] == 3) && my_time[0]>=6 && my_time[0]<12 && my_time[4] == 2022)
        ads_array.push(ads_new[0]);
    if((my_time[1] == 2 || my_time[1] == 3) && my_time[0]>=10 && my_time[0]<16 && (my_time[3] == 3 ||my_time[3] == 4) && my_time[4] == 2022)
        ads_array.push(ads_new[1]);
    if(my_time[0] >= 8 && my_time[0] < 22 && (my_time[3] == 4 ||(my_time[3] == 5 && my_time[2] <= 15)) && my_time[4] == 2022)
        ads_array.push(ads_new[2]);
    if(my_time[1] == 1 && my_time[0] >= 15 && my_time[0] < 19 && ((my_time[3] == 3 && my_time[2] >= 29) || (my_time[3] == 4 && my_time[2] <= 15)) && my_time[4] == 2022)
        ads_array.push(ads_new[3]);
    if(my_time[1] >= 1 && my_time[1] <= 3 && my_time[0] >= 1 && my_time[0] < 23 && my_time[3] == 4 && my_time[4] == 2022)
        ads_array.push(ads_new[4]);
    localStorage.ads = JSON.stringify(ads_array);
}

function adsPublisher(){
    let ads_array = JSON.parse(localStorage.ads);
    var single_ad = ads_array[0];
    ads_array.shift();
    localStorage.ads = JSON.stringify(ads_array);
    printHead(single_ad);
    printText(single_ad);
    timeDelay = setTimeout(swift,single_ad["timeDuration"]*1000);
}

function printHead(current_ad){
    document.write('<header id="head">' + current_ad["name"] + "(based on " + current_ad["templateUrl"] + ")<br/>" + '</header>');
}

function printText(current_ad){
    for(let elmnt of ads_new){
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
    adSelector();
    let ads_array = JSON.parse(localStorage.ads);
    document.location.href = ads_array[0]["templateUrl"];
}

function swift(){
    let ads_array = JSON.parse(localStorage.ads);
    if(ads_array.length != 0)
        document.location.href = ads_array[0]["templateUrl"];
    else
        document.location.href = "main.html";
}