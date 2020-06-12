// Museum by Isaac Nielson
// Featuring works by Austin Overmoe
// THREE.js
// Floor texture from: www.textures4photoshop.com


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var x_axis = new THREE.Vector3(1, 0, 0);
var y_axis = new THREE.Vector3(0, 1, 0);
var z_axis = new THREE.Vector3(0, 0, 1);
var upVec = new THREE.Vector3(0, 1, 0);

rotate_left = new THREE.Euler(0, Math.PI/2, 0, 'XYZ');
rotate_right = new THREE.Euler(0, -Math.PI/2, 0, 'XYZ');


//var geometry = new THREE.BoxGeometry();
//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//var texture = new THREE.TextureLoader().load('art/figures.jpg');
//var material = new THREE.MeshBasicMaterial({map:texture});
//var cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

var wall_color = 0xffffff;


function add_plane(vertices, color=wall_color, side=THREE.DoubleSide){
	var wall_geometry = new THREE.BufferGeometry();

	var wall_material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});

	var plane = new THREE.Mesh(wall_geometry, wall_material);
	scene.add(plane)

}



// Makes a box with given w,h,d,pos,and material
function make_wall(width, height, depth, position, material){
	wall = new THREE.BoxGeometry(width, height, depth, 100, 100);	
	var new_wall = new THREE.Mesh(wall, material);

	new_wall.translateOnAxis(x_axis, position.x);
	new_wall.translateOnAxis(y_axis, position.y);
	new_wall.translateOnAxis(z_axis, position.z);

	scene.add(new_wall);
}

function make_picture(position, picture, frame, aspect_ratio){

	height = 7.5;
	width = height * aspect_ratio;
	make_wall(0.02, height, width, position, picture);
	var frame_position = position;
	frame_position.x -= 0.1;
	make_wall(0.05, height + 0.5, width + 0.5, frame_position, frame)
}

// Adds walls and pictures
var left_wall_material = new THREE.MeshBasicMaterial({color: 0xf0ead6});
var left_wall_position = new THREE.Vector3(-10.0, -5.0, 0.0);
make_wall(0.2, 20.0, 100.0, left_wall_position, left_wall_material);


var floor_texture = new THREE.TextureLoader().load('art/floor.jpg');
floor_texture.wrapS = THREE.MirroredRepeatWrapping;
floor_texture.wrapT = THREE.MirroredRepeatWrapping;
floor_texture.repeat.set(25,25);
var floor_material = new THREE.MeshBasicMaterial({map:floor_texture});
var floor_position = new THREE.Vector3(0, -5, 0);
make_wall(50.0, 0.1, 100.0, floor_position, floor_material);


var gold_frame = new THREE.MeshBasicMaterial({color:0xffd700});
var silver_frame = new THREE.MeshBasicMaterial({color:0xC0C0C0});
var red_frame = new THREE.MeshBasicMaterial({color:0xff0000});
var blue_frame = new THREE.MeshBasicMaterial({color:0x0000ff});
var black_frame = new THREE.MeshBasicMaterial({color:0x000000});


var figures_img = new Image();
figures_width = 0;
figures_height = 0;
figures_img.onload = function(){
	figures_width = this.width;
	figures_height = this.height;
	aspect_ratio = figures_width/figures_height;
	var figures_texture = new THREE.TextureLoader().load('art/figures.jpg');

	var figures_material = new THREE.MeshBasicMaterial({map:figures_texture});
	var figures_position = new THREE.Vector3(-9.8, 0, 0);
	make_picture(figures_position, figures_material, gold_frame, aspect_ratio);
}
figures_img.src = 'art/figures.jpg';
/*
var picture = {
	source: 'art/misunderstood.jpg';
	position: new THREE.Vector3(-9.8, 0, 7.5);
	load_picture :
}

function load_picture(){
	width = this.width;
	height = this.height;
	aspect_ratio = width/height;
	var texture = new THREE.TextureLoader().load(this.src);

	var material = new THREE.MeshBasicMaterial({map:texture});
	var position = new THREE.Vector3(-9.8, 0, 7.5);
	make_picture(position, material, black_frame, aspect_ratio);
}
*/
var misunderstood_img = new Image();
misunderstood_width = 0;
misunderstood_height = 0;
misunderstood_img.onload = function(){
	misunderstood_width = this.width;
	misunderstood_height = this.height;
	aspect_ratio = misunderstood_width/misunderstood_height;
	var misunderstood_texture = new THREE.TextureLoader().load('art/misunderstood.jpg');

	var misunderstood_material = new THREE.MeshBasicMaterial({map:misunderstood_texture});
	var misunderstood_position = new THREE.Vector3(-9.8, 0, 7.5);
	make_picture(misunderstood_position, misunderstood_material, black_frame, aspect_ratio);
}
misunderstood_img.src = 'art/misunderstood.jpg';

/*ar misunderstood_texture = new THREE.TextureLoader().load('art/misunderstood.jpg');
var misunderstood_material = new THREE.MeshBasicMaterial({map:misunderstood_texture});
var misunderstood_position = new THREE.Vector3(-9.8, 0, 7.5);

make_picture(misunderstood_position, misunderstood_material, black_frame, 1);
*/
/*
var mushroom_texture = new THREE.TextureLoader().load('art/mushroom.jpg');
var mushroom_material = new THREE.MeshBasicMaterial({map:mushroom_texture});
var mushroom_position = new THREE.Vector3(-9.8, 0, -10.0);

make_picture(mushroom_position, mushroom_material, black_frame);


var bach_texture = new THREE.TextureLoader().load('art/bach.jpg');
var bach_material = new THREE.MeshBasicMaterial({map:bach_texture});
var bach_position = new THREE.Vector3(-9.8, 0, 15.0);

make_picture(bach_position, bach_material, silver_frame);

var needle_texture = new THREE.TextureLoader().load('art/needle.jpg');
var needle_material = new THREE.MeshBasicMaterial({map:needle_texture});
var needle_position = new THREE.Vector3(-9.8, 0, 22.5);

make_picture(needle_position, needle_material, blue_frame);
*/


// Ceiling effect
ceiling_hedrons = [];
for (i = 0; i < 10; i++){
	for (j = 0; j < 10; j++){
		var hedron_geometry = new THREE.TetrahedronGeometry(1 + i%2, i%2);

		var hedron_material = new THREE.MeshBasicMaterial(0x00ff);

		var new_hedron = new THREE.Mesh(hedron_geometry, hedron_material);

		var hedron_position = new THREE.Vector3(-50 + i*10, 20, -50 + j*10);

		new_hedron.translateOnAxis(x_axis, hedron_position.x);
		new_hedron.translateOnAxis(y_axis, hedron_position.y);
		new_hedron.translateOnAxis(z_axis, hedron_position.z);

		ceiling_hedrons.push(new_hedron);
		scene.add(ceiling_hedrons[i*10 + j]);
	}
}


// Archway
archway_rings = [];
for (i = 0; i < 25; i++){
	var ring_geometry = new THREE.RingGeometry(6, 15, 8);
	var ring_color = new THREE.Color(0 + i * 1.0/25.0, 0 + i * 1.0/25.0, 0 + i * 1.0/50.0);
	var ring_material = new THREE.MeshBasicMaterial({color:ring_color, side: THREE.DoubleSide});
	var ring = new THREE.Mesh(ring_geometry, ring_material);


	var ring_position = new THREE.Vector3(10 + i * 2, 2, 10);

	ring.translateOnAxis(x_axis, ring_position.x);
	ring.translateOnAxis(y_axis, ring_position.y);
	ring.translateOnAxis(z_axis, ring_position.z);
	ring.rotateOnAxis(y_axis, Math.PI/2);
	archway_rings.push(ring);
	scene.add(archway_rings[i]);

}


//Dome (Currently only one-sided)
var points = [];
for ( var i = 0; i < 10; i ++ ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
var geometry = new THREE.LatheGeometry( points );
var material = new THREE.MeshBasicMaterial( { color: 0x808080 } );
var lathe = new THREE.Mesh( geometry, material );

lathe.translateOnAxis(x_axis, 100);
lathe.translateOnAxis(z_axis, 10);
lathe.translateOnAxis(y_axis, 30);
lathe.rotateOnAxis(x_axis, Math.PI);
lathe.side = THREE.DoubleSide;


scene.add( lathe );

//Lighting
/*
var sphere = new THREE.SphereBufferGeometry(0.5, 16, 8);

var light = new THREE.PointLight(0xff0000, 1, 100);
light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color:0xff0000})));
light.position.set(0, 2, 0);
light.castShadow = true;
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
scene.add(light);
*/





camera.position.z = 5;
time = 0.0;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	for (var i = ceiling_hedrons.length - 1; i >= 0; i--) {
		ceiling_hedrons[i].rotateOnAxis(x_axis, 0.01);
		ceiling_hedrons[i].rotateOnAxis(y_axis, 0.01);
		var red = Math.sin(time*i*0.1);
		var green = Math.cos(time*i*0.1);
		var blue = Math.sin(time*i*0.1);
		var color = new THREE.Color(red, green, blue);
		ceiling_hedrons[i].material.color = color;
	}

	for (j = archway_rings.length - 1; j >= 0; j--){
		if (j %2 == 0){
			archway_rings[j].rotation.z += 0.01;
		}
		else{
			archway_rings[j].rotation.z -= 0.01;
		}


	}

	time += 0.01

}


var w_pressed = false
var a_pressed = false
var s_pressed = false
var d_pressed = false


function move_forward(){
	var target = new THREE.Vector3();
	var lookVec = camera.getWorldDirection(target);  
	camera.position.x += lookVec.x;
	//camera.position.y += lookVec.y;
	camera.position.z += lookVec.z;
}

function move_backward(){
	var target = new THREE.Vector3();
	var lookVec = camera.getWorldDirection(target);  
	camera.position.x -= lookVec.x;
	//camera.position.y -= lookVec.y;
	camera.position.z -= lookVec.z;	
}

function move_left(){
	var target = new THREE.Vector3();
	var lookVec = camera.getWorldDirection(target);  
	left_movement = lookVec.applyEuler(rotate_left);
	camera.position.x += left_movement.x;
	//camera.position.y += left_movement.y;
	camera.position.z += left_movement.z;
}

function move_right(){
	var target = new THREE.Vector3();
	var lookVec = camera.getWorldDirection(target);  
	right_movement = lookVec.applyEuler(rotate_right);
	camera.position.x += right_movement.x;
	//camera.position.y += left_movement.y;
	camera.position.z += right_movement.z;
}
window.addEventListener('keypress', function(e){
	//console.log("key Pressed");
	var pressed_key = event.key;
	//console.log(event.key);

  

	//console.log(lookVec);
	switch(pressed_key){
		case 's':
			s_pressed = true;
			move_backward();
			break;
		case 'w':
			w_pressed = true;
			move_forward();
			break;
		case 'a':
			a_pressed = true;
			move_left();
			break;
		case 'd':
			d_pressed = true;
			move_right();
			break;
	}
	//console.log(event.x);
});

window.addEventListener('keyup', function(e){
	var pressed_key = event.key;
	switch (pressed_key){
		case 's':
			s_pressed = false;
		case 'w':
			w_pressed = false;
		case 'a':
			a_pressed = false;
		case 'd':
			d_pressed = false;

	}
})

window.addEventListener('mousemove', function(e){
	var horizontal_rot = event.movementX * -0.005;
	var vertical_rot = event.movementY * -0.005;

	// Horizontal rotation about up vector
	camera.rotateOnAxis(y_axis, horizontal_rot);

	// Vertical rotation about side vector
	camera.rotateOnAxis(x_axis, vertical_rot);
});


console.log("Start");
animate();