// Museum by Isaac Nielson
// Featuring works by Austin Overmoe and Adam Overmoe
// THREE.js
// Gold Plate from: https://officialpsds.com/gold-plate-psd-724n5j
// Helpful tutorials from https://threejsfundamentals.org/

import { VRButton } from './VRButton.js';
//import * as THREE from './three.js';
import { BufferGeometryUtils } from './three/examples/jsm/utils/BufferGeometryUtils.js';
//import { XRControllerModelFactory} from './XRControllerModelFactory.js'

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var scene = new THREE.Scene();


var rotate_left = new THREE.Euler(0, Math.PI/2, 0, 'XYZ');
var rotate_right = new THREE.Euler(0, -Math.PI/2, 0, 'XYZ');
var x_axis = new THREE.Vector3(1, 0, 0);
var y_axis = new THREE.Vector3(0, 1, 0);
var z_axis = new THREE.Vector3(0, 0, 1);
var time = 0.0;
var wall_timer = 0.0;
var renderer, ceiling_hedrons, centerpiece, archway_rings, sphere, centerpiece_child;
var centerpiece_light, centerpiece_light2, centerpiece_light3, tunnel_light, outer_light;
var walls = [];
var texts = [];
var pictures = [];
var wall_tetras = [];
var wall_tetras_width, wall_tetras_height;
var black_frame = new THREE.MeshPhongMaterial({color:0x000000});
var add_light = true;
var tetra_light, tetra_light_pos;

var w_pressed = false;
var a_pressed = false;
var s_pressed = false;
var d_pressed = false;

var original_rotation = new THREE.Euler();
var lookAtpoint = new THREE.Vector3();

var benches = [];
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var target = new THREE.Vector3();
var intersecting_bench = false;
var bench_to_sit_on;
var sitting = false;
var vid_playing = false;
//var controller1, controller2;

var wall_tetra_curve = new THREE.SplineCurve([
	new THREE.Vector2(0, 0),
	new THREE.Vector2(10, 3),
	new THREE.Vector2(20, 7),
	new THREE.Vector2(30, 15),
	new THREE.Vector2(40, 20)
	]);

var curve_points = wall_tetra_curve.getPoints(50);
var tetra_wall_original_z = -50;

function init(){

	

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.shadowMap.enabled = true;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.xr.enabled = true;
	document.body.appendChild( renderer.domElement );
	document.body.appendChild(VRButton.createButton(renderer));

	let wall_color = 0xffffff;


	// Adds walls and pictures to starting room
	let wall_y = 5.0;

	let left_wall_material = new THREE.MeshPhongMaterial({color: 0xffffff});
	let left_wall_position = new THREE.Vector3(-10.0, wall_y, 0.0);
	make_wall(0.2, 20.0, 100.0, left_wall_position, left_wall_material);

	let front_wall_position = new THREE.Vector3(0.0, wall_y, -50);
	make_wall(50.0, 20.0, 0.2, front_wall_position, left_wall_material);

	let right_wall_position = new THREE.Vector3(25.0, wall_y, -25.0);
	make_wall(0.2, 20.0, 50.0, right_wall_position, left_wall_material);

	let right_wall_position2 = new THREE.Vector3(25.0, wall_y, 35.0);
	make_wall(0.2, 20.0, 30.0, right_wall_position2, left_wall_material);

	let back_wall_position = new THREE.Vector3(0, wall_y, 50.0);
	make_wall(50.0, 20.0, 0.2, back_wall_position, left_wall_material)


	let floor_texture = new THREE.TextureLoader().load('resources/floor2.jpg');
	floor_texture.wrapS = THREE.MirroredRepeatWrapping;
	floor_texture.wrapT = THREE.MirroredRepeatWrapping;
	floor_texture.repeat.set(5, 5);
	let floor_material = new THREE.MeshPhongMaterial({map:floor_texture});
	let floor_position = new THREE.Vector3(0, -5, 0);
	make_wall(50.0, 0.1, 100.0, floor_position, floor_material);




	let gold_frame = new THREE.MeshPhongMaterial({color:0xffd700});
	let silver_frame = new THREE.MeshPhongMaterial({color:0xC0C0C0});
	let red_frame = new THREE.MeshPhongMaterial({color:0xff0000});
	let blue_frame = new THREE.MeshPhongMaterial({color:0x0000ff});
	let black_frame = new THREE.MeshPhongMaterial({color:0x000000});



	let figures_position = new THREE.Vector3(-9.8, 3, 0);
	let figures = load_picture('art/2020_04_04_red_and_yellow_forms.jpg', figures_position, gold_frame, 0);
	let figures_plate_position = figures_position.clone();
	figures_plate_position.y -= 4.5;
 	make_plate("2020_04_04_red_and_yellow_forms", figures_plate_position, Math.PI/2);


	let misunderstood_position = new THREE.Vector3(-9.8, 3, 15.0);
	let misunderstood = load_picture('art/2020_04_04_a_misunderstood_creature.jpg', misunderstood_position, black_frame, 0);
	let misunderstood_plate_position = misunderstood_position.clone();
	misunderstood_plate_position.y -= 4.5;
 	make_plate("2020_04_04_a_misunderstood_creature", misunderstood_plate_position, Math.PI/2);

	let mushroom_position = new THREE.Vector3(-9.8, 3, -15.0);
	let mushroom = load_picture('art/2020_04_04_rhodotus_palmatus.jpg', mushroom_position, black_frame, 0);
	let mushroom_plate_position = mushroom_position.clone();
	mushroom_plate_position.y -= 4.5;
 	make_plate("2020_04_04_rhodotus_palmatus", mushroom_plate_position, Math.PI/2);


	let needle_position = new THREE.Vector3(-9.8, 3, 30);
	let needle = load_picture('art/2020_04_04_big_ass_needle.jpg', needle_position, blue_frame, 0);
	let needle_plate_position = needle_position.clone();
	needle_plate_position.y -= 4.5;
 	make_plate("2020_04_04_big_ass_needle", needle_plate_position, Math.PI/2);


	let slouched_position = new THREE.Vector3(-9.8, 3, -30);
	let slouched = load_picture('art/2020_04_04_reclining_female_nude.jpg', slouched_position, red_frame, 0);
	let slouched_plate_position = slouched_position.clone();
	slouched_plate_position.y -= 4.5;
 	make_plate("2020_04_04_reclining_female_nude", slouched_plate_position, Math.PI/2);


	let mask_position = new THREE.Vector3(0, 3, -49.8);
	let mask = load_picture('art/2020_04_04_no_one_cares.jpg', mask_position, black_frame, -Math.PI/2);
	let mask_plate_position = mask_position.clone();
	mask_plate_position.x += 4.5;
 	make_plate("2020_04_04_no_one_cares", mask_plate_position, 0);

	let anatomy_position = new THREE.Vector3(15.0, 3, -49.8);
	let anatomy = load_picture('art/2020_04_04_skeletal_study.jpg', anatomy_position, black_frame, -Math.PI/2);
	let anatomy_plate_position = anatomy_position.clone();
	anatomy_plate_position.x -= 4.5;
 	make_plate("2020_04_04_skeletal_study", anatomy_plate_position, 0);


	let nude_position = new THREE.Vector3(24.8, 3, -30.0);
	let nude = load_picture('art/2020_04_04_seated_female_nude.jpg', nude_position, black_frame, Math.PI);
	let nude_plate_position = nude_position.clone();
	nude_plate_position.z -= 4.5;
 	make_plate("2020_04_04_seated_female_nude", nude_plate_position, -Math.PI/2);


	let stretch_position = new THREE.Vector3(24.8, 3, -15.0);
	let stretch = load_picture('art/2020_04_01_standing_male_nude.jpg', stretch_position, black_frame, Math.PI);
	let stretch_plate_position = stretch_position.clone();
	stretch_plate_position.z += 4.5;
 	make_plate("2020_04_01_standing_male_nude", stretch_plate_position, -Math.PI/2);


	let bach_position = new THREE.Vector3(24.8, 3, 35.0);
	let bach = load_picture('art/2020_04_01_bach_to_a_punkrocker.jpg', bach_position, black_frame, Math.PI);
	let bach_plate_position = bach_position.clone();
	bach_plate_position.z -= 4.5;
 	make_plate("2020_04_01_bach_to_a_punkrocker", bach_plate_position, -Math.PI/2);


	let comic_position = new THREE.Vector3(0.0, 3, 49.8);
	let comic = load_picture('art/2020_04_04_abandon_ship.jpg', comic_position, black_frame, Math.PI/2);
	let comic_plate_position = comic_position.clone();
	comic_plate_position.x += 4.5;
 	make_plate("2020_04_04_abandon_ship", comic_plate_position, Math.PI);


	let shapes_position = new THREE.Vector3(15.0, 3, 49.8);
	let shapes = load_picture('art/2020_04_01_geometric_shading_studies.jpg', shapes_position, blue_frame, Math.PI/2);
	let shapes_plate_position = shapes_position.clone();
	shapes_plate_position.x -= 4.5;
 	make_plate("2020_04_01_geometric_shading_studies", shapes_plate_position, Math.PI);


	// Observatory
	let observatory_y = 5.0;

	let observatory_floor_position = new THREE.Vector3(150, -5, 10);
	let observatory_floor = make_wall(150, 0.1, 120, observatory_floor_position, floor_material);
	observatory_floor.receiveShadow = true;
	var i;
	for (i=0; i < 8; i++){
		let observatory_wall_position = new THREE.Vector3(200, observatory_y, 10);
		
		// Octagon
		// Center of wall is position
		// Width of 50
		// P2 = initial x + w/2 + sqrt((w/2)^2 / 2) 
		let half_wall_width = 25.0;
		let wall_offset = Math.sqrt(((half_wall_width) * (half_wall_width)) / 2.0);

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
		if (i != 6 && i != 0 && i != 4){
			make_wall(0.2, 50, 50, observatory_wall_position, left_wall_material, -Math.PI/4 * i);
		}
	}

	let observatory_wall_position = new THREE.Vector3(200, 20, 10);
	//var vid = document.createElement('skull_video');
	//vid.src = "art/2020_04_06_exploding_skull.mp4";
	var video = document.getElementById("skull");
	
	
	var vid_texture = new THREE.VideoTexture(video);
	vid_texture.minFilter = THREE.LinearFilter;
	vid_texture.magFilter = THREE.LinearFilter;

	let vid_material = new THREE.MeshPhongMaterial({map:vid_texture});
	let vid_wall = make_wall(0.2, 50, 50, observatory_wall_position, vid_material, 0);

	/*
	let white_position = new THREE.Vector3(199.8, observatory_y, 0);
	let white = load_picture('art/2020_06_11_white_memorial_chapel.jpg', white_position, silver_frame, Math.PI);

	let akward_position = new THREE.Vector3(199.8, observatory_y, 15);
	let akward = load_picture('Designs/Designs/akward.jpeg', akward_position, silver_frame, Math.PI);
	*/


	// Ceiling effect
	ceiling_hedrons = [];
	for (let i = 0; i < 10; i++){
		for (let j = 0; j < 10; j++){
			let hedron_geometry = new THREE.TetrahedronBufferGeometry(1 + i%2, i%2);

			let hedron_material = new THREE.MeshPhongMaterial(0x00ff);

			let new_hedron = new THREE.Mesh(hedron_geometry, hedron_material);

			let hedron_position = new THREE.Vector3(-50 + i*10, 20, -50 + j*10);

			new_hedron.translateX(hedron_position.x);
			new_hedron.translateY(hedron_position.y);
			new_hedron.translateZ(hedron_position.z);

			ceiling_hedrons.push(new_hedron);
			scene.add(ceiling_hedrons[i*10 + j]);
		}
	}


	// Centerpiece

	let centerpiece_position = new THREE.Vector3(135, 5, 10); 
	
	let centerpiece_geometry = new THREE.TetrahedronBufferGeometry(2, 1);
	let centerpiece_material = new THREE.MeshPhongMaterial(0xffffff);
	centerpiece = new THREE.Mesh(centerpiece_geometry, centerpiece_material);
	//centerpiece.castShadow = true;
	

	let centerpiece_child_geo = new THREE.TetrahedronBufferGeometry(1, 0);
	centerpiece_child = new THREE.Mesh(centerpiece_child_geo, centerpiece_material);
	centerpiece_child.translateZ(5);
	//centerpiece_child.castShadow = true;
	centerpiece.add(centerpiece_child);

	centerpiece.translateX(centerpiece_position.x);
	centerpiece.translateY(centerpiece_position.y);
	centerpiece.translateZ(centerpiece_position.z);




	scene.add(centerpiece);
	
	// Centerpiece lighting
	centerpiece_light = new THREE.PointLight(0xff0000, 1, 75);
	centerpiece_light.castShadow = true;
	centerpiece_light.position.set(centerpiece_position.x, 0, centerpiece_position.z);
	let centerpiece_light_helper = new THREE.PointLightHelper(centerpiece_light);
	scene.add(centerpiece_light);
	scene.add(centerpiece_light_helper);

	centerpiece_light2 = new THREE.PointLight(0x0000ff, 1, 75);
	centerpiece_light2.castShadow = true;
	centerpiece_light2.position.set(centerpiece_position.x, 0, centerpiece_position.z);
	let centerpiece_light_helper2 = new THREE.PointLightHelper(centerpiece_light2);
	scene.add(centerpiece_light2);
	scene.add(centerpiece_light_helper2);


	centerpiece_light3 = new THREE.PointLight(0x00ff00, 1, 75);
	centerpiece_light3.castShadow = true;
	centerpiece_light3.position.set(centerpiece_position.x, 0, centerpiece_position.z);
	let centerpiece_light_helper3 = new THREE.PointLightHelper(centerpiece_light3);
	scene.add(centerpiece_light3);
	scene.add(centerpiece_light_helper3);
	



	// Archway
	archway_rings = [];
	for (let i = 0; i < 25; i++){
		let ring_geometry = new THREE.RingBufferGeometry(6, 15, 8);
		let ring_color = new THREE.Color(0 + i * 1.0/25.0, 0 + i * 1.0/25.0, 0 + i * 1.0/50.0);
		let ring_material = new THREE.MeshPhongMaterial({color:ring_color, side: THREE.DoubleSide});
		let ring = new THREE.Mesh(ring_geometry, ring_material);


		let ring_position = new THREE.Vector3(30 + i * 2, 2, 10);

		ring.translateX(ring_position.x);
		ring.translateY(ring_position.y);
		ring.translateZ(ring_position.z);
		ring.rotateY(Math.PI/2);
		archway_rings.push(ring);
		scene.add(archway_rings[i]);

	}


	//Dome
	let points = [];
	for ( let i = 0; i < 10; i ++ ) {
		points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
		points[i].x *= 4.75;
		points[i].y *= 4.75;
	}
	let geometry = new THREE.LatheBufferGeometry( points );
	let material = new THREE.MeshPhongMaterial( { color: 0x808080 } );
	let lathe = new THREE.Mesh( geometry, left_wall_material );
	let lathe_position = new THREE.Vector3(140, 65, 10);

	lathe.translateX(lathe_position.x);
	lathe.translateY(lathe_position.y);
	lathe.translateZ(lathe_position.z);
	lathe.rotateX(Math.PI);

	lathe.material.side = THREE.DoubleSide;

	scene.add( lathe );


	//Lighting

	let light = new THREE.PointLight(0xffffff, 1, 25);
	light.position.set(10, 10, 0);
	scene.add(light);
	let helper = new THREE.PointLightHelper(light);
	//scene.add(helper);
	let light2 = new THREE.PointLight(0xffffff, 1, 50);
	light2.position.set(10, 10, -30);
	scene.add(light2);
	let helper2 = new THREE.PointLightHelper(light2);
	//scene.add(helper2);

	let light3 = new THREE.PointLight(0xffffff, 1, 50);
	light3.position.set(10, 10, 30);
	scene.add(light3);
	let helper3 = new THREE.PointLightHelper(light3);
	//scene.add(helper3);

	tunnel_light = new THREE.PointLight(0xffffff, 1, 25);
	tunnel_light.position.set(25, -5, 10);
	scene.add(tunnel_light);
	let tunnel_helper = new THREE.PointLightHelper(tunnel_light);
	//scene.add(tunnel_helper);


	outer_light = new THREE.PointLight(0xffffff, 1, 25);
	outer_light.position.set(50, 10, 10);
	scene.add(outer_light);
	let outer_helper = new THREE.PointLightHelper(outer_light);
	//scene.add(outer_helper);


	let sphere_geometry = new THREE.SphereBufferGeometry(1, 3, 2);
	let sphere_material = new THREE.MeshPhongMaterial(0xffffff);
	sphere = new THREE.Mesh(sphere_geometry, sphere_material);
	let sphere_position = new THREE.Vector3(135, 100, 10);
	sphere.translateX(sphere_position.x);
	sphere.translateY(sphere_position.y);
	sphere.translateZ(sphere_position.z);

	scene.add(sphere);

	let observatory_spotlight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI/4);
	observatory_spotlight.position.set(centerpiece_position.x, 50, centerpiece_position.z);
	observatory_spotlight.target = sphere;


	scene.add(observatory_spotlight);


	// Folding wall made of tetrahedrons
	wall_tetras_height = 23;
	wall_tetras_width = 67;
	for (let i = 0; i < wall_tetras_width; i++){
		for (let j = 0; j < wall_tetras_height; j++){
			let tetra_geometry = new THREE.TetrahedronBufferGeometry(1, 0);
			let tetra_material = new THREE.MeshPhongMaterial(0xffffff);
			let tetra = new THREE.Mesh(tetra_geometry, tetra_material);

			let tetra_position = new THREE.Vector3(113 + i * 0.8, -4 + j * 1.5, tetra_wall_original_z);
			tetra.translateX(tetra_position.x);
			tetra.translateY(tetra_position.y);
			tetra.translateZ(tetra_position.z);

			if (i % 2 == 0){
				tetra.translateY(-0.5);
				tetra.rotateZ(Math.PI/3);

			}			

			tetra.rotateX(Math.PI/6);
			tetra.rotateY(Math.PI/4);

			//tetra.lookAt(tetra_position.x, tetra_position.y, tetra_position.z + 1);

			scene.add(tetra);
			wall_tetras.push(tetra);

		}
	}

	// Hallway
	let hallway_floor_position = new THREE.Vector3(140, -5, -300);
	let hallway_floor = make_wall(50, 0.1, 500, hallway_floor_position, floor_material);

	let hallway_left_wall_position = new THREE.Vector3(114.5, 0, -300.3);
	let hallway_left_wall = make_wall(0.1, 30, 500, hallway_left_wall_position, left_wall_material);

	let hallway_right_wall_position = new THREE.Vector3(164.5, 0, -300.3);
	let hallway_right_wall = make_wall(0.1, 30, 500, hallway_right_wall_position, left_wall_material);

	let hallway_light = new THREE.PointLight(0xffffff, 1, 50);
	let hallway_light_position = new THREE.Vector3(135, 7, -100);
	hallway_light.translateX(hallway_light_position.x);
	hallway_light.translateY(hallway_light_position.y);
	hallway_light.translateZ(hallway_light_position.z);

	let hallway_light2 = new THREE.PointLight(0xffffff, 1, 50);
	let hallway_light2_position = new THREE.Vector3(135, 7, -50);
	hallway_light2.translateX(hallway_light2_position.x);
	hallway_light2.translateY(hallway_light2_position.y);
	hallway_light2.translateZ(hallway_light2_position.z);
	scene.add(hallway_light2);



	// Example lamp

	//let lamp_position = new THREE.Vector3(-9.8, 7.5, 0);
	//make_lamp(lamp_position);

	// Example bench
	//let bench_position = new THREE.Vector3(0, -2, -40);
	//make_bench(bench_position, 5);


	camera.position.z = 5;
	time = 0.0;

}

function make_bench(position, width=5, rotation=0){
	let bench_geometries = [];
	let bench_material = new THREE.MeshPhongMaterial(0xffffff);

	let bench_top_geo = new THREE.BoxBufferGeometry(width, 0.5, 2, 2, 2);
	let bench_top = new THREE.Mesh(bench_top_geo, bench_material);

	let bench_left_leg_geo = new THREE.BoxBufferGeometry(0.5, 4, 0.5, 2, 2);
	bench_left_leg_geo.translate(-width/3, -2, 0);
	let bench_left_leg = new THREE.Mesh(bench_left_leg_geo, bench_material);

	let bench_right_leg_geo = new THREE.BoxBufferGeometry(0.5, 4, 0.5, 2, 2);
	bench_right_leg_geo.translate(width/3, -2, 0);
	let bench_right_leg = new THREE.Mesh(bench_right_leg_geo, bench_material);

	bench_geometries.push(bench_top_geo);
	bench_geometries.push(bench_right_leg_geo);
	bench_geometries.push(bench_left_leg_geo);
	let bench_geo = BufferGeometryUtils.mergeBufferGeometries(bench_geometries);

	let bench = new THREE.Mesh(bench_geo, bench_material);

	bench.translateX(position.x);
	bench.translateY(position.y);
	bench.translateZ(position.z);
	bench.rotateY(rotation);
	benches.push(bench);
	scene.add(bench);
}

function CustomLampCurve(scale){
	THREE.Curve.call( this );

	this.scale = ( scale === undefined ) ? 1 : scale;
}

function make_lamp(position, rotation=0, target){

	let lamp = new THREE.Group();
	let lamp_material = new THREE.MeshPhongMaterial(0xffffff);
	lamp_material.side =THREE.DoubleSide;
	let lamp_base_geo = new THREE.BoxBufferGeometry(0.1, 0.5, 2, 2, 2);

	let lamp_head_geo = new THREE.CylinderGeometry(0.5, 0.5, 1, 8, 1, false, 0, 4.5);
	
	lamp_head_geo.rotateX(Math.PI/2);

	let lamp_head_pos = new THREE.Vector3(2.5, 0.7, 0);
	lamp_head_geo.translate(lamp_head_pos.x, lamp_head_pos.y, lamp_head_pos.z);




	CustomLampCurve.prototype = Object.create(THREE.Curve.prototype);
	CustomLampCurve.prototype.constructor = CustomLampCurve;

	CustomLampCurve.prototype.getPoint = function(t){
		let tx = t * 2.5;

		let ty = 1.5 * Math.sin(3 * Math.PI / 4 * t);
		let tz = 0;

		return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
	}
	
	let lamp_path = new CustomLampCurve(1);

	let lamp_connector_geo = new THREE.TubeBufferGeometry(lamp_path, 20, 0.2, 8, false);


	let lamp_connector = new THREE.Mesh(lamp_connector_geo, lamp_material);
	
	let lamp_head = new THREE.Mesh(lamp_head_geo, lamp_material);


	let lamp_base = new THREE.Mesh(lamp_base_geo, lamp_material);

	lamp.add(lamp_head);
	lamp.add(lamp_base);
	lamp.add(lamp_connector);

	lamp.translateX(position.x);
	lamp.translateY(position.y);
	lamp.translateZ(position.z);

	lamp.rotateY(rotation);

	let spotLight = new THREE.SpotLight(0xffffff, 0.9, 10, Math.PI/3);
	let spotLight_pos = lamp.position.clone();

	let rot_eul = new THREE.Euler(0, rotation, 0);
	lamp_head_pos.applyEuler(rot_eul);
	spotLight_pos.x += lamp_head_pos.x;
	spotLight_pos.y += lamp_head_pos.y;
	spotLight_pos.z += lamp_head_pos.z;
	spotLight.position.set(spotLight_pos.x, spotLight_pos.y, spotLight_pos.z);
	spotLight.target = target;


	scene.add(spotLight);
	scene.add(lamp);
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
	let wall_geometry = new THREE.BufferGeometry();

	let wall_material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});

	let plane = new THREE.Mesh(wall_geometry, wall_material);
	scene.add(plane);

}


// Makes a box with given w,h,d,pos,and material
// Position is center of wall
function make_wall(width, height, depth, position, material, rotation=0){
	let wall = new THREE.BoxBufferGeometry(width, height, depth, 2, 2);	
	let new_wall = new THREE.Mesh(wall, material);

	new_wall.translateX(position.x);
	new_wall.translateY(position.y);
	new_wall.translateZ(position.z);
	//new_wall.translate(position.x, position.y, position.z);
	new_wall.rotateY(rotation);
	//new_wall.receiveShadow = true;
	

	scene.add(new_wall);
	walls.push(new_wall);
	return new_wall;
}

function make_picture(position, picture, frame, aspect_ratio, rotation=0){
	let height = 7.5;
	let width = height * aspect_ratio;

	let pic_and_frame = new THREE.Group();


	let le_pic_geo = new THREE.BoxBufferGeometry(0.02, height, width, 2, 2);
	
	le_pic_geo.translate(0.1, 0, 0);
	let le_pic = new THREE.Mesh(le_pic_geo, picture);


	let le_frame_geo = new THREE.BoxBufferGeometry(0.05, height + 0.5, width + 0.5, 2, 2);

	let le_frame = new THREE.Mesh(le_frame_geo, frame);


	pic_and_frame.add(le_pic);

	pic_and_frame.add(le_frame);

	pic_and_frame.translateX(position.x);
	pic_and_frame.translateY(position.y);
	pic_and_frame.translateZ(position.z);
	pic_and_frame.rotateY(rotation);

	scene.add(pic_and_frame);

	return pic_and_frame;
}
// Loads a picture with a given source, position, frame, and orientation (i.e. Math.PI/2)
function load_picture(src, position, frame, rotation=0){
	let new_img = new Image();
	new_img.onload = function(){
		let width = this.width;
		let height = this.height;
		let aspect_ratio = width/height;
		let texture = new THREE.TextureLoader().load(this.src);

		let material = new THREE.MeshPhongMaterial({map:texture});

		let pic = make_picture(position, material, frame, aspect_ratio, rotation);

		let lamp_position = pic.position.clone();
		//let bench_position = pic.position.clone();

		lamp_position.y += 5.0;
		make_lamp(lamp_position, rotation, pic);

		let bench_position = pic.position.clone();

		let bench_offset = new THREE.Vector3(0, -5, 7);
		bench_offset.applyEuler(new THREE.Euler(0, Math.PI/2 + rotation, 0));

		bench_position.addVectors(bench_position, bench_offset);
		make_bench(bench_position, 5, Math.PI/2 + rotation);
		
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
        bevelThickness: 0.001,
        bevelSize: .01,
        bevelSegments: 20,
      });

 	

 		let text_mesh = new THREE.Mesh(geometry, material);

 		geometry.computeBoundingBox();
 		geometry.boundingBox.getCenter(text_mesh.position).multiplyScalar(-1);
 		const parent = new THREE.Object3D();
 		parent.add(text_mesh);

 		parent.translateX(position.x);
 		parent.translateY(position.y);
 		parent.translateZ(position.z);
 		parent.rotateY(rotation);
 		//parent.scale = new THREE.Vector3(0.5, 0.5, 0.5);

 		//let scale = new THREE.Matrix4();
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
function make_plate(src, position, rotation=0){

	let plate_texture = new THREE.TextureLoader().load('resources/gold_plate.png');
	let plate_material = new THREE.MeshPhongMaterial({map:plate_texture});
	let plate = make_wall(2, 1, 0.05, position, plate_material, rotation);

	let title = extract_title(src);
	let date = extract_date(src);
	let title_pos = position.clone();
	title_pos.y += 0.2

	let date_pos = title_pos.clone();
	date_pos.y -= 0.4;
	make_text(title, 0.1, 0.1, title_pos, black_frame, rotation);
	make_text(date, 0.1, 0.1, date_pos, black_frame, rotation);
	//plate.add(texts[-1]);

}

function extract_date(src){
	var split_string = src.split("_");
	var date = ""
	split_string.forEach(function(string, index){
		if (!isNaN(string)){
			date += string;
			date += "/"
		}
	})


	return date.slice(0, -1);
}

function extract_title(src){
	var split_string = src.split("_");
	var date = ""
	split_string.forEach(function(string, index){
		if (isNaN(string)){
			date += string;
			date += " "
		}
	})
	return date.slice(0, -1);
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
	    //console.log("resizing");
  	}

	for (let i = ceiling_hedrons.length - 1; i >= 0; i--) {
		ceiling_hedrons[i].rotateX(0.01);
		ceiling_hedrons[i].rotateY(0.01);
		let red = Math.sin(time*i*0.1);
		let green = Math.cos(time*i*0.1);
		let blue = Math.sin(time*i*0.1);
		let color = new THREE.Color(red, green, blue);
		ceiling_hedrons[i].material.color = color;
	}

	for (let j = archway_rings.length - 1; j >= 0; j--){
		if (j %2 == 0){
			archway_rings[j].rotation.z += 0.01;
		}
		else{
			archway_rings[j].rotation.z -= 0.01;
		}

	}


	// Centerpiece handling
	
	centerpiece.rotateX(0.01);
	centerpiece.rotateZ(0.01);

	centerpiece_child.rotateX(-0.01);

	centerpiece_light.translateY(0.1 * Math.sin(time));
	centerpiece_light.translateZ(0.1 * Math.cos(time));

	centerpiece_light2.translateY(0.1 * Math.sin(time));
	centerpiece_light2.translateX(0.1 * Math.cos(time));

	centerpiece_light3.translateY(0.1 * Math.sin(time));
	centerpiece_light3.translateX(0.1 * Math.cos(time));
	centerpiece_light3.translateZ(0.1 * Math.cos(time));
	

	//outer_light.translateX(0.1 * Math.sin(time));
	//tunnel_light.translateX(0.1 * -Math.sin(time));


	sphere.translateX(0.1 * Math.sin(time));
	sphere.translateZ(0.1 * Math.cos(time));
	//sphere.translateOnAxis(y_axis, 0.1 * Math.cos(time));


	// Moving tetrahedron wall
	if (camera.position.x > 100 && camera.position.x < 250 && camera.position.z < -25 && wall_timer <= 1){
		for (let i = 0; i < wall_tetras_width; i++){
			for (let j = 0; j < wall_tetras_height; j++){
				let trans_y = 0;
				let trans_z = 0;
				let tetra = wall_tetras[i * wall_tetras_height + j];
				if (wall_timer <= 1){
					let curve_vector = wall_tetra_curve.getPoint(wall_timer);
					
					// Z offset is current position on curve (gives positive)
					let z_offset = tetra_wall_original_z - tetra.position.z;

					trans_z = curve_vector.x - z_offset;
					trans_z = -1 * trans_z; 
					trans_z = trans_z * 1.0/(1.0+j * 6.5);

					// Y offset varies depending on row (gives negative)
					let y_offset = (-4 + j * 1.5) - tetra.position.y;


					y_offset = -1 * y_offset;
					trans_y = curve_vector.y - y_offset;
					trans_y = trans_y * 1.0/(1.0+j*8);	

				
					// Rotate all tetrahedrons to same orientation, move, rotate back
					original_rotation = tetra.rotation.clone();

					lookAtpoint = tetra.position.clone();
					lookAtpoint.z += 1;				

					tetra.lookAt(lookAtpoint);

					
					wall_tetras[i * wall_tetras_height + j].translateY(trans_y);
					wall_tetras[i * wall_tetras_height + j].translateZ(trans_z);	

					tetra.setRotationFromEuler(original_rotation);
				}
			}
		}
		wall_timer += 0.01;
	}

	//Hallway light
	if (wall_timer >= 1 && camera.position.x > 100 && camera.position.x < 250 && camera.position.z < -35){
		let middle_bottom_tetra = wall_tetras[wall_tetras_height * 30];
		original_rotation = middle_bottom_tetra.rotation.clone();

		lookAtpoint = middle_bottom_tetra.position.clone();
		lookAtpoint.z += 1;				
		middle_bottom_tetra.lookAt(lookAtpoint);

		if (add_light){
			tetra_light = new THREE.PointLight(0xffffff, 1, 50);
			tetra_light_pos = middle_bottom_tetra.position.clone();
			tetra_light.translateX(tetra_light_pos.x);
			tetra_light.translateY(tetra_light_pos.y);
			tetra_light.translateZ(tetra_light_pos.z);
			tetra_light.translateZ(1);
			scene.add(tetra_light);
			//middle_bottom_tetra.add(tetra_light);
			add_light = false;

		}
		middle_bottom_tetra.translateZ(-0.1);
		tetra_light.translateZ(-0.1);
	}


	//Raycasting
	camera.getWorldDirection(target);
	raycaster.set(camera.position, target);
	//console.log(camera.getWorldDirection);

	//console.log(benches);
	var intersects = raycaster.intersectObjects(benches);
	//console.log(intersects);
	if (intersects.length > 0){
		intersecting_bench = true;
		bench_to_sit_on = intersects[0].object;
		intersects[0].object.material.color.set(0xff0000);
	}
	else{
		intersecting_bench = false;
		for (var i = 0; i < benches.length; i++){
			benches[i].material.color.set(0xffffff);
		}
	}



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



function move_forward(){
	let target = new THREE.Vector3();
	let lookVec = camera.getWorldDirection(target);  
	camera.position.x += lookVec.x;
	//camera.position.y += lookVec.y;
	camera.position.z += lookVec.z;
}

function move_backward(){
	let target = new THREE.Vector3();
	let lookVec = camera.getWorldDirection(target);  
	camera.position.x -= lookVec.x;
	//camera.position.y -= lookVec.y;
	camera.position.z -= lookVec.z;	
}

function move_left(){
	let target = new THREE.Vector3();
	let lookVec = camera.getWorldDirection(target);  
	let left_movement = lookVec.applyEuler(rotate_left);
	camera.position.x += left_movement.x;
	//camera.position.y += left_movement.y;
	camera.position.z += left_movement.z;
}

function move_right(){
	let target = new THREE.Vector3();
	let lookVec = camera.getWorldDirection(target);  
	let right_movement = lookVec.applyEuler(rotate_right);
	camera.position.x += right_movement.x;
	camera.position.z += right_movement.z;
}
window.addEventListener('keypress', function(e){
	let pressed_key = event.key;
	switch(pressed_key){
		case 's':
			if (!sitting){
				s_pressed = true;
				move_backward();
			}
			break;
		case 'w':
			if (!sitting){
				w_pressed = true;
				move_forward();
			}
			break;
		case 'a':
			if (!sitting){
				a_pressed = true;
				move_left();
			}
			else{

			}
			break;
		case 'd':
			if (!sitting){
				d_pressed = true;
				move_right();
			}
			break;
		case 'q':
			q_pressed = true;
			camera.rotateZ(0.2);
		case 'e':
			e_pressed = true;
			camera.rotateZ(-0.1);
		case 'f':
			if (intersecting_bench && !sitting){
				let sitting_position = bench_to_sit_on.position.clone();
				sitting_position.y += 3;
				camera.position.set(sitting_position.x, sitting_position.y, sitting_position.z);
			
				let lookAtpoint = new THREE.Vector3(0, 0, -1);
				lookAtpoint.applyEuler(bench_to_sit_on.rotation);
				lookAtpoint.addVectors(camera.position,lookAtpoint);
				lookAtpoint.y += 0.1;
				camera.lookAt(lookAtpoint);
				sitting = true;
			}
			else if (sitting){
				camera.position.y -= 1;
				sitting = false;
			}
	}
	if (!vid_playing){
		let vid = document.getElementById("skull");
		vid.play();
		vid_playing = true;
	}
	//console.log(event.x);
});

window.addEventListener('keyup', function(e){
	let pressed_key = event.key;
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
	if (!sitting){
		let horizontal_rot = event.movementX * -0.005;
		let vertical_rot = event.movementY * -0.005;
		let target = new THREE.Vector3();
		let lookAtpoint = new THREE.Vector3();
		camera.position.clone(lookAtpoint);

		// Horizontal rotation about up vector
		camera.rotateX(vertical_rot);

		// Vertical rotation about side vector
		camera.rotateY(horizontal_rot);

		//Used to maintain orientation of the upVec
		camera.getWorldDirection(target);
		camera.lookAt(camera.position.x + target.x, camera.position.y + target.y, camera.position.z + target.z);
	}

});


window.addEventListener('wheel', function(e){
	let zoom_change = e.deltaY * -0.01;
	camera.zoom += zoom_change;
	if (camera.zoom < 1){
		camera.zoom = 1;
	}
	camera.updateProjectionMatrix();
})

init();
animate();