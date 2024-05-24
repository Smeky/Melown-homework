import * as Three from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

function setupLights(scene) {
    let directional = new Three.DirectionalLight(0xffffff, 3)
    directional.position.set(5, 2, 3)
    directional.castShadow = true
    directional.shadow.bias = - 0.0001
    directional.shadow.mapSize.width = 1024 * 4
    directional.shadow.mapSize.height = 1024 * 4

    let ambient = new Three.AmbientLight(0xffffff, 1)

    scene.add(directional)
    scene.add(ambient)
}

function main() {
    console.log("haf")

    const renderer = new Three.WebGLRenderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById("app").appendChild(renderer.domElement)

    const scene = new Three.Scene()
    const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const controls = new OrbitControls(camera, renderer.domElement)

    setupLights(scene)
    
    const geometry = new Three.BoxGeometry(1, 1, 1)
    const material = new Three.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new Three.Mesh(geometry, material)
    scene.add(cube)
    
    camera.position.z = 5

    function animate() {
        requestAnimationFrame(animate)
    
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
    
        controls.update()
        renderer.render(scene, camera)
    }
    
    animate()
}

main()
