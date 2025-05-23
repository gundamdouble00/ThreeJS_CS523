// Khởi tạo các biến cần thiết
let scene, camera, renderer, cube, sphere, cylinder;
let controls;

// Hàm khởi tạo
function init() {
  // Tạo scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // Tạo camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 15;

  // Tạo renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  // Thêm ánh sáng
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Thêm controls để có thể xoay camera bằng chuột
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Tạo lưới tọa độ
  const gridHelper = new THREE.GridHelper(20, 20);
  scene.add(gridHelper);

  // Tạo trục tọa độ
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // Tạo hình lập phương (cube)
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = -5; // Đặt vị trí ban đầu
  scene.add(cube);

  // Tạo hình cầu (sphere)
  const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = 0; // Đặt vị trí ban đầu
  scene.add(sphere);

  // Tạo hình trụ (cylinder)
  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 3, 32);
  const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
  cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinder.position.x = 5; // Đặt vị trí ban đầu
  scene.add(cylinder);

  // Bắt sự kiện resize cửa sổ
  window.addEventListener("resize", onWindowResize, false);

  // Bắt đầu animation
  animate();
}

// Hàm xử lý khi resize cửa sổ
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Biến để theo dõi thời gian
let scaleDirection = 1;
let scaleValue = 1;

// Hàm animation
function animate() {
  requestAnimationFrame(animate);

  // Phép biến đổi xoay cho hình lập phương
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.005;

  // Phép biến đổi tịnh tiến cho hình cầu (lên xuống)
  sphere.position.y = Math.sin(Date.now() * 0.001) * 2;

  // Phép biến đổi co giãn cho hình trụ
  scaleValue += 0.01 * scaleDirection;
  if (scaleValue > 1.5 || scaleValue < 0.5) {
    scaleDirection *= -1;
  }
  cylinder.scale.set(1, scaleValue, 1);

  // Cập nhật controls
  controls.update();

  // Render scene
  renderer.render(scene, camera);
}

// Khởi chạy ứng dụng
init();
