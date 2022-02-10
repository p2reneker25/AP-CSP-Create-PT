const defaultSeaLevel = 0.14;
var latitude = null;
var longitude = null;
//HTML functions
function clearTextBoxData(element)
{
  
}

function geocode(address)
{

}
function getElevation()
{

}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else { 
    alert("Location not supported/denied");
  }
} 
function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    document.getElementById("latBox").value = latitude;
    document.getElementById("lngBox").value = longitude;

}
