Add-Type -AssemblyName System.Drawing
$dir = "s:\docsynecx\auto_docs_2\public\images\events"
if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force }

$p1 = "C:\Users\srir4\.gemini\antigravity\brain\d738ae95-f698-4527-be55-5f498de485dd\.user_uploaded\media_1794830615271_dd38bca4.png"
$b1 = New-Object System.Drawing.Bitmap($p1)
$b1.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone)
$b1.Save("$dir\iics_invitation_front.png", [System.Drawing.Imaging.ImageFormat]::Png)
$b1.Dispose()

$p2 = "C:\Users\srir4\.gemini\antigravity\brain\d738ae95-f698-4527-be55-5f498de485dd\.user_uploaded\media_1794830615274_50af8637.png"
$b2 = New-Object System.Drawing.Bitmap($p2)
$b2.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone)
$b2.Save("$dir\iics_invitation_back.png", [System.Drawing.Imaging.ImageFormat]::Png)
$b2.Dispose()

$p3 = "C:\Users\srir4\.gemini\antigravity\brain\d738ae95-f698-4527-be55-5f498de485dd\.user_uploaded\media_1794830615276_7d947293.png"
Copy-Item $p3 "$dir\iics_cargo_logo.png" -Force

Write-Host "Images processed successfully"
