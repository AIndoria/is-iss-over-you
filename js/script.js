//TODO: Implement weather check

if (!navigator.geolocation){
    alert("Unsupported browser. Please use a newer browser. We recommend Firefox.");
}

var lat=0;
var lon=0;
var did_the_chinese_blow_it_up=0;//Get the wikipedia 'The International Space Station *IS*' string and check for is/was. 
var distance=0;

function getCurrentLocation(callback){
    navigator.geolocation.getCurrentPosition(function (position){
        lat=position.coords.latitude;
        lon=position.coords.longitude;
        callback();
        console.log("Location Found");
    });
}

function getISSLocation(){
  console.log("Fetching ISS location...");
  let request=new XMLHttpRequest();
  request.open("GET","http://api.open-notify.org/iss-now.json");
  request.onload=function getRequest(){
    let ISSData=JSON.parse(request.responseText);
    console.log(ISSData);
    compareLocation(ISSData);
  }
  request.send();
}

getCurrentLocation(getISSLocation);


function compareLocation(iss_location){
  console.log("Running Comparison...");
  let iss_lat=iss_location["iss_position"].latitude;
  let iss_lon=iss_location["iss_position"].longitude;
  let radius = 6372.8; // km

  function CalcHaversineDistance(origin_lat, dest_lat, origin_lon, dest_lon, radius) {
    let radianLong1 = ToRadians(origin_lon);
    let radianLat2 = ToRadians(dest_lat);
    let radianLong2 = ToRadians(dest_lon);
    let radianLat1 = ToRadians(origin_lat);
    let radianDistanceLat = radianLat1 - radianLat2;
    let radianDistanceLong = radianLong1 - radianLong2;
    let sinLat = Math.sin(radianDistanceLat / 2.0);
    let sinLong = Math.sin(radianDistanceLong / 2.0);
    let a = Math.pow(sinLat, 2.0) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.pow(sinLong, 2.0);
    distance = radius * 2 * Math.asin(Math.min(1, Math.sqrt(a)));
    console.log(distance);
  }

  function ToRadians(degree) {
    return (degree * (Math.PI / 180));
  }
  CalcHaversineDistance(lat,iss_lat,lon,iss_lon,radius);
}

function displayResults(){
 
}

//TODO
function saveCookieLocation(){
    
}

function getCookieLocation(){

}