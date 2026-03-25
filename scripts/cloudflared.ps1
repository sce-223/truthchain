$ErrorActionPreference = "Stop"

$candidates = @(
  "C:\Program Files (x86)\cloudflared\cloudflared.exe",
  "C:\Program Files\cloudflared\cloudflared.exe"
)

$command = Get-Command cloudflared -ErrorAction SilentlyContinue
if ($command) {
  $candidates = @($command.Source) + $candidates
}

$cloudflared = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $cloudflared) {
  Write-Error "cloudflared.exe was not found. Reinstall with: winget install --id Cloudflare.cloudflared -e"
}

& $cloudflared @args
exit $LASTEXITCODE
