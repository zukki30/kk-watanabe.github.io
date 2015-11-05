//シーンの作成
var line = function () {
	var scene = new THREE.Scene(),
		mainVisual = document.getElementById('mainVisual'),
		mainVisual_w = mainVisual.clientWidth,
		mainVisual_h = mainVisual.clientHeight,
		lineFrame = document.getElementById('line'),
		fov = 60,
		aspect = mainVisual_w / mainVisual_h,
		near = 1,
		far = 1000,
		camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

	//カメラの設定
	camera.position.set( 0, 0, 50 );

	//レンダリング
	var renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize( mainVisual_w, mainVisual_h );
	renderer.setClearColor( 0x000000, 0 );
	lineFrame.appendChild( renderer.domElement );

	//高原
	var directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.set( 0, 0.7, 0.7 );
	scene.add( directionalLight );

	//物体の追加
	var geometry = new THREE.CylinderGeometry( 50, 50, 10, 50, 0, false )
	var material = new THREE.MeshPhongMaterial( {
		color: 0xffffff,
		"wireframe" : true,
	} );
	var mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	//表示する
	renderer.render( scene, camera );

	var degree = 0;
	(function renderLoop () {
		requestAnimationFrame( renderLoop );

		mesh.rotation.set(
			0,
			mesh.rotation.y + 0.001,
			mesh.rotation.z + 0.001
		);

		renderer.render( scene, camera );
	} )();
};

window.addEventListener( 'DOMContentLoaded', line, false );