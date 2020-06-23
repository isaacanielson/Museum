// Museum by Isaac Nielson
// Featuring works by Austin Overmoe
// THREE.js
// Floor texture from: www.textures4photoshop.com
// Gold Plate from: https://officialpsds.com/gold-plate-psd-724n5j


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

var pictures = [];

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

	var wall_material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});

	var plane = new THREE.Mesh(wall_geometry, wall_material);
	scene.add(plane);

}



// Makes a box with given w,h,d,pos,and material
// Position is center of wall
function make_wall(width, height, depth, position, material){
	wall = new THREE.BoxGeometry(width, height, depth, 100, 100);	
	var new_wall = new THREE.Mesh(wall, material);

	new_wall.translateOnAxis(x_axis, position.x);
	new_wall.translateOnAxis(y_axis, position.y);
	new_wall.translateOnAxis(z_axis, position.z);

	scene.add(new_wall);
	return new_wall;
}

function make_picture(position, picture, frame, aspect_ratio, orientation){

	var height = 7.5;
	var width = height * aspect_ratio;
	var frame_position = position;
	var to_return;
	if (orientation == "x+"){
		to_return = make_wall(0.02, height, width, position, picture);
		frame_position.x -= 0.1;
		make_wall(0.05, height + 0.5, width + 0.5, frame_position, frame)
	}
	else if (orientation == "x-"){
		to_return = make_wall(0.02, height, width, position, picture);
		frame_position.x += 0.1;
		make_wall(0.05, height + 0.5, width + 0.5, frame_position, frame)
	}
	else if (orientation == "z+"){
		to_return = make_wall(width, height, 0.02, position, picture);
		frame_position.z -= 0.1;
		make_wall(width + 0.5, height + 0.5, 0.05, frame_position, frame);
	}
	else if (orientation == "z-"){
		to_return = make_wall(width, height, 0.02, position, picture);
		frame_position.z += 0.1;
		make_wall(width + 0.5, height + 0.5, 0.05, frame_position, frame);
	}
	return to_return;
}

function load_picture(src, position, frame, orientation){
	var new_img = new Image();
	new_img.onload = function(){
		width = this.width;
		height = this.height;
		aspect_ratio = width/height;
		var texture = new THREE.TextureLoader().load(this.src);

		var material = new THREE.MeshPhongMaterial({map:texture});
		//var position = new THREE.Vector3(-9.8, 0, 7.5);
		var pic = make_picture(position, material, frame, aspect_ratio, orientation);
		//console.log(pic);

		var spotLight = new THREE.SpotLight(0xffffff, 1, 10, Math.PI/4);
		if (orientation == "x+"){
			spotLight.position.set(pic.position.x + 5, pic.position.y + 0, pic.position.z);
		}
		else if (orientation == "x-"){
			spotLight.position.set(pic.position.x - 5, pic.position.y + 0, pic.position.z);
		}
		else if (orientation == "z+"){
			spotLight.position.set(pic.position.x, pic.position.y + 0, pic.position.z + 5);
		}
		else if (orientation == "z-"){
			spotLight.position.set(pic.position.x, pic.position.y + 0, pic.position.z - 5);
		}

		spotLight.target = pic;
		console.log(spotLight.target);
		spotLighthelper = new THREE.SpotLightHelper(spotLight);
		scene.add(spotLight);
		//scene.add(spotLighthelper);
		
	}
	new_img.src = src;

}

// Adds walls and pictures
var wall_y = 5.0;

var left_wall_material = new THREE.MeshPhongMaterial({color: 0xf0ead6});
var left_wall_position = new THREE.Vector3(-10.0, wall_y, 0.0);
make_wall(0.2, 20.0, 100.0, left_wall_position, left_wall_material);

var front_wall_position = new THREE.Vector3(0.0, wall_y, -50);
make_wall(50.0, 20.0, 0.2, front_wall_position, left_wall_material);

var right_wall_position = new THREE.Vector3(25.0, wall_y, -25.0);
make_wall(0.2, 20.0, 50.0, right_wall_position, left_wall_material);

var right_wall_position2 = new THREE.Vector3(25.0, wall_y, 35.0);
make_wall(.02, 20.0, 30.0, right_wall_position2, left_wall_material);

var back_wall_position = new THREE.Vector3(0, wall_y, 50.0);
make_wall(50.0, 20.0, 0.2, back_wall_position, left_wall_material)

var floor_texture = new THREE.TextureLoader().load('art/floor.jpg');
floor_texture.wrapS = THREE.MirroredRepeatWrapping;
floor_texture.wrapT = THREE.MirroredRepeatWrapping;
floor_texture.repeat.set(25,25);
var floor_material = new THREE.MeshPhongMaterial({map:floor_texture});
var floor_position = new THREE.Vector3(0, -5, 0);
make_wall(50.0, 0.1, 100.0, floor_position, floor_material);


var gold_frame = new THREE.MeshPhongMaterial({color:0xffd700});
var silver_frame = new THREE.MeshPhongMaterial({color:0xC0C0C0});
var red_frame = new THREE.MeshPhongMaterial({color:0xff0000});
var blue_frame = new THREE.MeshPhongMaterial({color:0x0000ff});
var black_frame = new THREE.MeshPhongMaterial({color:0x000000});



var figures_position = new THREE.Vector3(-9.8, 3, 0);
var figures = load_picture('art/figures.jpg', figures_position, gold_frame, "x+");

var misunderstood_position = new THREE.Vector3(-9.8, 3, 15.0);
var misunderstood = load_picture('art/misunderstood.jpg', misunderstood_position, black_frame, "x+");

var mushroom_position = new THREE.Vector3(-9.8, 3, -15.0);
var mushroom = load_picture('art/mushroom.jpg', mushroom_position, black_frame, "x+");

var needle_position = new THREE.Vector3(-9.8, 3, 30);
var needle = load_picture('art/needle.jpg', needle_position, blue_frame, "x+");

var slouched_position = new THREE.Vector3(-9.8, 3, -30);
var slouched = load_picture('art/slouched.jpg', slouched_position, red_frame, "x+");

var mask_position = new THREE.Vector3(0, 3, -49.8);
var mask = load_picture('art/mask.jpg', mask_position, black_frame, "z+");

var anatomy_position = new THREE.Vector3(15.0, 3, -49.8);
var anatomy = load_picture('art/anatomy.jpg', anatomy_position, black_frame, "z+");

var nude_position = new THREE.Vector3(24.8, 3, -30.0);
var nude = load_picture('art/nude.jpg', nude_position, black_frame, "x-");

var stretch_position = new THREE.Vector3(24.8, 3, -15.0);
var stretch = load_picture('art/stretch.jpg', stretch_position, black_frame, "x-");

var bach_position = new THREE.Vector3(24.8, 3, 35.0);
var bach = load_picture('art/bach.jpg', bach_position, black_frame, "x-");

var comic_position = new THREE.Vector3(0.0, 3, 49.8);
var comic = load_picture('art/comic.jpg', comic_position, black_frame, "z-");

var shapes_position = new THREE.Vector3(15.0, 3, 49.8);
var shapes = load_picture('art/shapes.jpg', shapes_position, blue_frame, "z-");

var plate_position = new THREE.Vector3(-9.7, -1.5, 0);
var plate_texture = new THREE.TextureLoader().load('resources/gold_plate.png');
var plate_material = new THREE.MeshPhongMaterial({map:plate_texture});
make_wall(0.05, 1, 2, plate_position, plate_material);


/*
var font_loader = new THREE.FontLoader();
var test_font = font_loader.load('fonts/ComicSansMedium.json', 
	//OnLoad Callback
	function (font){
		font_object = 
		{
			font: font,
			size: 80,
			height: 5,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 10,
			bevelSize: 8,
			bevelOffset: 0,
			bevelSegments: 5
		}
		var text = new THREE.TextGeometry("Hello World!", {
			font: font,
			size: 80,
			height: 5,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 10,
			bevelSize: 8,
			bevelOffset: 0,
			bevelSegments: 5
		});
		//var text_geo = new THREE.Geometry().fromGeometry(text);
		text.position = new THREE.Vector3(0, 0, 0);
		console.log(text);
		scene.add(text);
	});
*/
//scene.add(text);


// Ceiling effect
ceiling_hedrons = [];
for (i = 0; i < 10; i++){
	for (j = 0; j < 10; j++){
		var hedron_geometry = new THREE.TetrahedronGeometry(1 + i%2, i%2);

		var hedron_material = new THREE.MeshPhongMaterial(0x00ff);

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
	var ring_material = new THREE.MeshPhongMaterial({color:ring_color, side: THREE.DoubleSide});
	var ring = new THREE.Mesh(ring_geometry, ring_material);


	var ring_position = new THREE.Vector3(30 + i * 2, 2, 10);

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
var material = new THREE.MeshPhongMaterial( { color: 0x808080 } );
var lathe = new THREE.Mesh( geometry, material );

lathe.translateOnAxis(x_axis, 100);
lathe.translateOnAxis(z_axis, 10);
lathe.translateOnAxis(y_axis, 30);
lathe.rotateOnAxis(x_axis, Math.PI);
lathe.side = THREE.DoubleSide;


scene.add( lathe );

//Lighting

var light = new THREE.PointLight(0xffffff, 1, 25);
light.position.set(10, 10, 0);
scene.add(light);
var helper = new THREE.PointLightHelper(light);
scene.add(helper);
var light2 = new THREE.PointLight(0xffffff, 1, 50);
light2.position.set(10, 10, -30);
scene.add(light2);
var helper2 = new THREE.PointLightHelper(light2);
scene.add(helper2);

var light3 = new THREE.PointLight(0xffffff, 1, 50);
light3.position.set(10, 10, 30);
scene.add(light3);
var helper3 = new THREE.PointLightHelper(light3);
scene.add(helper3);

var tunnel_light = new THREE.PointLight(0xffffff, 1, 50);
tunnel_light.position.set(50, 5, 10);
scene.add(tunnel_light);
var tunnel_helper = new THREE.PointLightHelper(tunnel_light);
//scene.add(tunnel_helper);

console.log(pictures[0]);












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
		case 'q':
			q_pressed = true;
			camera.rotateOnAxis(z_axis, 0.2);
		case 'e':
			e_pressed = true;
			camera.rotateOnAxis(z_axis, -0.1);
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
	var target = new THREE.Vector3();



	camera.rotateOnAxis(x_axis, vertical_rot);


	// Horizontal rotation about up vector
	camera.rotateOnAxis(y_axis, horizontal_rot);

	// Vertical rotation about side vector
	//camera.getWorldDirection(target);
	//console.log("World direction:");
	//console.log(target);
	//target.cross(y_axis);

	//console.log("Side vector");
	//console.log(target);

});


window.addEventListener('wheel', function(e){
	var zoom_change = e.deltaY * -0.01;
	camera.zoom += zoom_change;
	if (camera.zoom < 1){
		camera.zoom = 1;
	}
	camera.updateProjectionMatrix();
})



console.log("Start");
animate();