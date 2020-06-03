var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );




var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//var texture = new THREE.TextureLoader().load('art/figures.jpg');
//var material = new THREE.MeshBasicMaterial({map:texture});
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

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



function make_wall(top_left, top_right, bottom_left, bottom_right){
	geometry = new THREE.BufferGeometry().setFromPoints([top_left, top_right, bottom_left, bottom_right]);

	//var iterator = 0;


/*
	// Triangle 1: TL, TR, BR
	total_length = 3;
	for (iterator = total_length; iterator < total_length; iterator++){
		wall[iterator] = top_left[0];
		wall[iterator+1] = top_left[1];
		wall[iterator+2] = top_left[2];
	}
	total_length += 3
	for (iterator = total_length; iterator < total_length; iterator++)
	{
		wall[iterator] = top_right[0];
		wall[iterator] = top_right[1];
		wall[iterator] = top_right[2];
	}
	total_length += 3
	for (iterator = total_length; iterator < total_length; iterator++)
	{
		wall[iterator] = bottom_right[0];
		wall[iterator] = bottom_right[1];
		wall[iterator] = bottom_right[2];
	}


	// Triangle 2: TL, BL, BR
	total_length += 3
	for (iterator = total_length; iterator < total_length; iterator++)
	{
		wall[iterator] = top_left[0];
		wall[iterator] = top_left[1];
		wall[iterator] = top_right[2];
	}


	total_length += 3
	for (iterator = total_length; iterator < total_length; iterator++)
	{
		wall[iterator] = bottom_left[0];
		wall[iterator] = bottom_left[1];
		wall[iterator] = bottom_left[2];
	}

	total_length += 3
	for (iterator = total_length; iterator < total_length; iterator++)
	{
		wall[iterator] = bottom_right[0],
		wall[iterator] = bottom_right[1],
		wall[iterator] = bottom_right[2]
	}
	*/
	console.log(wall);
	return wall;

}

/*top_left_lw = [-1.0, 4.0, 2.0];
top_right_lw = [1.0, 4.0, -2.0];
bottom_right_lw = [1.0, -4.0, -2.0];
bottom_left_lw = [1.0, -4.0, 2.0];

left_wall = make_wall(top_left_lw, top_right_lw, bottom_left_lw, bottom_right_lw);

top_left_rw = [1.0, 4.0, -2.0];
top_right_rw = [1.0, 4.0, 2.0];
bottom_left_rw = [1.0, -4.0, -2.0];
bottom_right_rw= [1.0, -4.0, 2.0];

right_wall = make_wall(top_left_rw, top_right_rw, bottom_left_rw, bottom_right_rw);
*/




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
	 -0.0,  5.0,  -4.0,
	 -0.0, -5.0, -4.0,
	 -0.0,  5.0, -4.0,

	 -0.0, 5.0,  -4.0,
	 -0.0,  5.0,  -4.0,
	 -0.0, -5.0, -4.0
] );


console.log("right_wall")
add_plane(right_wall);
console.log("left_wall")
add_plane(left_wall);
//console.log("back_wall")
add_plane(back_wall);




camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
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
			camera.position.y -= lookVec.y;
			camera.position.z -= lookVec.z;	
			break;
		case 'w':
			camera.position.x += lookVec.x;
			camera.position.y += lookVec.y;
			camera.position.z += lookVec.z;
			break;
		case 'a':
			left_movement = lookVec.applyEuler(rotate_left);
			camera.position.x += left_movement.x;
			camera.position.y += left_movement.y;
			camera.position.z += left_movement.z;
			break;
		case 'd':
			left_movement = lookVec.applyEuler(rotate_right);
			camera.position.x += left_movement.x;
			camera.position.y += left_movement.y;
			camera.position.z += left_movement.z;
			break;
	}
	//console.log(event.x);
});

animate();