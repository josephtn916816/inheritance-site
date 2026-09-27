Add-Type -AssemblyName System.Drawing

$source = Join-Path $PSScriptRoot '..\assets\tutorial-screenshots\client-profile.png'
$output = Join-Path $PSScriptRoot '..\assets\tutorial-annotations\client-profile-annotated-v3.png'
$canvas = New-Object System.Drawing.Bitmap 1800, 880
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.Clear([System.Drawing.Color]::White)

$screen = [System.Drawing.Image]::FromFile($source)
$screenRect = New-Object System.Drawing.Rectangle 256, 147, 1280, 630
$g.DrawImage($screen, $screenRect)

$red = [System.Drawing.Color]::FromArgb(238, 38, 38)
$ink = [System.Drawing.Color]::FromArgb(13, 43, 72)
$border = New-Object System.Drawing.Pen $red, 3
$leader = New-Object System.Drawing.Pen $red, 3
$leader.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$leader.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$bodyFont = New-Object System.Drawing.Font 'Microsoft JhengHei', 24, ([System.Drawing.FontStyle]::Bold)
$numberFont = New-Object System.Drawing.Font 'Arial', 22, ([System.Drawing.FontStyle]::Bold)

function Draw-RoundedBox([int]$x, [int]$y, [int]$w, [int]$h) {
  $radius = 12
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc($x, $y, $radius * 2, $radius * 2, 180, 90)
  $path.AddArc($x + $w - $radius * 2, $y, $radius * 2, $radius * 2, 270, 90)
  $path.AddArc($x + $w - $radius * 2, $y + $h - $radius * 2, $radius * 2, $radius * 2, 0, 90)
  $path.AddArc($x, $y + $h - $radius * 2, $radius * 2, $radius * 2, 90, 90)
  $path.CloseFigure()
  $g.FillPath([System.Drawing.Brushes]::White, $path)
  $g.DrawPath($border, $path)
  $path.Dispose()
}

function Draw-Callout([int]$x, [int]$y, [int]$w, [int]$h, [string]$number, [string]$text) {
  Draw-RoundedBox $x $y $w $h
  $circle = New-Object System.Drawing.Rectangle ($x + 18), ($y + 16), 30, 30
  $g.FillEllipse((New-Object System.Drawing.SolidBrush $red), $circle)
  $g.DrawString($number, $numberFont, [System.Drawing.Brushes]::White, ($x + 25), ($y + 17))
  $textRect = New-Object System.Drawing.RectangleF ($x + 60), ($y + 12), ($w - 72), ($h - 18)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Near
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  $g.DrawString($text, $bodyFont, (New-Object System.Drawing.SolidBrush $ink), $textRect, $format)
  $format.Dispose()
}

function Draw-Target([int]$x, [int]$y) {
  $outer = New-Object System.Drawing.Rectangle ($x - 15), ($y - 15), 30, 30
  $inner = New-Object System.Drawing.Rectangle ($x - 10), ($y - 10), 20, 20
  $g.FillEllipse((New-Object System.Drawing.SolidBrush $red), $outer)
  $g.DrawEllipse((New-Object System.Drawing.Pen ([System.Drawing.Color]::White), 3), $inner)
}

# Each marker is placed at the nearest outside edge of its target: top, right-top, or left-top.
$stepOne = -join ([char[]](0x9078,0x300C,0x65B0,0x589E,0x5BA2,0x6236,0x300D,0x6216,0x76EE,0x524D,0x5BA2,0x6236))
$stepTwo = (-join ([char[]](0x586B,0x59D3,0x540D,0x8207))) + "`n" + (-join ([char[]](0x5FC5,0x8981,0x6B04,0x4F4D)))
$stepThree = (-join ([char[]](0x6309,0x5132,0x5B58,0x8CC7,0x6599,0xFF0C))) + "`n" + (-join ([char[]](0x518D,0x524D,0x5F80,0x5206,0x6790,0x9801)))
Draw-Callout 780 50 550 65 '1' $stepOne
Draw-Callout 15 295 225 97 '2' $stepTwo
Draw-Callout 1547 198 238 100 '3' $stepThree

$g.DrawLine($leader, 1065, 115, 1022, 207)
$g.DrawLine($leader, 240, 389, 263, 400)
$g.DrawLine($leader, 1547, 298, 1518, 315)
Draw-Target 1022 207
Draw-Target 263 400
Draw-Target 1518 315

$screen.Dispose()
$border.Dispose()
$leader.Dispose()
$bodyFont.Dispose()
$numberFont.Dispose()
$g.Dispose()
$canvas.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose()
Write-Output $output
