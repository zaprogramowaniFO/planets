console.log(THREE);

//CANVAS
const canvas = document.querySelector('.webgl');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//SCENE
const scene = new THREE.Scene();

//MESH
const colorYellow = 0xff9900;
const colorGreen = 0x00ff00;
const colorBlue = 0x0000ff;
const colorRed = 0xff0000;

const createSphere = (r, color) => {
const sphereGeo = new THREE.SphereGeometry(r, 20, 20);
const sphereMat = new THREE.MeshPhongMaterial({
    color,
    shininess: 40
});

return new THREE.Mesh(sphereGeo, sphereMat);

}
const sun = createSphere(3, colorYellow);
scene.add(sun);

const createPlanet = (r, color) => {
    const planet = createSphere(r, color);
    const pivot = new THREE.Object3D();
    pivot.add(planet);
    return {
        planet,
        pivot
    };
};

const Mercury = createPlanet(1);
const Wenus = createPlanet(1);
const Earth = createPlanet(1, colorGreen);
const Mars = createPlanet(0.5, colorRed);
const Jupiter = createPlanet(1.5);
const Saturn = createPlanet(1);
const Uran = createPlanet(1);
const Neptun = createPlanet(1, colorBlue);

Mercury.planet.position.set(3.2,0,0);
Wenus.planet.position.set(5,0,0);
Earth.planet.position.set(6,0,0);
Mars.planet.position.set(7.4,0,0);
Jupiter.planet.position.set(17,0,0);
Saturn.planet.position.set(31,0,0);
Uran.planet.position.set(44,0,0);
Neptun.planet.position.set(56,0,0);



sun.add(Mercury.pivot, Wenus.pivot, Earth.pivot, Mars.pivot, Jupiter.pivot, Saturn.pivot, Uran.pivot, Neptun.pivot);



//LIGHT
const light  = new THREE.PointLight(0x9dff00, 2);
light.position.z = 20;
light.position.y = -20;
light.position.x = -40;
const light2  = new THREE.PointLight(0xffffff, 1);
// light2.position.z = -20;
// light2.position.y = 20;
// light2.position.x = 40;
light2.position.set(-20,20,40);
scene.add(light2, light);



//CAMERA
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 80;

    scene.add(camera);

//RENDERER


const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
})


renderer.setSize(sizes.width, sizes.height);

//WINDOW
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

//ANIMATE
const animate = () => {
    requestAnimationFrame(animate);
    Mercury.pivot.rotation.z += 0.4;
    Wenus.pivot.rotation.z += 0.16;
    Earth.pivot.rotation.z += 0.1;
    Mars.pivot.rotation.z += 0.05;
    Jupiter.pivot.rotation.z += 0.009;
    Saturn.pivot.rotation.z += 0.003;
    Uran.pivot.rotation.z += 0.001;
    Neptun.pivot.rotation.z += 0.0006;
    
    sun.rotation.x += 0.001;
    sun.rotation.y += 0.001;
    sun.rotation.z += 0.001;
    renderer.render(scene, camera);

}

animate();