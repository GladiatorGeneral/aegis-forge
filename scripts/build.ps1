# PHNXForge Build Script
Write-Host "🔨 Building PHNXForge..." -ForegroundColor Cyan
Write-Host ""

# Build mathematics-engine
Write-Host "📚 Building mathematics-engine..." -ForegroundColor Yellow
Set-Location packages\mathematics-engine
pnpm build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build mathematics-engine" -ForegroundColor Red
    exit 1
}
Write-Host "✅ mathematics-engine built successfully" -ForegroundColor Green
Write-Host ""

# Build common
Write-Host "🔧 Building common..." -ForegroundColor Yellow
Set-Location ..\common
pnpm build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build common" -ForegroundColor Red
    exit 1
}
Write-Host "✅ common built successfully" -ForegroundColor Green
Write-Host ""

# Build web-app
Write-Host "🌐 Building web-app..." -ForegroundColor Yellow
Set-Location ..\..\apps\web-app
pnpm build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build web-app" -ForegroundColor Red
    exit 1
}
Write-Host "✅ web-app built successfully" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 Build completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the dev server:" -ForegroundColor Cyan
Write-Host "  cd apps\web-app && pnpm dev"
Write-Host ""
Write-Host "To start production server:" -ForegroundColor Cyan
Write-Host "  cd apps\web-app && pnpm start"
