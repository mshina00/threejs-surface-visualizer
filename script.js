import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "https://esm.sh/three/examples/jsm/controls/OrbitControls";

// Create the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 3);

// Create the renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add orbit controls for mouse-based interaction (rotation and zooming)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth motion effect

// Function to define the surface (Example: Hyperbolic Paraboloid -> z = x^2 - y^2)
function surfaceFunction(x, y) {
    return x * x - y * y; // Modify this function to graph different surfaces
}

// Generate vertices for the function graph
const resolution = 0.1; // Step size for x and y values
const geometry = new THREE.BufferGeometry();
let vertices = [];

for (let x = -1; x <= 1; x += resolution) {
    for (let y = -1; y <= 1; y += resolution) {
        let z = surfaceFunction(x, y); // Compute z based on the function
        vertices.push(x, y, z); // Store the vertex coordinates
    }
}

// Set the vertices in the geometry object
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

// Create a material for the points
const material = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.05 });
const points = new THREE.Points(geometry, material);
scene.add(points); // Add the graph to the scene

// Add an axis helper to visualize x, y, and z directions
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Add a reference plane at the origin (wireframe for visibility)
const planeGeometry = new THREE.PlaneGeometry(2, 2);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, wireframe: true });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotate to align with the x-y plane
scene.add(plane);

// Animation loop to continuously render the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls (for smooth rotation/zooming)
    renderer.render(scene, camera);
}
animate();

// Handle window resizing to maintain aspect ratio
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
