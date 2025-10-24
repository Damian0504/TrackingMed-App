@echo off
title Iniciando entorno local TrackingMed-App
color 0A
echo.
echo ===============================================
echo    Iniciando entorno local TrackingMed-App
echo ===============================================
echo.

:: ===== BACKEND =====
echo [1/3] Configurando entorno del backend...
cd backend

if not exist ".venv" (
    echo Creando entorno virtual...
    python -m venv .venv
)

echo Activando entorno virtual...
call .venv\Scripts\activate

echo Instalando dependencias del backend...
pip install --upgrade pip >nul
if exist requirements.txt (
    pip install -r requirements.txt
) else (
    echo No se encontró requirements.txt
)

echo Iniciando servidor FastAPI...
start cmd /k "cd backend && call .venv\Scripts\activate && uvicorn app.main:asgi_app --reload --port 8000"

cd ..

:: ===== FRONTEND =====
echo.
echo [2/3] Configurando frontend React...
cd frontend

if not exist "node_modules" (
    echo Instalando dependencias iniciales...
    call npm install
)

echo Verificando librerías Google Maps y Socket.IO...
set FRONTEND_DEPS=@react-google-maps/api socket.io-client
for %%d in (%FRONTEND_DEPS%) do (
    call npm ls %%d >nul 2>&1 || (
        echo Instalando %%d...
        call npm install %%d --save
    )
)

echo Iniciando servidor de desarrollo React...
start cmd /k "npm start"

cd ..

:: ===== LOGS =====
echo.
echo [3/3] Entorno local iniciado correctamente.
echo -----------------------------------------------
echo Backend: http://127.0.0.1:8000/docs
echo Frontend: http://localhost:3000
echo -----------------------------------------------
echo Para detener todo, cerrá las ventanas abiertas.
pause
