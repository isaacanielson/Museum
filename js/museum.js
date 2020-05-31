var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var wall_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( [
	 2.0,  4.0,  2.0,
	 2.0, -4.0, -2.0,
	 2.0,  4.0, -2.0,

	 2.0, -4.0,  2.0,
	 2.0,  4.0,  2.0,
	 2.0, -4.0, -2.0
] );

wall_geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

var wall_material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
var plane = new THREE.Mesh(wall_geometry, wall_material);
//console.log(plane.vertices)
scene.add(plane)


var wall_geometry2 = new THREE.BufferGeometry();
var vertices2 = new Float32Array( [
	 -2.0,  4.0,  2.0,
	 -2.0, -4.0, -2.0,
	 -2.0,  4.0, -2.0,

	 -2.0, -4.0,  2.0,
	 -2.0,  4.0,  2.0,
	 -2.0, -4.0, -2.0
] );

wall_geometry2.setAttribute('position', new THREE.BufferAttribute(vertices2, 3));

var wall_material2 = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
var plane2 = new THREE.Mesh(wall_geometry2, wall_material2);
//console.log(plane.vertices)
scene.add(plane2)



camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
}

function moveCamera(event){
	console.log("moving camera");
	var keytype = event.code;
	alert("Pressed a key: " + keytype);
}

animate();