import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import dat from 'dat.gui'
import Stats from 'stats-js'

const { renderer, scene, camera, controls } = init()

const settings = {}
const gui = new dat.GUI({ width: 300 })
const stats = new Stats()
document.body.appendChild(stats.dom)
animate()

function animate() {
  stats.begin()
  controls.update()
  renderer.render(scene, camera)
  stats.end()

  requestAnimationFrame(animate)
}

function init() {
  const container = document.getElementById('container')

  const camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 5, 1000000)
  camera.position.z = 500

  const controls = new OrbitControls(camera, container)

  const scene = new THREE.Scene()

  const renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  container.appendChild(renderer.domElement)

  window.addEventListener(
    'resize',
    () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    },
    false
  )

  return { renderer, scene, camera, controls }
}
