param([Parameter(Mandatory=$true)][string]$Domain)
$ErrorActionPreference = 'Stop'
if ($Domain -notmatch '^https://') { $Domain = "https://$Domain" }
$Domain = $Domain.TrimEnd('/')
$old = 'https://azel-mutaqaddem.com'
# The website folder holds the files that reference the domain.
$site = $PSScriptRoot
$files = @('index.html', 'robots.txt', 'sitemap.xml')
foreach ($f in $files) {
    $p = Join-Path $site $f
    if (-not (Test-Path $p)) { continue }
    $c = Get-Content -LiteralPath $p -Raw -Encoding UTF8
    if ($c -match [regex]::Escape($old)) {
        $c = $c -replace [regex]::Escape($old), $Domain
        [System.IO.File]::WriteAllText($p, $c, (New-Object System.Text.UTF8Encoding($false)))
        Write-Output "updated: $f  ($old -> $Domain)"
    } else {
        Write-Output "skipped (no old domain): $f"
    }
}
