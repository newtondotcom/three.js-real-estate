import './style_class.css';
import * as THREE from 'three';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';



"use strict";

const manager = new THREE.LoadingManager();
const loadingScreen = document.querySelector('#loading-screen');
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
  console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};


manager.onLoad = function ( ) {
	console.log( 'Loading complete!');         
  //bar.destroy();
  loadingScreen.style.display ='none';
};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  //bar.animate(1.0);
};


manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};

const scene = new THREE.Scene();


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  preserveDrawingBuffer: true, 
  alpha: true,
});
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth*0.70, window.innerHeight*0.70);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-9.19, 700, 0); // x, y, z

const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader(manager);
let LoadedObject;
mtlLoader.setPath('./assets/');
mtlLoader.load('./test.mtl', (materials) => {
  materials.preload();
  objLoader.setMaterials(materials);
  objLoader.setPath('assets/');
  objLoader.load('./test.obj', (object) => {
    LoadedObject = object;
    LoadedObject.position.set(0, 0, 0);
    LoadedObject.rotation.y = Math.PI/180 * 90;
    scene.add(LoadedObject);
    camera.lookAt(new THREE.Vector3(-10, 8.56, -4.6850)); 

    var initialRotation = LoadedObject.rotation.y;

    // define the start and end scroll positions and the maximum rotation angle
    var startScrollPosition = 0;
    var endScrollPosition = 200;
    var maxRotationAngle = 2*Math.PI/3;


    function animate() {
      requestAnimationFrame(animate);
      controls.update();

        // calculate the scroll position as a percentage of the distance between start and end positions
      var scrollPosition = (window.scrollY - startScrollPosition) / (endScrollPosition - startScrollPosition);

        // limit the scroll position to the range [0, 1]
      scrollPosition = Math.max(0, Math.min(scrollPosition, 1));
      
        // calculate the rotation angle based on the scroll position and maximum rotation angle
      var rotationAngle = initialRotation + (scrollPosition * maxRotationAngle);
      
        // set the cube rotation
        LoadedObject.rotation.y = rotationAngle;
      renderer.render(scene, camera);
    }
    animate();
  });
});



// Ajout de l'éclairage directionnel
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);

/*
Pure js for HTML
*/
/*
window.addEventListener("scroll", function() {showFunction()});
animation: fadeEffect 3s; (fading effect takes 3s)
function showFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("canvas").style.opacity = 1;
    } else {
        document.getElementById("canvas").style.opacity = 0;
    }
}
*/


/*
Links for photogrammetry models:
https://www.youtube.com/watch?v=Rt-u0csbGY4
https://www.youtube.com/watch?v=bmlInulErJI

To reconstruct the model:
https://github.com/OpenDroneMap/WebODM
https://github.com/cdcseacave/openMVS
https://micmac.ensg.eu/index.php/Install_MicMac_MAC
https://all3dp.com/fr/1/logiciel-photogrammetrie-scanner-3d-numerisation-3d/#section-logiciels-de-photogrammetrie-gratuits

To see the model:
https://github.com/alicevision/meshroom/releases
meshlab


Datasets :
https://support.pix4d.com/hc/en-us/articles/360000235126-Example-projects-real-photogrammetry-data#label8
https://wingtra.com/mapping-drone-wingtraone/aerial-map-types/#3d-reconstruction
*/

