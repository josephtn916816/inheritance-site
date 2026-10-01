[CmdletBinding()]
param(
    [string]$SiteRoot
)

$ErrorActionPreference = 'Stop'
if ([string]::IsNullOrWhiteSpace($SiteRoot)) {
    $SiteRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
    $SiteRoot = Split-Path -Parent $SiteRoot
}
$failures = [System.Collections.Generic.List[string]]::new()

function Test-Requirement {
    param([string]$Name, [bool]$Passed, [string]$Detail)
    if ($Passed) {
        Write-Host "[PASS] $Name" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] $Name : $Detail" -ForegroundColor Red
        $failures.Add("$Name : $Detail")
    }
}

function Test-FileText {
    param([string]$RelativePath, [string]$Needle)
    $path = Join-Path $SiteRoot $RelativePath
    return (Test-Path -LiteralPath $path) -and (Select-String -LiteralPath $path -SimpleMatch $Needle -Quiet)
}

Write-Host "Inheritance site pre-publish check: $SiteRoot" -ForegroundColor Cyan

$requiredFiles = @('index.html', '404.html', 'robots.txt', 'sitemap.xml', 'privacy/index.html', 'support/index.html', 'releases/index.html', 'assets/analytics.js')
foreach ($relativePath in $requiredFiles) {
    Test-Requirement "Required file: $relativePath" (Test-Path -LiteralPath (Join-Path $SiteRoot $relativePath)) 'File not found'
}

Test-Requirement 'robots sitemap' (Test-FileText 'robots.txt' 'Sitemap: https://josephtn916816.github.io/inheritance-site/sitemap.xml') 'Missing or invalid sitemap URL'
Test-Requirement 'home canonical URL' (Test-FileText 'index.html' 'https://josephtn916816.github.io/inheritance-site/') 'Missing canonical URL'
Test-Requirement 'privacy analytics disclosure' (Test-FileText 'privacy/index.html' 'Google Analytics 4') 'Missing analytics disclosure'
$homeContent = Get-Content -LiteralPath (Join-Path $SiteRoot 'index.html') -Raw -Encoding UTF8
$eventCount = ([regex]::Matches($homeContent, 'data-analytics-event=')).Count
Test-Requirement 'three distinct download events' ($eventCount -eq 3) "Expected 3, found $eventCount"
Test-Requirement 'production analytics host restriction' (Test-FileText 'assets/analytics.js' "const productionHost = 'josephtn916816.github.io';") 'Missing production host restriction'

$blockedExtensions = @('.pfx', '.p12', '.key', '.pem', '.env', '.sqlite', '.db', '.bak')
$blockedFiles = Get-ChildItem -LiteralPath $SiteRoot -Recurse -File | Where-Object {
    $_.Extension -in $blockedExtensions -and $_.FullName -notmatch '\\.git\\'
}
Test-Requirement 'no public key database or backup files' ($blockedFiles.Count -eq 0) (($blockedFiles.FullName -join '; '))

$trackedLocalDownloads = @(git -C $SiteRoot ls-files -- 'downloads-local/*')
Test-Requirement 'local validation downloads are untracked' ($trackedLocalDownloads.Count -eq 0) 'downloads-local contains tracked files'

if ($failures.Count) {
    Write-Host "`nCheck failed: $($failures.Count) item(s)" -ForegroundColor Red
    exit 1
}

Write-Host "`nAll checks passed. Preview manually, then decide whether to publish." -ForegroundColor Green
