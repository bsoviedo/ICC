

var map =  L.map('mapid', {
    center: [6, -75],
    zoom: 5
});

  
var base= L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',).addTo(map);


var markers = L.markerClusterGroup({
    attribution: 'Instituto Caro y Cuervo / Open Street Maps'
  }); 


var geoJsonLayer = L.geoJson(data, { //acá se lee el layer del geojson
    onEachFeature: function (feature, layer) { //Y se establece la función para desplegar el popup
      layer.bindPopup("<h2>Detalles</h2><table class='table' border= 1>" +
      "<tr> <td> <strong> Id Informante: </strong> </td> <td>"+ feature.properties.idinformante + "</td> </tr>"+
      "<tr> <td> <strong> Palabra </strong> </td> <td>"+ feature.properties.palabra + "</td> </tr>"+
      "<tr> <td> <strong> Modismo </strong> </td> <td>"+ feature.properties.modismo + "</td> </tr>"+
      "<tr> <td> <strong> Edad </strong> </td> <td>"+ feature.properties.edad + "</td> </tr>"+
      "<tr> <td> <strong> Localidad </strong> </td> <td>"+ feature.properties.municipio + " ,"+" " + feature.properties.departamento + " </td> </tr>"+
      "<tr> <td> <strong> Localidad Procedencia </strong> </td> <td>"+ feature.properties.municipio_procedencia + " ,"+" " + feature.properties.departamento_procedencia + "</td> </tr>"+
      "</table>"); // Se le dice: cuando se haga clic, se despliega esa información
    }// la función .bindPopup permite el uso de HTML, por lo que se puede personalizar lo que sale en cada dato.
  });
markers.addLayer(geoJsonLayer);  //y acá se añade cada punto a la variable markers
  
  
map.addLayer(markers);  // Se añade la variable al mapa
map.fitBounds(markers.getBounds()); // Y esta si no se para que es :v
  

// Añade la escala
L.control.scale({
    imperial: false
  }
  ).addTo(map);


//Añade slide menu


var right = '<h1>Bienvenido/a</h1>';

var content= "<br>  <p> Esta página esta construida llamando los datos desde un geojson, debido a las limitaciones que se posee al no tener " +
"un servidor que pueda estar conectado desplegando los datos de geoserver las 24 horas del día. Hay que " + 
"recordar que geoserver debe estar instalado y debe correr 24/7 en un servidor para poder ser accesible siempre. <br> <br> De igual manera construí una página que " +
"llama las capas alojadas en geoserver como un servicio WMS, el cual se puede ver en este <a href= 'https://bsoviedoy.github.io/ICC-WMS/geovisor_WMS/index.html' alt='Enlace página geoserver'> enlace. </a>";
content += "<h2>Metadatos </h2>"
content += "Epsg: 4686 <br>"
content += "Datum: Magna-Sirgas <br>"
content += "Elaborado por: Brayan Stiven Oviedo Yate"


var slide= L.control.slideMenu('', {position: 'topright', menuposition: 'topright', 
width: '30%', height: '400px', delay: '20', icon: 'fas fa-bars'}).addTo(map);

slide.setContents(right + content);