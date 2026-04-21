# push.ps1 -- Script di deploy per flowerex.it
# Uso: doppio clic, oppure da terminale PowerShell con .\push.ps1
# Opzionale: .\push.ps1 "descrizione modifiche"

param(
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"
$gitDir = "$PSScriptRoot\.git"

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "  Flowerex -- Deploy su Vercel via Git  " -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# 1. Pulizia lock files
Write-Host "[1/4] Pulizia file lock Git..." -ForegroundColor Yellow

$lockFiles = @(
    "$gitDir\index.lock",
    "$gitDir\HEAD.lock",
    "$gitDir\MERGE_HEAD.lock",
    "$gitDir\CHERRY_PICK_HEAD.lock",
    "$gitDir\REBASE_HEAD.lock"
)

foreach ($lockFile in $lockFiles) {
    if (Test-Path $lockFile) {
        Remove-Item $lockFile -Force
        Write-Host "  Rimosso: $(Split-Path $lockFile -Leaf)" -ForegroundColor Gray
    }
}

$refLocks = Get-ChildItem -Path "$gitDir\refs" -Filter "*.lock" -Recurse -ErrorAction SilentlyContinue
foreach ($refLock in $refLocks) {
    Remove-Item $refLock.FullName -Force
    Write-Host "  Rimosso: $($refLock.Name)" -ForegroundColor Gray
}

Write-Host "  OK" -ForegroundColor Green

# 2. Pull
Write-Host ""
Write-Host "[2/4] Sincronizzazione con GitHub..." -ForegroundColor Yellow
try {
    git pull origin main --no-rebase --quiet
    Write-Host "  OK" -ForegroundColor Green
} catch {
    Write-Host "  Skipped (nessun aggiornamento remoto)" -ForegroundColor DarkYellow
}

# 3. Staging
Write-Host ""
Write-Host "[3/4] Raccolta modifiche..." -ForegroundColor Yellow
git add -A

$status = git status --porcelain
if (-not $status) {
    Write-Host ""
    Write-Host "Nessuna modifica da pubblicare. Il sito e' gia' aggiornato." -ForegroundColor Green
    Write-Host ""
    Read-Host "Premi Invio per chiudere"
    exit 0
}

git status --short | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }

# 4. Messaggio commit
if (-not $Message) {
    Write-Host ""
    $Message = Read-Host "Descrizione modifiche (Invio per default)"
    if (-not $Message) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
        $Message = "update: modifiche Claude -- $timestamp"
    }
}

# 5. Commit e push
Write-Host ""
Write-Host "[4/4] Commit e push su GitHub -> Vercel..." -ForegroundColor Yellow
git commit -m $Message
git push origin main

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "  FATTO! Vercel sta compilando il sito." -ForegroundColor Green
Write-Host "  https://vercel.com/ngrowthbusiness-glitch/flowerex-it" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "Premi Invio per chiudere"
