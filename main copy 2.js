import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(10, 3,16,100);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe : true });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);