import * as THREE from 'three';
/* 
    const h = window.innerHeight;
    const w = window.innerWidth;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(74, w / h, 1, 1000);

    camera.position.z = 10;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 1);

    const shape = new THREE.BoxGeometry(2,2,2);
    const circleGeometry = new THREE.SphereGeometry(0.05);
    const material = new THREE.MeshBasicMaterial({
        color: 0XFFFFFF,
    });

    function getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }


    const circles = [];
    for(let i = 0; i < 2500; i++) {
        const x = getRandomArbitrary(-20, 20);
        const y = getRandomArbitrary(-10, 10);
        const z = getRandomArbitrary(0, 30);

        const c = new THREE.Mesh(circleGeometry, material);
        c.position.set(x, y, z);
        circles.push(c);
        scene.add(c);
    }

    document.getElementsByClassName('space-background').item(0)?.appendChild(renderer.domElement);

    function animate() {
        //requestAnimationFrame(animate);
        //camera.translateZ(0.01);
        //cube.translateZ(-0.1);
        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();
*/
export default function spaceBackground(component: Element) {
    const { innerHeight, innerWidth, } = window;
    const aspect = innerWidth / innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, aspect, 1, 1000);
    const starGeo = new THREE.BufferGeometry();
    const renderer = new THREE.WebGLRenderer();
    const sprite = new THREE.TextureLoader().load('/portfolio-web/star-dot.png');
    const starMaterial = new THREE.PointsMaterial({
        color: 0xAAAAAA,
        size: 0.7,
        map: sprite,
    });

    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    renderer.setSize(innerWidth, innerHeight);
    component.appendChild(renderer.domElement);

    const vertices = [];
    const velocity : Array<number> = [];
    let acceleration = 0.002;
    for(let i = 0; i < 6000; i++) {
        vertices.push(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        );
        velocity.push(0);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    const stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    animate();

    function animate() {
        const positionAttrs = starGeo.getAttribute('position');
        for(let i = 0; i < positionAttrs.count; i++) {
            let y = positionAttrs.getY(i);
            velocity[i] += acceleration;
            y -= velocity[i];
            if(y < -200) {
                y = 200;
                velocity[i] = 0;
            }
            positionAttrs.setY(i, y);
        }
        positionAttrs.needsUpdate = true;
        
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
}