import './style.css'

import * as THREE from 'three'

//✨ drag and scroll magic ✨
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//we have 3 things in THREE.js
//1. Scene
//2. Camera
//3. Renderer

//* initial setup
//scene
const scene = new THREE.Scene()

//camera (most common camera = perspective camera)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
camera.position.setX(-3)

renderer.render(scene, camera)

//basic shape
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

//material = color and texture
//basic material doesn't require light source
//standard material lives only when there's light
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 })

const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

//let's light up the scene!
const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight, pointLight)

// //due to the complexity of shapes and lights, we need to use a helper
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

// //✨ drag and scroll magic ✨
// const controls = new OrbitControls(camera, renderer.domElement)

//star
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  // const [x, y, z] = Array(3).fill().map(() => Math.random() * 100 - 50)
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

let nStars = 200
Array(nStars).fill().forEach(addStar)

//sfondo
const spaceTexture = new THREE.TextureLoader().load('assets/jeremy-thomas-4dpAqfTbvKA-unsplash.jpg')
scene.background = spaceTexture

//avatar
const frankTexture = new THREE.TextureLoader().load('assets/profile-pic.jpg')

const frank = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ map: frankTexture })
)

scene.add(frank)

frank.position.z = -5;
frank.position.x = 2;

//scroll animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top

  frank.rotation.y += 0.01
  frank.rotation.x += 0.01

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera
moveCamera()

//to actually see the shape, we need to render it
// renderer.render(scene, camera)
//it is however inefficient to call the render method every time we want to see the scene
//so now we use an animate() function to call the render method every frame
function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  // controls.update()

  renderer.render(scene, camera)
}

animate()