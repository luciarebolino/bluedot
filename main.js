
function initMap() {
  const myLatlng = { lat: 41.871386, lng: -87.619079 };
  const map = new google.maps.Map(document.getElementById("map"), {
	  maxZoom: 18,
	  minZoom: 0,
      zoom: 3,
      center: myLatlng,
      disableDefaultUI: true,
      zoomControl: true,
  });

  var bounds = new google.maps.LatLngBounds();
  bounds.extend(myLatlng);
  map.fitBounds(bounds);

  const bluedotMarker = new google.maps.Marker({
    position: myLatlng,
    map,
    icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillOpacity: 1,
        strokeWeight: 2,
        fillColor: '#5384ED',
        strokeColor: '#ffffff',
    },
});

// InfoWindow to hold the GIF
let gifInfoWindow = new google.maps.InfoWindow({
  content: "<div style='width: 340px; height: 220px;'><img src='2.gif' alt='Animated Gif' style='width: 100%; height: 100%; object-fit: cover;'/></div>",
});

// Add a click event listener on the marker to show the GIF
let gifInfoWindowOpen = false;

// Add a click event listener on the marker to show the GIF
bluedotMarker.addListener('click', () => {
    if (gifInfoWindowOpen) {
        gifInfoWindow.close();
        gifInfoWindowOpen = false;
    } else {
        gifInfoWindow.open(map, bluedotMarker);
        gifInfoWindowOpen = true;
    }
});
// Get coordinates of the mouse pointer
map.addListener("mousemove", (mapsMouseEvent) => {
  let lat = mapsMouseEvent.latLng.toJSON().lat.toFixed(3);
  let lng = mapsMouseEvent.latLng.toJSON().lng.toFixed(3);

  console.log(lat);
  console.log(lng);

  document.getElementById("lat").innerHTML = "Lat [" + lat + "]";
  document.getElementById("long").innerHTML = "Lng [" + lng + "]";
});

//Here is the color change that uses zoom instead of using the buttons in the example
map.addListener("zoom_changed", () => {

  var currentZoom = map.getZoom()
	var stepUp = currentZoom+1
	var stepDown = currentZoom-1
  // document.getElementById("curZoom").innerHTML = currentZoom; 
	document.getElementById("zoom").innerHTML = "ZL" + map.getZoom();
	
	if(currentZoom <9.5){
		var roundedZoom= "ZL0"+Math.round(currentZoom)
		//var roundedStepUp = "ZL0"+Math.round(stepUp)
	}else{
		var roundedZoom = "ZL"+Math.round(currentZoom)
		//var roundedStepUp = "ZL0"+Math.round(stepUp)
	}
	
	if(roundedStepUp <9.5){
		var roundedStepUp = "ZL0"+Math.round(stepUp)
	}else{
		var roundedStepUp = "ZL"+Math.round(stepUp)
	}
	
	// console.log(roundedStepUp)
	d3.selectAll(".matrixRect").style("opacity",.2)
d3.selectAll("."+roundedZoom).style("opacity",1)	
d3.selectAll("."+roundedStepUp).style("opacity",.2)	



});

}
window.initMap = initMap

