@echo off
REM - 현재 배치 파일이 위치한 폴더로 이동
cd /d "%~dp0"

REM - (선택) next_app 폴더로 이동
cd STEC-PARKING-HISTORY

REM - SSR 서버 실행 (빌드된 .next 폴더가 있다 가정)
npx run start