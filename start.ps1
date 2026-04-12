Write-Host "Installing Frontend Dependencies..."
Set-Location -Path .\frontend
npm install

Write-Host "Installing Backend Dependencies and initializing SQLite DB..."
Set-Location -Path ..\backend
npm install
npx prisma db push

Write-Host "Installing Python ML Dependencies..."
Set-Location -Path ..\ml_model
pip install -r requirements.txt

Write-Host "Starting all 3 servers in new windows! Have fun!"
Set-Location -Path ..

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ml_model; python app.py"
