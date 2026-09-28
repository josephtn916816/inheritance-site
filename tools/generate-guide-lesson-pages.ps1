$pageIds = @(
  'client-profile', 'client-profile-new', 'client-profile-search', 'business-card-scan', 'client-service-history',
  'family', 'inheritance-order', 'deduction', 'estate-tax', 'asset-distribution-tax',
  'commercial-insurance', 'disability-grades', 'retirement-pension', 'retirement-labor-scenario',
  'retirement-pension-schedule', 'loan-analysis', 'land-exchange', 'report-center', 'laws',
  'backup-restore', 'email-automation', 'commercial-control'
)

$outputDirectory = Join-Path $PSScriptRoot '..\guide\pages'
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
$template = @'
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="User guide.">
    <meta name="theme-color" content="#0d4d85">
    <title>&#25805;&#20316;&#25945;&#23416;&#20013;&#24515; | &#20659;&#25215;&#26234;&#31574;</title>
    <link rel="stylesheet" href="../../assets/site.css">
    <link rel="stylesheet" href="../../assets/site-enhancements.css">
    <link rel="stylesheet" href="../../assets/guide.css?v=20260927-card-crops">
    <link rel="stylesheet" href="../../assets/guide-card-crops.css?v=20260928-precision-callouts">
    <link rel="stylesheet" href="../../assets/guide-lesson-page.css?v=20260928-callout-fit">
  </head>
  <body data-lesson="{{LESSON_ID}}" data-guide-assets="../../assets">
    <header class="site-header"><a class="brand" href="../../"><span class="brand-mark">&#20659;</span><span>&#20659;&#25215;&#26234;&#31574;</span></a><nav><a href="../../">&#39318;&#38913;</a><a href="../">&#25945;&#23416;&#32317;&#35261;</a><a href="../../support/">&#25903;&#25588;</a></nav></header>
    <main class="lesson-page-main">
      <a class="lesson-back" href="../" data-history-back>&larr; &#22238;&#21040;&#19978;&#19968;&#38913;</a>
      <h1 class="lesson-page-title" data-lesson-title>&#36617;&#20837;&#25945;&#23416;&#20013;...</h1>
      <div class="page-guide-list lesson-page-list" data-lesson-host aria-live="polite"></div>
      <a class="lesson-page-footer" href="../" data-history-back>&larr; &#22238;&#21040;&#19978;&#19968;&#38913;</a>
    </main>
    <footer><span>&copy; 2026 &#20659;&#25215;&#26234;&#31574;</span><span><a href="../../">&#39318;&#38913;</a> &middot; <a href="../../support/">&#25903;&#25588;&#20013;&#24515;</a> &middot; <a href="../../privacy/">&#38577;&#31169;&#27402;&#25919;&#31574;</a></span></footer>
    <script src="../../assets/guide-lesson-page.js?v=20260928-referrer-back"></script>
  </body>
</html>
'@

foreach ($pageId in $pageIds) {
  $path = Join-Path $outputDirectory "$pageId.html"
  $template.Replace('{{LESSON_ID}}', $pageId) | Set-Content -LiteralPath $path -Encoding utf8
}



