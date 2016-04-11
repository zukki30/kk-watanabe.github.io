//シーンの作成
var line = function () {
	var scene = new THREE.Scene(),
		mainVisual = document.getElementById('mainVisual'),
		mainVisual_w = mainVisual.clientWidth,
		mainVisual_h = mainVisual.clientHeight,
		lineFrame = document.getElementById('line'),
		fov = 70,
		aspect = mainVisual_w / mainVisual_h,
		near = 1,
		far = 10000,
		camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

		THREE.UserCubes1 = function ( scene, cubeSize, cubeNum, displaySpan ) {

			// キューブの基本サイズ( 見た目は後でスケールで変化する )
			this.cubeSize = ( cubeSize !== undefined ) ? cubeSize : 1;
			// キューブの数
			this.cubeNum = ( cubeNum !== undefined ) ? cubeNum : 1000;
			// 表示幅( 発生させる座標の範囲の長さ )
			this.displaySpan = ( displaySpan !== undefined ) ? displaySpan : 500;

			var shape = new THREE.Shape();
			shape.moveTo(  0, 5 );
			shape.lineTo(  5, -2 );
			shape.lineTo( -5, -2 );
			shape.lineTo(  0, 5 );

			this.geometry = new THREE.ShapeGeometry( shape );
			this.group = null
			this.scene = scene;

			this.renew();

		};

		THREE.UserCubes1.prototype = {
			constructor: THREE.UserCubes1,
			remove: function() {
				this.scene.remove( this.group )
				this.group = null;
			},
			renew: function() {
				if ( this.group == null ) {
					this.group = new THREE.Object3D();
					this.scene.add( this.group );
				}
				for ( var i = 0; i < this.cubeNum; i ++ ) {

					var object = new THREE.Mesh(
						this.geometry,
						new THREE.MeshBasicMaterial( {
							color: Math.random() * 0xffffff,
							transparent: true,
							opacity: 0.5 }
						)
					);

					// 正座標に発生させて、原点に半分戻す
					object.position.x = Math.random() * this.displaySpan - this.displaySpan/2;
					object.position.y = Math.random() * this.displaySpan - this.displaySpan/2;
					object.position.z = Math.random() * this.displaySpan - this.displaySpan/2;

					object.scale.x = Math.random() * 2 + 1;
					object.scale.y = Math.random() * 2 + 1;
					object.scale.z = Math.random() * 2 + 1;

					// 向きを360度ランダム
					object.rotation.x = Math.random() * 2 * Math.PI;
					object.rotation.y = Math.random() * 2 * Math.PI;
					object.rotation.z = Math.random() * 2 * Math.PI;

					this.group.add( object )

				}

			}
		}

		var w = 600;
		var h = 500;

		var camera, scene, renderer;
		var UserCubes;

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
	UserCubes = new THREE.UserCubes1( scene );

	//表示する
	renderer.render( scene, camera );

	animate();

	function animate() {
		requestAnimationFrame( animate );
		render();
	}

	var radius = 600;
	var theta = 0;

	function render() {
		theta += 0.1;

		camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
		camera.position.y = 0;
		camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
		camera.lookAt( scene.position );

		renderer.render( scene, camera );
	}
};

window.addEventListener( 'DOMContentLoaded', line, false );