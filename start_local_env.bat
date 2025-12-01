@echo off
title  Iniciando entorno local TrackingMed-App
color 0A
echo.
echo ===============================================
echo     Iniciando entorno local TrackingMed-App
echo ===============================================
echo.

:: ===== BACKEND =====
echo [1/3]  Configurando entorno del backend...
cd /d "%~dp0backend" || (
    echo  No se encontró la carpeta backend.
    pause
    exit /b
)

if not exist ".venv" (
    echo  Creando entorno virtual...
    python -m venv .venv
)

echo  Activando entorno virtual...
call .venv\Scripts\activate

if exist requirements.txt (
    echo  Instalando dependencias del backend...
    pip install --upgrade pip >nul
    pip install -r requirements.txt
) else (
    echo  No se encontró el archivo requirements.txt
)

echo  Iniciando servidor FastAPI...
start cmd /k "cd /d D:\usuarios\alumno\escritorio\TrackingMed-App\backend && call .venv\Scripts\activate && uvicorn app.main:asgi_app --reload --port 8000"


cd /d "%~dp0"

:: ===== FRONTEND =====
echo.
echo [2/3]  Configurando frontend React...
cd frontend

if not exist "node_modules" (
    echo  Instalando dependencias iniciales...
    call npm install
)

echo 🔌 Verificando librerías Google Maps y Socket.IO...
set FRONTEND_DEPS=@react-google-maps/api socket.io-client
for %%d in (%FRONTEND_DEPS%) do (
    call npm ls %%d >nul 2>&1 || (
        echo  Instalando %%d...
        call npm install %%d --save
    )
)

echo  Iniciando servidor de desarrollo React...
start cmd /k "npm start"

cd /d "%~dp0"

:: ===== FINAL =====
echo.
echo [3/3]  Entorno local iniciado correctamente.
echo -----------------------------------------------
echo  Backend: http://127.0.0.1:8000/docs
echo  Frontend: http://localhost:3000
echo -----------------------------------------------
echo.
pause
