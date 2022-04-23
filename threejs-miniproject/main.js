import './style.css'
import backgroundUrl from './jeremy-thomas-4dpAqfTbvKA-unsplash.jpg'
// import profilePicUrl from './profile-pic.jpg'
import './credits.html'

import * as THREE from 'three'

//✨ drag and scroll magic ✨
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//we have 3 things in THREE.js
//1. Scene -> where we put all our objects
//2. Camera -> where we look at the scene
//3. Renderer -> what we see

//* initial setup
const scene = new THREE.Scene()
//(most common camera = perspective camera)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
// camera.position.setX(-3)
// camera.position.setY(-30)

renderer.render(scene, camera)

/**
 * SHAPES
 */
//a donut
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

//material = color and texture
//basic material doesn't require light source
//standard material lives only when there's light
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 })

const torus = new THREE.Mesh(geometry, material)
torus.position.z = -40
torus.position.x = -30
torus.position.y = 10
scene.add(torus)

/**
 * cylinder
 */
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.7, 10, 32)
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0xFC1 })

const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
cylinder.position.z = -80
cylinder.position.y = -5
cylinder.position.z = -6
scene.add(cylinder)


/**
 * LIGHTING
 */
const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight, pointLight)

// //it shows where the light is
// const lightHelper = new THREE.PointLightHelper(pointLight)
// //it shows a bidimensional grid
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

//✨ drag and scroll magic ✨
const controls = new OrbitControls(camera, renderer.domElement)

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

//background
const spaceTexture = new THREE.TextureLoader().load(backgroundUrl)
scene.background = spaceTexture;

//avatar
const frankTexture = new THREE.TextureLoader().load('profile-pic.jpg')
const frank = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ map: frankTexture })
)

scene.add(frank)

frank.position.z = -10;
frank.position.x = 20;
frank.position.y = 10;

//scroll animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top

  frank.rotation.y += 0.02
  frank.rotation.x += 0.02

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera
// moveCamera()

//to actually see the shape, we need to render it
// renderer.render(scene, camera)
//it is however inefficient to call the render method every time we want to see the scene
//so now we use an animate() function to call the render method every frame
function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  cylinder.rotation.x += 0.01
  cylinder.rotation.y += 0.005
  cylinder.rotation.z += 0.01

  //✨ /*drag and*/ scroll magic ✨
  controls.update()

  renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})