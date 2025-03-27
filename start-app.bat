@echo off
REM - 현재 배치 파일이 위치한 폴더로 이동
cd /d "%~dp0"

REM - next_app 폴더로 이동
cd next_app

REM - SSR 서버 실행 (빌드된 .next 폴더가 있다 가정)
npx next start