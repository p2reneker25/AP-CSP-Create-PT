const seaLevelIncrement = 0.14;
var latitude = null;
var longitude = null;
var address = null;
//HTML functions
function clearTextBoxData(element)
{
  document.getElementById(element).value = null;
}
function chooseLocationSystem()
{
  var mode = document.getElementById("locationMode").value
  if(mode == "Use browser location")
  {
    document.getElementById("geocode").style.visibility = "visible";
    document.getElementById("coordinates").style.visibility = "hidden";
    document.getElementById("inputB")/*address*/.style.visibility = "hidden";
    document.getElementById("inputA")/*lat/lng*/.style.visibility = "visible" 
  }
  if(mode == "Use coordinates")
  {
    document.getElementById("coordinates").style.visibility = "visible";
    document.getElementById("geocode").style.visibility = "hidden";
    document.getElementById("inputB")/*address*/.style.visibility = "hidden";
    document.getElementById("inputA")/*lat/lng*/.style.visibility = "visible";
  }
  if(mode == "Use address")
  {
    document.getElementById("inputB")/*address*/.style.visibility = "visible";
    document.getElementById("coordinates").style.visibility = "hidden";
    document.getElementById("geocode").style.visibility = "hidden";
    document.getElementById("inputA")/*lat/lng*/.style.visibility = "hidden";
  }

}
function submitLocation()
{
  var mode = document.getElementById("locationMode").value

  if(mode == "Use browser location" || mode == "Use coordinates")
  {
    alert("using lat long");
    latitude = document.getElementById("latBox").value;
    longitude = document.getElementById("lngBox").value;
    getElevation(latitude, longitude)
  }
  else if(mode == "Use address")
  {
    alert("Using address");
    address = document.getElementById("addBox").value;
    geocode(address)
  }
  else if(mode == "Choose method of getting location"){
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
          getElevation(latitude, longitude);
        },
        error: function(error) {
          console.log(error);
        }
      });

      return false;
    }
function getElevation(lat, lng)
{
  alert(lat);
  alert(lng);
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
