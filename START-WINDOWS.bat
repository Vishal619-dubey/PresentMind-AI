@echo off
title PresentMind AI Setup
echo ==========================================
echo PresentMind AI - Windows Setup
echo ==========================================
echo.
call npm run install-all
if errorlevel 1 (
  echo Node dependency installation failed.
  pause
  exit /b 1
)
echo.
python -m pip install -r python_engine\requirements.txt
if errorlevel 1 (
  echo Python dependency installation failed.
  pause
  exit /b 1
)
if not exist server\.env copy server\.env.example server\.env
if not exist client\.env copy client\.env.example client\.env
echo.
echo Starting PresentMind AI...
call npm run dev
pause
