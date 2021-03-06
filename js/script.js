/*
TODO
  Implement weather check
  Implement cookies
  Adjust for ocean-name instead of just "an ocean."
*/

if (!navigator.geolocation){
    alert("Unsupported browser. Please use a newer browser. We recommend Firefox.");
}

var lat=0, iss_lat=0;
var lon=0, iss_lon=0;
var currentState, currentCountry, ISS_Location;
var did_the_chinese_blow_it_up=0; //Get the wikipedia 'The International Space Station *IS*' string and check for is/was. 
var distance=0;
//var intervalID = window.setInterval(getISSLocation, 60000); //Refresh every minute for updated location
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
  request.open("GET","https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json");
  request.onload=function getRequest(){
    let ISSData=JSON.parse(request.responseText);
    console.log(ISSData);
    compareLocation(ISSData);
    getCurrentReadableLocation();
    getISSReadableLocation();
    displayResults();
  }
  request.send();
}

getCurrentLocation(getISSLocation);


function compareLocation(iss_location){
  console.log("Running Comparison...");
  iss_lat=iss_location["iss_position"].latitude;
  iss_lon=iss_location["iss_position"].longitude;
  let radius = 6372.8; // km
  console.log(iss_lat,iss_lon);
  console.log(lat,lon);

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
  console.log("distance is "+distance);
  if(distance!=0 && distance<1360){
    document.getElementById("answer-primary").innerHTML="YES";
    document.getElementById("answer-primary").style.fontSize="12em";
  }
  else if(distance!=0 && distance>1360 && distance<2230){
    document.getElementById("answer-primary").innerHTML="MAYBE";
    document.getElementById("answer-explanation").innerHTML="If you can see it, you'll find it towards the horizon, very low in the sky. Most likely you won't see it because of mountains or other obstructions in the way."
    document.getElementById("answer-primary").style.fontSize="9em";
  }
  else{
    document.getElementById("answer-primary").innerHTML="NO";
    document.getElementById("answer-explanation").innerHTML="The ISS is too far away from you. It is currently "+Math.round(distance)+" kilometers away. It needs to be at least 2300km (ideally ~1360km) for it to visible";
    
  }
}


function getCurrentReadableLocation(){
  console.log("Getting current location...");
  let currentCityRequest=new XMLHttpRequest();
  currentCityRequest.open("GET","https://cors-anywhere.herokuapp.com/http://api.geonames.org/findNearbyJSON?lat="+lat+"&lng="+lon+"&username=isissaboveme");
  currentCityRequest.onload=function getRequest(){
    let currentLocationData=JSON.parse(currentCityRequest.responseText);
    currentState=currentLocationData.geonames[0].adminName1;
    currentCountry=currentLocationData.geonames[0].countryName;
    console.log("YOU LIVE IN: "+currentState,currentCountry);
  }
  currentCityRequest.send();

}

function getISSReadableLocation(){
  console.log("Getting current ISS Location...");
  let currentISSRequest=new XMLHttpRequest();
  currentISSRequest.open("GET","https://cors-anywhere.herokuapp.com/http://api.geonames.org/findNearbyJSON?lat="+iss_lat+"&lng="+iss_lon+"&username=isissaboveme");
  currentISSRequest.onload=function getRequest(){
    let ISSLocationData=JSON.parse(currentISSRequest.responseText);
    displayISSReadableLocation(ISSLocationData);
  }
  currentISSRequest.send();
}

function displayISSReadableLocation(ISSLocationData){
  if(ISSLocationData.geonames[0]!==undefined){
    if(ISSLocationData.geonames[0].countryName!==undefined){
      ISS_Location=ISSLocationData.geonames[0].countryName;
    }
    else if(ISSLocationData.geonames[0].name !== undefined){
      ISS_Location=ISSLocationData.geonames[0].name;
    }
    else{
      ISS_Location="an Ocean";
    }
  }
  else{
    ISS_Location="an Ocean";
  }
  console.log("ISS IS IN: "+ISS_Location);
  document.getElementById("iss-loc").innerHTML+=" "+ISS_Location;
  let iss_direction="";
  if(iss_lat>lat) iss_direction+="North";
  else iss_direction+="South";
  if(iss_lon>lon) iss_direction+="East";
  else iss_direction+="West";
  document.getElementById("answer-direction-dynamic").innerHTML+=" "+iss_direction;
}
