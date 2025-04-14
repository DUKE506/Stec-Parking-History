const { Service } = require("node-windows");
const path = require("path");

// 서비스 설정
const svc = new Service({
  name: "ParkIt App",
  description: "ParkIt App Service",
  script: path.join(__dirname, "node_modules", "next", "dist", "bin", "next"),
  nodeOptions: ["--harmony", "--max_old_space_size=4096"],
  // 실행 인자 - 프로덕션 모드로 시작
  scriptOptions: "start",
  // 워킹 디렉토리 설정
  workingDirectory: __dirname,
  // 자동 재시작 옵션
  grow: 0.25,
  wait: 2,
  maxRestarts: 3,
  // 로그 설정
  logOnAs: {
    account: process.env.COMPUTERNAME + "\\" + process.env.USERNAME,
    password: "", // 필요한 경우 비밀번호 입력
  },
});

// 서비스 설치 이벤트 리스너
svc.on("install", () => {
  console.log("서비스가 성공적으로 설치되었습니다.");
  svc.start();
});

svc.on("start", () => {
  console.log("서비스가 시작되었습니다.");
});

svc.on("alreadyinstalled", () => {
  console.log("서비스가 이미 설치되어 있습니다.");
});

// 서비스 설치
svc.install();
