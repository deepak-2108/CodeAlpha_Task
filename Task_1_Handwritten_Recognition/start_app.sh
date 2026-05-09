#!/bin/bash

# Get the directory where the script is located
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$PROJECT_DIR"

echo "Stopping any existing processes on ports 5001 and 5173..."
# Kill processes running on port 5001 (Backend)
PID_5001=$(lsof -t -i:5001)
if [ ! -z "$PID_5001" ]; then
    kill -9 $PID_5001
fi

# Kill processes running on port 5173 (Frontend)
PID_5173=$(lsof -t -i:5173)
if [ ! -z "$PID_5173" ]; then
    kill -9 $PID_5173
fi

echo "Starting Backend..."
cd backend
source venv/bin/activate
nohup python app.py > ../backend.log 2>&1 &
echo "Backend PID: $!"

echo "Starting Frontend (Production Preview)..."
cd ../frontend
# Using --host to ensure it's accessible and --port to match existing config
nohup npm run preview -- --port 5173 --host > ../frontend.log 2>&1 &
echo "Frontend PID: $!"

echo "------------------------------------------------"
echo "Application is now running in the background!"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:5001"
echo "------------------------------------------------"
echo "You can view logs in backend.log and frontend.log"
echo "To stop the app, run: kill \$(lsof -t -i:5001 :5173)"
