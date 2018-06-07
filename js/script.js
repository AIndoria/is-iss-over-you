if (!navigator.geolocation){
    alert("Unsupported browser. Please use a newer browser. We recommend Firefox.");
}

let did_the_chinese_blow_it_up=0;//Get the wikipedia 'The International Space Station *IS*' string and check for is/was. 

function getCurrentLocation(callback){
    navigator.geolocation.getCurrentPosition(function (position){
        lat=position.coords.latitude;
        lon=position.coords.longitude;
        callback();
    });
}

function getISSLocation(){
  console.log("Fetching ISS location...");
  var request=new XMLHttpRequest();
  request.open("GET","http://api.open-notify.org/iss-now.json");
  request.onload=function getRequest(){
    var ISSData=JSON.parse(request.responseText);
    console.log(ISSData);
  }
  request.send();
}

getCurrentLocation(getISSLocation);


function compareLocation(){

}

function displayResults(){

}

//TODO
function saveCookieLocation(){
    
}

function getCookieLocation(){

}