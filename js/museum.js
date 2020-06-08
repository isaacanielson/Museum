// Museum by Isaac Nielson
// Featuring works by Austin Overmoe
// THREE.js
// Floor texture from: www.textures4photoshop.com


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var x_axis = new THREE.Vector3(1, 0, 0);
var y_axis = new THREE.Vector3(0, 1, 0);
var z_axis = new THREE.Vector3(0, 0, 1);
var upVec = new THREE.Vector3(0, 1, 0);



var geometry = new THREE.BoxGeometry();
//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var texture = new THREE.TextureLoader().load('art/figures.jpg');
var material = new THREE.MeshBasicMaterial({map:texture});
var cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

var wall_color = 0xffffff;


function add_plane(vertices, color=wall_color, side=THREE.DoubleSide){
	var wall_geometry = new THREE.BufferGeometry();


	//console.log("Vertices")
	//console.log(vertices);
	//wall_geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

	var wall_material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
	//var texture = new THREE.TextureLoader().load('art/figures.jpg');
	//var wall_material = new THREE.MeshBasicMaterial({map:texture, side: THREE.DoubleSide});

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

function make_picture(position, picture, frame){
	make_wall(0.02, 7.5, 5.0, position, picture);
	var frame_position = position;
	frame_position.x -= 0.1;
	make_wall(0.05, 8.0, 5.5, frame_position, frame)
}

// Adds walls and pictures
var left_wall_material = new THREE.MeshBasicMaterial({color: 0xf0ead6});
var left_wall_position = new THREE.Vector3(-10.0, -5.0, 0.0);
make_wall(0.2, 20.0, 100.0, left_wall_position, left_wall_material);


var floor_texture = new THREE.TextureLoader().load('art/floor.jpg');
floor_texture.wrapS = THREE.MirroredRepeatWrapping;
floor_texture.wrapT = THREE.MirroredRepeatWrapping;
texture.repeat.set(25,25);
var floor_material = new THREE.MeshBasicMaterial({map:floor_texture});
var floor_position = new THREE.Vector3(0, -5, 0);
make_wall(50.0, 0.1, 100.0, floor_position, floor_material);


var gold_frame = new THREE.MeshBasicMaterial({color:0xffd700});
var silver_frame = new THREE.MeshBasicMaterial({color:0xC0C0C0});
var red_frame = new THREE.MeshBasicMaterial({color:0xff0000});
var blue_frame = new THREE.MeshBasicMaterial({color:0x0000ff});
var black_frame = new THREE.MeshBasicMaterial({color:0x000000});

var figures_texture = new THREE.TextureLoader().load('art/figures.jpg');
var figures_material = new THREE.MeshBasicMaterial({map:figures_texture});
var figures_position = new THREE.Vector3(-9.8, 0, 0);

make_picture(figures_position, figures_material, gold_frame);

var misunderstood_texture = new THREE.TextureLoader().load('art/misunderstood.jpg');
var misunderstood_material = new THREE.MeshBasicMaterial({map:misunderstood_texture});
var misunderstood_position = new THREE.Vector3(-9.8, 0, 7.5);

make_picture(misunderstood_position, misunderstood_material, black_frame);

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



// Ceiling effect
ceiling_hedrons = [];
for (i = 0; i < 10; i++){
	for (j = 0; j < 10; j++){
		var hedron_geometry = new THREE.TetrahedronGeometry(1 + i%2, i%2);

		var hedron_material = new THREE.MeshBasicMaterial(0x00ff);

		var new_hedron = new THREE.Mesh(hedron_geometry, hedron_material);

		var hedron_position = new THREE.Vector3(-50 + i*10, 20, -50 + j*10);

		//console.log(hedron_position);

		new_hedron.translateOnAxis(x_axis, hedron_position.x);
		new_hedron.translateOnAxis(y_axis, hedron_position.y);
		new_hedron.translateOnAxis(z_axis, hedron_position.z);


		ceiling_hedrons.push(new_hedron);
		//console.log(ceiling_hedrons.length);
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

	console.log(ring_position);
	ring.translateOnAxis(x_axis, ring_position.x);
	ring.translateOnAxis(y_axis, ring_position.y);
	ring.translateOnAxis(z_axis, ring_position.z);
	ring.rotateOnAxis(y_axis, Math.PI/2);
	archway_rings.push(ring);
	scene.add(archway_rings[i]);

}


//Dome

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
//lathe.rotation.y += Math.PI;

scene.add( lathe );




camera.position.z = 5;
time = 0.0;

function animate() {
	requestAnimationFrame( animate );
	//console.log("In animate");
	renderer.render( scene, camera );
	//console.log(ceiling_hedrons[0].material.color);
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
		//archway_rings[j].rotateOnWorldAxis(z_axis, 0.01 * time);
		//archway_rings[j].rotateOnWorldAxis(y_axis, 0.01 * time);
		//archway_rings[j].rotateOnWorldAxis(x_axis, 0.01 * time);
		//console.log("Rotated archway_rings");
		//console.log(archway_rings[j]);
	
		//archway_rings[j].rotation.y += 0.01;
		if (j %2 == 0){
			archway_rings[j].rotation.z += 0.01;
		}
		else{
			archway_rings[j].rotation.z -= 0.01;
		}


	}
	//figures_position.z += 0.01
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;

	time += 0.01

}


window.addEventListener('keypress', function(e){
	//console.log("key Pressed");
	var pressed_key = event.key;
	//console.log(event.key);
	var target = new THREE.Vector3();
	var lookVec = camera.getWorldDirection(target);     


	rotate_left = new THREE.Euler(0, Math.PI/2, 0, 'XYZ');
	rotate_right = new THREE.Euler(0, -Math.PI/2, 0, 'XYZ');
	var left_movement;
	var right_movement;

	//console.log(lookVec);
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
	var horizontal_rot = event.movementX * -0.005;
	var vertical_rot = event.movementY * -0.005;

	// Horizontal rotation about up vector
	camera.rotateOnAxis(y_axis, horizontal_rot);

	// Vertical rotation about side vector
	camera.rotateOnAxis(x_axis, vertical_rot);
});

console.log("Start");
animate();