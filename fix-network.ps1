# Run this as Administrator to change network to Private
Set-NetConnectionProfile -InterfaceAlias "Wi-Fi" -NetworkCategory Private
Write-Host "Network changed to Private!" -ForegroundColor Green
Write-Host "`nYour mobile should now be able to access:" -ForegroundColor Yellow
Write-Host "http://192.168.1.41:3000" -ForegroundColor Cyan
