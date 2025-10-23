@echo off
title 🚑 TrackingMed-App - Entorno Local
chcp 65001 >nul
echo ===========================================
echo Iniciando entorno local TrackingMed-App
echo ===========================================

:: Crear carpeta de logs si no existe
if not exist logs (
    mkdir logs
)

:: ================================
:: BACKEND (FastAPI)
:: ================================
cd backend
if not exist .venv (
    echo Creando entorno virtual de Python...
    python -m venv .venv
)
echo Activando entorno virtual...
call .venv\Scripts\activate

if exist requirements.txt (
    echo Instalando dependencias del backend...
    pip install -r requirements.txt > ../logs/backend_install.log 2>&1
)

echo Iniciando servidor FastAPI...
start cmd /k "title Backend FastAPI && uvicorn app.main:app --reload > ../logs/backend.log 2>&1"

cd ..

:: ================================
:: FRONTEND (React)
:: ================================
cd frontend

:: Verificar Node.js y npm
echo Verificando instalacion de Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado o no esta en el PATH.
    echo Descargalo desde: https://nodejs.org/
    pause
    exit /b
)

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm no esta instalado o no esta en el PATH.
    echo npm se instala junto con Node.js.
    pause
    exit /b
)

if not exist node_modules (
    echo Instalando dependencias del frontend (npm install)...
    npm install > ../logs/frontend_install.log 2>&1
)

echo Iniciando servidor React...
start cmd /k "title Frontend React && npm start > ../logs/frontend.log 2>&1"

cd ..

:: ================================
:: MENSAJE FINAL
:: ================================
echo ===========================================
echo Entorno local iniciado correctamente.
echo Backend -> http://127.0.0.1:8000/docs
echo Frontend -> http://localhost:3000
echo Logs guardados en la carpeta: logs/
echo ===========================================
pause
