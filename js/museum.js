// Museum by Isaac Nielson
// Featuring works by Austin Overmoe and Adam Overmoe
// THREE.js
// Gold Plate from: https://officialpsds.com/gold-plate-psd-724n5j
// Helpful tutorials from https://threejsfundamentals.org/

import { VRButton } from './VRButton.js';

var upVec = new THREE.Vector3(0, 1, 0);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var scene = new THREE.Scene();

var rotate_left = new THREE.Euler(0, Math.PI/2, 0, 'XYZ');
var rotate_right = new THREE.Euler(0, -Math.PI/2, 0, 'XYZ');
var renderer;
var ceiling_hedrons;
var centerpiece;
var time = 0.0;
var archway_rings;
var centerpiece_light;
var centerpiece_light2;
var centerpiece_light3;
var tunnel_light;
var outer_light;
var sphere;
var walls = [];
var texts = [];
var pictures = [];
var black_frame = new THREE.MeshPhongMaterial({color:0x000000});
var centerpiece_child;

function init(){

	

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.shadowMap.enabled = true;
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.xr.enabled = true;
	document.body.appendChild( renderer.domElement );
	document.body.appendChild(VRButton.createButton(renderer));

	var wall_color = 0xffffff;


	// Adds walls and pictures to starting room
	var wall_y = 5.0;

	var left_wall_material = new THREE.MeshPhongMaterial({color: 0xffffff});
	var left_wall_position = new THREE.Vector3(-10.0, wall_y, 0.0);
	make_wall(0.2, 20.0, 100.0, left_wall_position, left_wall_material);

	var front_wall_position = new THREE.Vector3(0.0, wall_y, -50);
	make_wall(50.0, 20.0, 0.2, front_wall_position, left_wall_material);

	var right_wall_position = new THREE.Vector3(25.0, wall_y, -25.0);
	make_wall(0.2, 20.0, 50.0, right_wall_position, left_wall_material);

	var right_wall_position2 = new THREE.Vector3(25.0, wall_y, 35.0);
	make_wall(0.2, 20.0, 30.0, right_wall_position2, left_wall_material);

	var back_wall_position = new THREE.Vector3(0, wall_y, 50.0);
	make_wall(50.0, 20.0, 0.2, back_wall_position, left_wall_material)


	var floor_texture = new THREE.TextureLoader().load('resources/floor2.jpg');
	floor_texture.wrapS = THREE.MirroredRepeatWrapping;
	floor_texture.wrapT = THREE.MirroredRepeatWrapping;
	floor_texture.repeat.set(5, 5);
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
	var figures_plate_position = figures_position.clone();
	figures_plate_position.y -= 4.5;
 	make_plate("Red and yellow forms", "04/04/2020", figures_plate_position, Math.PI/2);


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



	// Observatory
	var observatory_y = 5.0;

	var observatory_floor_position = new THREE.Vector3(150, -5, 10);
	var observatory_floor = make_wall(150, 0.1, 150, observatory_floor_position, floor_material);
	observatory_floor.receiveShadow = true;
	for (i=0; i < 8; i++){
		var observatory_wall_position = new THREE.Vector3(200, observatory_y, 10);
		
		// Octagon
		// Center of wall is position
		// Width of 50
		// P2 = initial x + w/2 + sqrt((w/2)^2 / 2) 
		var half_wall_width = 25.0;
		var wall_offset = Math.sqrt(((half_wall_width) * (half_wall_width)) / 2.0);

		if (i < 3 && i > 0){
			observatory_wall_position.z += i * wall_offset + half_wall_width;
			observatory_wall_position.x -= i * wall_offset + half_wall_width * (i - 1);
		}
		else if (i == 3){
			observatory_wall_position.z += wall_offset + half_wall_width;
			observatory_wall_position.x -= 3 * wall_offset + half_wall_width * 2; 
		}

		else if (i > 5){
			observatory_wall_position.z -= (8 - i) * wall_offset + half_wall_width;
			observatory_wall_position.x -= (8 - i) * wall_offset + half_wall_width * ((8-i) - 1);
		}
		else if (i == 5){
			observatory_wall_position.z -= wall_offset + half_wall_width;
			observatory_wall_position.x -= 3 * wall_offset + half_wall_width * 2; 
		}

		make_wall(0.2, 50, 50, observatory_wall_position, left_wall_material, -Math.PI/4 * i);
	}

	var white_position = new THREE.Vector3(199.8, observatory_y, 0);
	var white = load_picture('art/2020_06_11_white_memorial_chapel.jpg', white_position, silver_frame, "x-");

	var akward_position = new THREE.Vector3(199.8, observatory_y, 15);
	var akward = load_picture('Designs/Designs/akward.jpeg', akward_position, silver_frame, "x-");
	


	// Ceiling effect
	ceiling_hedrons = [];
	for (var i = 0; i < 10; i++){
		for (var j = 0; j < 10; j++){
			var hedron_geometry = new THREE.TetrahedronGeometry(1 + i%2, i%2);

			var hedron_material = new THREE.MeshPhongMaterial(0x00ff);

			var new_hedron = new THREE.Mesh(hedron_geometry, hedron_material);

			var hedron_position = new THREE.Vector3(-50 + i*10, 20, -50 + j*10);

			new_hedron.translateX(hedron_position.x);
			new_hedron.translateY(hedron_position.y);
			new_hedron.translateZ(hedron_position.z);

			ceiling_hedrons.push(new_hedron);
			scene.add(ceiling_hedrons[i*10 + j]);
		}
	}


	// Centerpiece 
	var centerpiece_geometry = new THREE.TetrahedronGeometry(2, 1);
	var centerpiece_material = new THREE.MeshPhongMaterial(0xffffff);
	centerpiece = new THREE.Mesh(centerpiece_geometry, centerpiece_material);
	centerpiece.castShadow = true;
	var centerpiece_position = new THREE.Vector3(135, 5, 10);

	var centerpiece_child_geo = new THREE.TetrahedronGeometry(1, 0);
	centerpiece_child = new THREE.Mesh(centerpiece_child_geo, centerpiece_material);
	centerpiece_child.translateZ(5);
	centerpiece_child.castShadow = true;
	centerpiece.add(centerpiece_child);

	centerpiece.translateX(centerpiece_position.x);
	centerpiece.translateY(centerpiece_position.y);
	centerpiece.translateZ(centerpiece_position.z);




	scene.add(centerpiece);

	// Centerpiece lighting
	centerpiece_light = new THREE.PointLight(0xff0000, 1, 75);
	centerpiece_light.castShadow = true;
	centerpiece_light.position.set(centerpiece_position.x, 0, centerpiece_position.z);
	var centerpiece_light_helper = new THREE.PointLightHelper(centerpiece_light);
	scene.add(centerpiece_light);
	scene.add(centerpiece_light_helper);

	centerpiece_light2 = new THREE.PointLight(0x0000ff, 1, 75);
	centerpiece_light2.castShadow = true;
	centerpiece_light2.position.set(centerpiece_position.x, 0, centerpiece_position.z);
	var centerpiece_light_helper2 = new THREE.PointLightHelper(centerpiece_light2);
	scene.add(centerpiece_light2);
	scene.add(centerpiece_light_helper2);


	centerpiece_light3 = new THREE.PointLight(0x00ff00, 1, 75);
	centerpiece_light3.castShadow = true;
	centerpiece_light3.position.set(centerpiece_position.x, 0, centerpiece_position.z);
	var centerpiece_light_helper3 = new THREE.PointLightHelper(centerpiece_light3);
	scene.add(centerpiece_light3);
	scene.add(centerpiece_light_helper3);



	// Archway
	archway_rings = [];
	for (var i = 0; i < 25; i++){
		var ring_geometry = new THREE.RingGeometry(6, 15, 8);
		var ring_color = new THREE.Color(0 + i * 1.0/25.0, 0 + i * 1.0/25.0, 0 + i * 1.0/50.0);
		var ring_material = new THREE.MeshPhongMaterial({color:ring_color, side: THREE.DoubleSide});
		var ring = new THREE.Mesh(ring_geometry, ring_material);


		var ring_position = new THREE.Vector3(30 + i * 2, 2, 10);

		ring.translateX(ring_position.x);
		ring.translateY(ring_position.y);
		ring.translateZ(ring_position.z);
		ring.rotateY(Math.PI/2);
		console.log("rotatedy");
		archway_rings.push(ring);
		scene.add(archway_rings[i]);

	}


	//Dome (Currently only one-sided)
	var points = [];
	for ( var i = 0; i < 10; i ++ ) {
		points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
		points[i].x *= 4.75;
		points[i].y *= 4.75;
	}
	var geometry = new THREE.LatheGeometry( points );
	var material = new THREE.MeshPhongMaterial( { color: 0x808080 } );
	var lathe = new THREE.Mesh( geometry, left_wall_material );

	lathe.translateX(140);
	lathe.translateZ(10);
	lathe.translateY(60);
	lathe.rotateX(Math.PI);

	lathe.material.side = THREE.DoubleSide;
	//lathe.material.needsUpdate = true;


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

	tunnel_light = new THREE.PointLight(0xffffff, 1, 25);
	tunnel_light.position.set(50, -5, 10);
	scene.add(tunnel_light);
	var tunnel_helper = new THREE.PointLightHelper(tunnel_light);
	scene.add(tunnel_helper);


	outer_light = new THREE.PointLight(0xffffff, 1, 25);
	outer_light.position.set(50, 10, 10);
	scene.add(outer_light);
	var outer_helper = new THREE.PointLightHelper(outer_light);
	scene.add(outer_helper);
	var white_position = new THREE.Vector3(99.8, 3, 10);

	//console.log(pictures[0]);

	var sphere_geometry = new THREE.SphereGeometry(1, 3, 2);
	var sphere_material = new THREE.MeshPhongMaterial(0xffffff);
	sphere = new THREE.Mesh(sphere_geometry, sphere_material);
	var sphere_position = new THREE.Vector3(135, 100, 10);
	sphere.translateX(sphere_position.x);
	sphere.translateY(sphere_position.y);
	sphere.translateZ(sphere_position.z);

	scene.add(sphere);

	var observatory_spotlight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI/8);
	observatory_spotlight.position.set(centerpiece_position.x, 20, centerpiece_position.z);
	observatory_spotlight.target = sphere;

	scene.add(observatory_spotlight);


	camera.position.z = 5;
	var time = 0.0;

}

function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	//console.log("Needs resize:");
	//console.log(needResize);
	if (needResize) {
	  renderer.setSize(width, height, false);
	}
	return needResize;
}

function add_plane(vertices, color=wall_color, side=THREE.DoubleSide){
	var wall_geometry = new THREE.BufferGeometry();

	var wall_material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});

	var plane = new THREE.Mesh(wall_geometry, wall_material);
	scene.add(plane);

}


// Makes a box with given w,h,d,pos,and material
// Position is center of wall
function make_wall(width, height, depth, position, material, rotation=0){
	var wall = new THREE.BoxGeometry(width, height, depth, 100, 100);	
	var new_wall = new THREE.Mesh(wall, material);



	new_wall.translateX(position.x);
	new_wall.translateY(position.y);
	new_wall.translateZ(position.z);
	new_wall.rotateY(rotation);
	new_wall.receiveShadow = true;
	

	scene.add(new_wall);
	walls.push(new_wall);
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
// Loads a picture with a given source, position, frame, and orientation (i.e. "z+")
function load_picture(src, position, frame, orientation){
	var new_img = new Image();
	new_img.onload = function(){
		var width = this.width;
		var height = this.height;
		var aspect_ratio = width/height;
		var texture = new THREE.TextureLoader().load(this.src);

		var material = new THREE.MeshPhongMaterial({map:texture});
		//var position = new THREE.Vector3(-9.8, 0, 7.5);
		var pic = make_picture(position, material, frame, aspect_ratio, orientation);
		//console.log(pic);

		var spotLight = new THREE.SpotLight(0xffffff, 1, 10, Math.PI/4);
		if (orientation == "x+"){
			spotLight.position.set(pic.position.x + 2.5, pic.position.y + 7.5, pic.position.z);
		}
		else if (orientation == "x-"){
			spotLight.position.set(pic.position.x - 2.5, pic.position.y + 7.5, pic.position.z);
		}
		else if (orientation == "z+"){
			spotLight.position.set(pic.position.x, pic.position.y + 7.5, pic.position.z + 2.5);
		}
		else if (orientation == "z-"){
			spotLight.position.set(pic.position.x, pic.position.y + 7.5, pic.position.z - 2.5);
		}

		spotLight.target = pic;
		//console.log(spotLight.target);
		var spotLighthelper = new THREE.SpotLightHelper(spotLight);
		scene.add(spotLight);
		//scene.add(spotLighthelper);
		
	}
	new_img.src = src;

}


	// Text
	function make_text(text, size, height, position, material, rotation=0)
	{
		const loader = new THREE.FontLoader();
		function loadFont(url) {
	      return new Promise((resolve, reject) => {
	        loader.load(url, resolve, undefined, reject);
	      });
	    }

	    async function doit() {
	      const font = await loadFont('./fonts/helvetiker_regular.typeface.json');   
	      const geometry = new THREE.TextBufferGeometry(text, {
	        font: font,
	        size: size,
	        height: height,
	        curveSegments: 12,
	        bevelEnabled: false,
	        bevelThickness: 0.15,
	        bevelSize: .3,
	        bevelSegments: 5,
	      });

	 	

	 		var text_mesh = new THREE.Mesh(geometry, material);

	 		geometry.computeBoundingBox();
	 		geometry.boundingBox.getCenter(text_mesh.position).multiplyScalar(-1);
	 		const parent = new THREE.Object3D();
	 		parent.add(text_mesh);

	 		parent.translateX(position.x);
	 		parent.translateY(position.y);
	 		parent.translateZ(position.z);
	 		parent.rotateY(rotation);
	 		//parent.scale = new THREE.Vector3(0.5, 0.5, 0.5);

	 		//var scale = new THREE.Matrix4();
	 		//scale.makeScale(0.1, 0.1, 0.1);
	 		//geometry.computeBoundingBox();
	 		//parent.applyMatrix4(scale);
	 		//console.log(parent.scale);
	 		scene.add(parent);
	 		texts.push(parent);
	 		return parent;
	 	}
	 	doit();
 	}
 	// Makes a nameplate for a given piece
 	// TODO: Make Text Wrapping work for a given plate size
 	function make_plate(title, date, position, rotation=0){
		var plate_texture = new THREE.TextureLoader().load('resources/gold_plate.png');
		var plate_material = new THREE.MeshPhongMaterial({map:plate_texture});
		var plate = make_wall(2, 1, 0.05, position, plate_material, rotation);


		var title_pos = position.clone();
		title_pos.y += 0.2
		
		var date_pos = title_pos.clone();
		date_pos.y -= 0.4;
		make_text(title, 0.1, 0.1, title_pos, black_frame, rotation);
		make_text(date, 0.1, 0.1, date_pos, black_frame, rotation);
		//plate.add(texts[-1]);

	

 	}

function animate() {
	//requestAnimationFrame( animate );
	//renderer.render( scene, camera );


	renderer.setAnimationLoop(render)

}


function render(){


	if (resizeRendererToDisplaySize(renderer)) {
	    const canvas = renderer.domElement;
	    camera.aspect = canvas.clientWidth / canvas.clientHeight;
	    camera.updateProjectionMatrix();
	    console.log("resizing");
  	}

	for (var i = ceiling_hedrons.length - 1; i >= 0; i--) {
		ceiling_hedrons[i].rotateX(0.01);
		ceiling_hedrons[i].rotateY(0.01);
		var red = Math.sin(time*i*0.1);
		var green = Math.cos(time*i*0.1);
		var blue = Math.sin(time*i*0.1);
		var color = new THREE.Color(red, green, blue);
		ceiling_hedrons[i].material.color = color;
	}

	for (var j = archway_rings.length - 1; j >= 0; j--){
		if (j %2 == 0){
			archway_rings[j].rotation.z += 0.01;
		}
		else{
			archway_rings[j].rotation.z -= 0.01;
		}


	}

	centerpiece.rotateX(0.01);
	centerpiece.rotateZ(0.01);

	centerpiece_child.rotateX(-0.01);
	//console.log(centerpiece_light.position);

	//centerpiece_light.translateZ(0.1 * Math.cos(time));
	centerpiece_light.translateY(0.1 * Math.sin(time));
	centerpiece_light.translateZ(0.1 * Math.cos(time));



	centerpiece_light2.translateY(0.1 * Math.sin(time));
	centerpiece_light2.translateX(0.1 * Math.cos(time));

	centerpiece_light3.translateY(0.1 * Math.sin(time));
	centerpiece_light3.translateX(0.1 * Math.cos(time));
	centerpiece_light3.translateZ(0.1 * Math.cos(time));

	outer_light.translateX(0.1 * Math.sin(time));
	tunnel_light.translateX(0.1 * -Math.sin(time));


	sphere.translateX(0.1 * Math.sin(time));
	sphere.translateZ(0.1 * Math.cos(time));
	//sphere.translateOnAxis(y_axis, 0.1 * Math.cos(time));


	if (a_pressed){
		move_left();
	}
	if (d_pressed){
		move_right();
	}
	if (w_pressed){
		move_forward();
	}
	if (s_pressed){
		move_backward();
	}



	time += 0.01

	renderer.render( scene, camera );
}

var w_pressed = false;
var a_pressed = false;
var s_pressed = false;
var d_pressed = false;
var e_pressed = false;
var q_pressed = false;


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
	var left_movement = lookVec.applyEuler(rotate_left);
	camera.position.x += left_movement.x;
	//camera.position.y += left_movement.y;
	camera.position.z += left_movement.z;
}

function move_right(){
	var target = new THREE.Vector3();
	var lookVec = camera.getWorldDirection(target);  
	var right_movement = lookVec.applyEuler(rotate_right);
	camera.position.x += right_movement.x;
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
			camera.rotateZ(0.2);
		case 'e':
			e_pressed = true;
			camera.rotateZ(-0.1);
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
	var lookAtpoint = new THREE.Vector3();
	camera.position.clone(lookAtpoint);


	// Horizontal rotation about up vector
	camera.rotateX(vertical_rot);



	// Vertical rotation about side vector
	camera.rotateY(horizontal_rot);


	//Used to maintain orientation of the upVec
	camera.getWorldDirection(target);
	camera.lookAt(camera.position.x + target.x, camera.position.y + target.y, camera.position.z + target.z);

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
init();
animate();