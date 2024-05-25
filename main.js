import * as Three from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

function setupLights(scene) {
    let ambient = new Three.AmbientLight(0xffffff, 1)
    let directional = new Three.DirectionalLight(0xffffff, 3)

    directional.position.set(2, 3, 4)
    directional.castShadow = true
    directional.shadow.bias = - 0.0001
    directional.shadow.mapSize.width = 1024 * 4
    directional.shadow.mapSize.height = 1024 * 4

    scene.add(ambient)
    scene.add(directional)
}

function createCube(size, color) {
    let cube = new Three.Group()

    // Create spheres for corners
    for (let i = 0; i < 8; i++) {
        let geometry = new Three.SphereGeometry(size / 12, 32, 32)
        let material = new Three.MeshStandardMaterial({ color })
        let mesh = new Three.Mesh(geometry, material)
        cube.add(mesh)

        // Position corners
        let x = i & 1 ? size / 2 : -size / 2
        let y = i & 2 ? size / 2 : -size / 2
        let z = i & 4 ? size / 2 : -size / 2
        mesh.position.set(x, y, z)
    }

    // Create top cylinders for edges
    for (let i = 0; i < 4; i++) {
        let geometry = new Three.CylinderGeometry(size / 20, size / 20, size, 32)
        let material = new Three.MeshStandardMaterial({ color })
        let mesh = new Three.Mesh(geometry, material)
        cube.add(mesh)

        // Position edges
        let angle = Math.PI / 2 * i
        let x = size / 2 * Math.cos(angle)
        let z = size / 2 * Math.sin(angle)
        
        mesh.position.set(x, size / 2, z)
        mesh.rotation.x = Math.PI / 2 // horizontal
        mesh.rotation.z = Math.PI / 2 * (i % 2) // vertical
    }

    // Create bottom cylinders for edges
    for (let i = 0; i < 4; i++) {
        let geometry = new Three.CylinderGeometry(size / 20, size / 20, size, 32)
        let material = new Three.MeshStandardMaterial({ color })
        let mesh = new Three.Mesh(geometry, material)
        cube.add(mesh)

        // Position edges
        let angle = Math.PI / 2 * i
        let x = size / 2 * Math.cos(angle)
        let z = size / 2 * Math.sin(angle)
        
        mesh.position.set(x, - size / 2, z)
        mesh.rotation.x = Math.PI / 2 // horizontal
        mesh.rotation.z = Math.PI / 2 * (i % 2) // vertical
    }

    // Create side cylinders for edges
    for (let i = 0; i < 4; i++) {
        let geometry = new Three.CylinderGeometry(size / 20, size / 20, size, 32)
        let material = new Three.MeshStandardMaterial({ color })
        let mesh = new Three.Mesh(geometry, material)
        cube.add(mesh)

        // Position edges
        let angle = Math.PI / 2 * i
        let x = size / 2 * (Math.cos(angle) + Math.sin(angle))
        let z = size / 2 * (Math.sin(angle) - Math.cos(angle))
        
        mesh.position.set(x, 0, z)
    }

    return cube
}

function main() {
    const renderer = new Three.WebGLRenderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById("app").appendChild(renderer.domElement)

    const scene = new Three.Scene()
    scene.background = new Three.Color(0x212121)
    
    const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const controls = new OrbitControls(camera, renderer.domElement)

    setupLights(scene)
    
    const cubeA = createCube(1, 0x0000ff)
    const cubeB = createCube(0.6, 0xff0000)

    scene.add(cubeA)
    scene.add(cubeB)
    
    camera.position.z = 5

    function animate() {
        requestAnimationFrame(animate)
    
        cubeA.rotation.y -= 0.01 // Clockwise
        cubeB.rotation.y += 0.01 // Counter-clockwise
    
        controls.update()
        renderer.render(scene, camera)
    }
    
    animate()
}

main()
