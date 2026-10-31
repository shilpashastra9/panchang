@echo off
call npm install
call npx netlify-cli login
call npx netlify-cli deploy --prod
pause
