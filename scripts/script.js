const seaLevelIncrement = 0.14;
var latitude = null;
var longitude = null;
var address = null;
var elevation = null;

//HTML functions
function clearTextBoxData(element) {
    document.getElementById(element).value = null;
}

function getElevation() {
    var config = {
        method: 'get',
        url: `https://nationalmap.gov/epqs/pqs.php?y=${longitude}&x=${latitude}&units=Meters&output=xml`
    };
    axios(config)
        .then(function(response) {
          var result = JSON.stringify(response.data);
          console.log(result)
          result = result.toString()
          result = result.split("Elevation>")
          //for(let i = 0; i<result.length; i ++){
          //alert("Parsed value: " + i + result[i])
         // }
          elevation = result[1].replace("<", "")
          elevation = elevation.replace("/", "")
          if(elevation == 10000){
            alert('The US government does not care about your location.')
            predictSeaLevelRate();
          }          
        })
        .catch(function(error) {
            console.log(error);
        });
}

function chooseLocationSystem() {

    var mode = document.getElementById("locationMode").value
  document.getElementById("locationMode").disabled = false;
    if (mode == "Use browser location") {
        document.getElementById("geocode").style.visibility = "visible";
        document.getElementById("coordinates").style.visibility = "hidden";
        document.getElementById("inputB") /*address*/ .style.visibility = "hidden";
        document.getElementById("inputA") /*lat/lng*/ .style.visibility = "visible"
    }
    if (mode == "Use coordinates") {
        document.getElementById("coordinates").style.visibility = "visible";
        document.getElementById("geocode").style.visibility = "hidden";
        document.getElementById("inputB") /*address*/ .style.visibility = "hidden";
        document.getElementById("inputA") /*lat/lng*/ .style.visibility = "visible";
    }
    if (mode == "Use address") {
        document.getElementById("inputB") /*address*/ .style.visibility = "visible";
        document.getElementById("coordinates").style.visibility = "hidden";
        document.getElementById("geocode").style.visibility = "hidden";
        document.getElementById("inputA") /*lat/lng*/ .style.visibility = "hidden";
    }
}

function submitLocation() {
    var mode = document.getElementById("locationMode").value
    if (mode == "Use browser location" || mode == "Use coordinates") {
        alert("using lat long");
        latitude = document.getElementById("latBox").value;
        longitude = document.getElementById("lngBox").value;
        getElevation()
    } else if (mode == "Use address") {
        alert("Using address");
        address = document.getElementById("addBox").value;
        geocode(address)
    } else if (mode == "Choose method of getting location") {
        alert("input location");
    }
}

function geocode(address) {
    $.ajax({
        url: `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${address}&benchmark=2020&format=json`,
        dataType: 'jsonp',
        success: function(response) {
            console.log(JSON.stringify(response))
            latitude = response.result.addressMatches[0].coordinates.x;
            longitude = response.result.addressMatches[0].coordinates.y;
            console.log('Latitude: ' + latitude);
            console.log('Longitude: ' + longitude);
            getElevation();
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        alert("Location not supported / permission denied");
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    document.getElementById("latBox").value = latitude;
    document.getElementById("lngBox").value = longitude;
}
function getSeaRiseRate(){
  for(let i = 0; i<stations.length; i++){
    alert(stations[i].toString())
  }
}
function predictSeaLevelRate(){
  var floodTime = elevation/seaLevelIncrement*365;
  document.getElementById("doom").innerHTML = "Your home will flood in " + floodTime + "days"
  alert(stations.length)
}
