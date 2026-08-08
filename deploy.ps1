$ErrorActionPreference = 'Stop'
$env:PATH = "C:\Users\EES\AppData\Local\nodejs-portable\node-v24.19.0-win-x64;$env:PATH"
# The website folder (containing vercel.json + index.html) is the Vercel project root.
$site = $PSScriptRoot
Set-Location $site
Write-Output "Deploying from: $site"
vercel deploy --prod --yes
