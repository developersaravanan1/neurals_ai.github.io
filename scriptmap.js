let map;
let placeNameContainer;

function initMap() {
  map = new Microsoft.Maps.Map('#mapContainer', {
    credentials: 'AkYWB8gJ_01j2NdrW17u1t-Qj0b1Bbgi3S3A2zv2RLypHNDeLEG9tyuFK74JtWBg',
    center: new Microsoft.Maps.Location(20.5937, 78.9629),
    zoom: 5
  });

  placeNameContainer = document.getElementById('placeNameContainer');
}


const places = [
    { name: 'Delhi', coordinates: new Microsoft.Maps.Location(28.7041, 77.1025) },
    { name: 'Mumbai', coordinates: new Microsoft.Maps.Location(19.0760, 72.8777) },
    { name: 'Chennai', coordinates: new Microsoft.Maps.Location(13.0827, 80.2707) },
    { name: 'Kolkata', coordinates: new Microsoft.Maps.Location(22.5726, 88.3639) },
    { name: 'Bangalore', coordinates: new Microsoft.Maps.Location(12.9716, 77.5946) }
];

function searchPlace() {
  const searchQuery = document.getElementById('searchInput').value;

  Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
    const searchManager = new Microsoft.Maps.Search.SearchManager(map);

    const requestOptions = {
      bounds: map.getBounds(),
      where: searchQuery,
      callback: function (answer, userData) {
        if (answer && answer.results && answer.results.length > 0) {
          const firstResult = answer.results[0];

          const location = firstResult.location;
          map.setView({ center: location });

          


          const pin = new Microsoft.Maps.Pushpin(location);
          map.entities.push(pin);

          const placeName = firstResult.name;
          showPlaceName(placeName);
        } else {
          alert('No results found.');
        }
      }
    };

    searchManager.geocode(requestOptions);
  });
}

function showPlaceName(name) {
  placeNameContainer.innerHTML = name;
  placeNameContainer.style.visibility = 'visible';
}

function clearSearchResults() {
    if (currentPin) {
      map.entities.remove(currentPin);
      currentPin = null;
    }
    
    placeNameContainer.innerHTML = '';
    placeNameContainer.style.visibility = 'hidden';
  }