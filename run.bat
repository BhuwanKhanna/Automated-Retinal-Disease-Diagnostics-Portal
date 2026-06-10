@echo off
echo Starting Automated Retinal Disease Diagnostics Portal...

echo.
echo [1/2] Starting Backend (FastAPI)...
start cmd /k "cd backend && python -m uvicorn app.main:app --reload --port 8000"

echo [2/2] Starting Frontend (React)...
start cmd /k "cd frontend && npm run dev"

echo.
echo Portal is being launched!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this launcher (servers will keep running in their windows)...
pause > nul
