@echo off
title  Detener entorno local TrackingMed-App
echo ===========================================
echo  Cerrando procesos de FastAPI y React...
echo ===========================================

:: Cerrar uvicorn (backend FastAPI)
echo Terminando procesos del backend (uvicorn)...
taskkill /F /IM python.exe /FI "WINDOWTITLE eq  Backend FastAPI *" >nul 2>&1
taskkill /F /IM uvicorn.exe >nul 2>&1

:: Cerrar React (frontend npm)
echo Terminando procesos del frontend (React)...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq  Frontend React *" >nul 2>&1
taskkill /F /IM npm.cmd >nul 2>&1

echo  Todos los procesos fueron cerrados.
pause
