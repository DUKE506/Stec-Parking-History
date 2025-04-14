const { Service } = require("node-windows");
const path = require("path");

const svc = new Service({
  name: "ParkIt App",
  script: path.join(__dirname, "node_modules", "next", "dist", "bin", "next"),
});

svc.on("uninstall", () => {
  console.log("서비스가 제거되었습니다.");
});

svc.uninstall();
