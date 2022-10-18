import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import 'mapbox-gl/dist/mapbox-gl.css';

import './style.css'
import generatePlot from './plot.js'

mapboxgl.accessToken = "";

const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/ilyaly/ckt7elgql3wic18mh9a3hu0wx', 
    center: [59.3293, 18.0686], 
    zoom: 13, 
    maxBounds: [
        [-10.580472717308794, 53.119165851284976],
        [66.2815558659502, 71.50019552381556]
    ],
    preserveDrawingBuffer: true,
    pitchWithRotate: false
});

let plot = generatePlot();

document.getElementById('invitation-text').innerHTML = plot.invitation;
document.getElementById('main-conflict-text').innerHTML = plot.conflict;
document.getElementById('secondary-conflict-text').innerHTML = plot.subcoflict;

document.getElementById('invitor-text').innerHTML = plot.invitor;
document.getElementById('vaesen-text').innerHTML = plot.vaesen;
document.getElementById('victim-text').innerHTML = plot.victim;
document.getElementById('villain-text').innerHTML = plot.villain;
document.getElementById('logo').innerHTML = `${plot.incident} in ${plot.place.name}`;

if (plot.placeType === 'town') {
    map.flyTo({ center: [plot.place.lon, plot.place.lat], speed: 10000, zoom: 14 });
} else {
    map.flyTo({ center: [plot.place.lon, plot.place.lat], speed: 10000, zoom: 13 });
}


function updatePlot(map) {
    plot = generatePlot();

    //document.getElementById('plot-header').innerHTML = `${plot.incident} in ${plot.place.name}`
    document.getElementById('invitation-text').innerHTML = plot.invitation;
    document.getElementById('main-conflict-text').innerHTML = plot.conflict;
    document.getElementById('secondary-conflict-text').innerHTML = plot.subcoflict;

    document.getElementById('invitor-text').innerHTML = plot.invitor;
    document.getElementById('vaesen-text').innerHTML = plot.vaesen;
    document.getElementById('victim-text').innerHTML = plot.victim;
    document.getElementById('villain-text').innerHTML = plot.villain;
    document.getElementById('logo').innerHTML = `${plot.incident} in ${plot.place.name}`;
    if (plot.placeType === 'town') {
        map.flyTo({ center: [plot.place.lon, plot.place.lat], speed: 10000, zoom: 14 });
    } else {
        map.flyTo({ center: [plot.place.lon, plot.place.lat], speed: 10000, zoom: 13 });
    }

}

const generatePlotButton = document.getElementById('generate-new-plot');
generatePlotButton.addEventListener("click", function() {
    updatePlot(map)
});

const minimizeMaximizebutton = document.getElementById('minimize-maximize');
minimizeMaximizebutton.addEventListener("click", function() {
    const plotContainer = document.getElementById('storyWrapper');
    //plotContainer.classList.add('minimize-animation');
    plotContainer.classList.toggle("minimize-animation");
});

const printButton = document.getElementById('print');
printButton.addEventListener("click", function() {
    // Get the canvas
    const canvas = document.getElementsByTagName('canvas')[0];
    // Convert the canvas to data
    const image = canvas.toDataURL();
    // Create a link
    const aDownloadLink = document.createElement('a');
    // Add the name of the file to the link
    aDownloadLink.download = `${plot.incident} in ${plot.place.name}`;
    // Attach the data to the link
    aDownloadLink.href = image;
    // Get the code to click the download link
    aDownloadLink.click();
})
