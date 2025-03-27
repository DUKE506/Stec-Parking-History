/**
 * ▶ startscript.js
 *    Windows 환경에서 PM2로 Next.js 서버 실행
 */
import { exec } from "child_process";

exec("npm run start", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});
