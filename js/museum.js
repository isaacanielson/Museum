var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var x_axis = new THREE.Vector3(1, 0, 0);
var y_axis = new THREE.Vector3(0, 1, 0);
var z_axis = new THREE.Vector3(0, 0, 1);



var geometry = new THREE.BoxGeometry();
//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var texture = new THREE.TextureLoader().load('art/figures.jpg');
var material = new THREE.MeshBasicMaterial({map:texture});
var cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

var wall_color = 0xffffff;


function add_plane(vertices, color=wall_color, side=THREE.DoubleSide){
	var wall_geometry = new THREE.BufferGeometry();


	console.log("Vertices")
	console.log(vertices);
	wall_geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

	var wall_material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
	//var texture = new THREE.TextureLoader().load('art/figures.jpg');
	//var wall_material = new THREE.MeshBasicMaterial({map:texture, side: THREE.DoubleSide});

	var plane = new THREE.Mesh(wall_geometry, wall_material);
//console.log(plane.vertices)
	scene.add(plane)

}



function make_wall(width, height, depth, position, material){
	wall = new THREE.BoxBufferGeometry(width, height, depth, 1, 1, 1);
	console.log("Height:" + wall.parameters.height);


	console.log(position);
	
	//var material = new THREE.MeshBasicMaterial({color:0x00ff00});
	var new_wall = new THREE.Mesh(geometry, material);
	//new_wall.geometry.setAttribute("width", width);
	/*var x_axis = new THREE.Vector3(1,0,0);
	var y_axis = new THREE.Vector3(0,1,0);
	var z_axis = new THREE.Vector3(0,0,1);
	new_wall.translateOnAxis(x_axis, position.x);
	new_wall.translateOnAxis(y_axis, position.y);
	new_wall.translateOnAxis(z_axis, position.z);
	console.log("New position:")
	*/
	console.log(new_wall.position);
	new_wall.geometry.parameters.width = width;
	new_wall.geometry.parameters.height = height;
	new_wall.geometry.parameters.depth = depth;
	new_wall.updateMatrix();

	console.log("Height:" + new_wall.geometry.parameters.height);



	scene.add(new_wall);
	//wall = new THREE.BufferGeometry().setFromPoints([top_left, top_right, bottom_left, bottom_right]);

}

var left_wall_material = new THREE.MeshBasicMaterial({color:0x0000ff});
var left_wall_position = new THREE.Vector3(-2.0, -3.0, 2.0);
make_wall(1.0, 24.0, 4.0, left_wall_position, left_wall_material);


var left_wall = new Float32Array( [
	 -2.0,  4.0,  2.0,
	 -2.0, -4.0, -2.0,
	 -2.0,  4.0, -2.0,

	 -2.0, -4.0,  2.0,
	 -2.0,  4.0,  2.0,
	 -2.0, -4.0, -2.0
] );


var right_wall= new Float32Array( [
	 2.0,  4.0,  2.0,
	 2.0, -4.0, -2.0,
	 2.0,  4.0, -2.0,

	 2.0, -4.0,  2.0,
	 2.0,  4.0,  2.0,
	 2.0, -4.0, -2.0
] );







var back_wall = new Float32Array( [
	 3.0,  5.0,  -6.0,
	 3.0, -5.0, -6.0,
	-3.0,  5.0, -6.0,

	-3.0, 5.0,  -6.0,
	-3.0, -5.0,  -6.0,
	 3.0, -5.0, -6.0
] );


console.log("right_wall")
add_plane(right_wall);
//console.log("left_wall")
//add_plane(left_wall);
console.log("back_wall")
add_plane(back_wall);




camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
}



window.addEventListener('mousemove', function(e){
	//console.log("Mouse moved");
	//console.log(event.x);
});



window.addEventListener('keypress', function(e){
	console.log("key Pressed");
	var pressed_key = event.key;
	console.log(event.key);
	var target = THREE.Vector3();
	var lookVec = camera.getWorldDirection(target);
	var upVec = THREE.Vector3(0, 1, 0);

	rotate_left = new THREE.Euler(0, Math.PI/2, 0, 'XYZ');
	rotate_right = new THREE.Euler(0, -Math.PI/2, 0, 'XYZ');
	var left_movement;
	var right_movement;

	console.log(lookVec);
	switch(pressed_key){
		case 's':
			camera.position.x -= lookVec.x;
			//camera.position.y -= lookVec.y;
			camera.position.z -= lookVec.z;	
			break;
		case 'w':
			camera.position.x += lookVec.x;
			//camera.position.y += lookVec.y;
			camera.position.z += lookVec.z;
			break;
		case 'a':
			left_movement = lookVec.applyEuler(rotate_left);
			camera.position.x += left_movement.x;
			//camera.position.y += left_movement.y;
			camera.position.z += left_movement.z;
			break;
		case 'd':
			left_movement = lookVec.applyEuler(rotate_right);
			camera.position.x += left_movement.x;
			//camera.position.y += left_movement.y;
			camera.position.z += left_movement.z;
			break;
	}
	//console.log(event.x);
});

window.addEventListener('mousemove', function(e){
	var horizontal_rot = event.movementX * -0.02;
	var vertical_rot = event.movementY * -0.02;

	// Horizontal rotation about up vector
	camera.rotateOnAxis(y_axis, horizontal_rot);

	// Vertical rotation about side vector
	camera.rotateOnAxis(x_axis, vertical_rot);
});

animate();