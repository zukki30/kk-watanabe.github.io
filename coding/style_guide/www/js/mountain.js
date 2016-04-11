var SEPARATION = 20, AMOUNTX = 20, AMOUNTY = 20;
var startTime = new Date();

var container, stats, mv;
var camera, scene, renderer;

var particles, particle, count = 0;

var win_w = window.innerWidth;
var windowHalfX = win_w / 2;
var win_h = window.innerHeight;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

	container = document.getElementById('line');
	mv = document.getElementById('mainVisual');
	mv.appendChild( container );

	camera = new THREE.PerspectiveCamera( 75, win_w / win_h, 1, 10000 );
	camera.position.set(0,0,1000);
	camera.lookAt(new THREE.Vector3(0,0,0));

	scene = new THREE.Scene();

	particles = new Array();
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( win_w, win_h );
	container.appendChild( renderer.domElement );

	var material = new THREE.MeshPhongMaterial( {
		color: 0xffff00,
		"wireframe" : true,
	} );

	var i = 0;
	var geometry = new THREE.PlaneGeometry( win_w * 2, win_w, 20, 20 );

	particle = new THREE.Mesh( geometry, material );
	particle.position.y = -300;
	particle.position.x = Math.PI / -2;
	particle.rotation.x = 325;
	scene.add( particle );

	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	render();

}

function render() {
	var vertex = {
		x: 0,
		y: 0,
		z: 0
	}

	var time = ( new Date() - startTime ) / 1000;
	particle.geometry.verticesNeedUpdate = true;//これを忘れずに書く
	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
			var rand = Math.floor( Math.random() * 11 ) ;
			var index = iy * (AMOUNTY + 1) + ix % (AMOUNTY + 1);
			vertex = particle.geometry.vertices[index];

			var amp = rand * 4;//振幅
			vertex.z = amp * Math.sin( -ix / 2 + time * 50 );
		}
	}

	renderer.render( scene, camera );
}