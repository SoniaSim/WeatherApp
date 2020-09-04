var mymap = L.map('worldmap',
     {
      center: [48.866667, 2.333333],
      zoom: 4
     }
     );
     
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);


var cities = document.getElementsByClassName("cities");
// console.log(cities);

for(var i = 0; i<cities.length; i++){
    var longitude = cities[i].dataset.long;
    var latitude = cities[i].dataset.lat;
    // console.log(cities[i].textContent);
    var customIcon = L.icon({
        iconUrl: '/images/leaf-green.png',
        iconSize:   [25, 50],
        iconAnchor:  [longitude, latitude], 
        popupAnchor: [0, 0]
       });
       
       
       L.marker([latitude, longitude], {icon: customIcon}).addTo(mymap).bindPopup(cities[i].textContent);
};



