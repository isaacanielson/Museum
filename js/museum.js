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



// Makes a box with given w,h,d,pos,and material
function make_wall(width, height, depth, position, material){
	wall = new THREE.BoxGeometry(width, height, depth);	
	var new_wall = new THREE.Mesh(wall, material);

	new_wall.translateOnAxis(x_axis, position.x);
	new_wall.translateOnAxis(y_axis, position.y);
	new_wall.translateOnAxis(z_axis, position.z);

	scene.add(new_wall);
}

function make_picture(position, picture, frame){
	make_wall(0.02, 7.5, 5.0, position, picture);
	var frame_position = position;
	frame_position.x -= 0.1;
	make_wall(0.05, 8.0, 5.5, frame_position, frame)
}

// Adds walls and pictures
var left_wall_material = new THREE.MeshBasicMaterial({color: 0xffffff});
var left_wall_position = new THREE.Vector3(-10.0, -5.0, 0.0);
make_wall(0.2, 20.0, 100.0, left_wall_position, left_wall_material);

var floor_material = new THREE.MeshBasicMaterial({color: 0xf0f0f0})
var floor_postion = new THREE.Vector3(0, -5, 0);
make_wall(50.0, 0.1, 100.0, floor_postion, floor_material);

var gold_frame = new THREE.MeshBasicMaterial({color:0xffd700});
var silver_frame = new THREE.MeshBasicMaterial({color:0xC0C0C0});
var red_frame = new THREE.MeshBasicMaterial({color:0xff0000});
var blue_frame = new THREE.MeshBasicMaterial({color:0x0000ff});

var figures_texture = new THREE.TextureLoader().load('art/figures.jpg');
var figures_material = new THREE.MeshBasicMaterial({map:figures_texture});
var figures_position = new THREE.Vector3(-9.8, 0, 0);

make_picture(figures_position, figures_material, gold_frame);

var misunderstood_texture = new THREE.TextureLoader().load('art/misunderstood.jpg');
var misunderstood_material = new THREE.MeshBasicMaterial({map:misunderstood_texture});
var misunderstood_position = new THREE.Vector3(-9.8, 0, 7.5);

make_picture(misunderstood_position, misunderstood_material, silver_frame);


var bach_texture = new THREE.TextureLoader().load('art/bach.jpg');
var bach_material = new THREE.MeshBasicMaterial({map:bach_texture});
var bach_position = new THREE.Vector3(-9.8, 0, 15.0);

make_picture(bach_position, bach_material, red_frame);

var needle_texture = new THREE.TextureLoader().load('art/needle.jpg');
var needle_material = new THREE.MeshBasicMaterial({map:needle_texture});
var needle_position = new THREE.Vector3(-9.8, 0, 22.5);

make_picture(needle_position, needle_material, blue_frame);



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