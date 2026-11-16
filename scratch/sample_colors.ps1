Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("C:\Users\srir4\.gemini\antigravity\brain\d738ae95-f698-4527-be55-5f498de485dd\.user_uploaded\media_1794831892588_7fedd01e.jpg")

# Sample colors at various points on the card
# The card is in the center of the image.
# Image size:
Write-Host "Image size: $($bmp.Width) x $($bmp.Height)"

$cx = [int]($bmp.Width * 0.5)
$topY = [int]($bmp.Height * 0.3)
$midY = [int]($bmp.Height * 0.6)
$botY = [int]($bmp.Height * 0.78)

function Get-Hex($color) {
    return "#{0:X2}{1:X2}{2:X2}" -f $color.R, $color.G, $color.B
}

$cTop = $bmp.GetPixel([int]($bmp.Width * 0.4), $topY)
$cMid = $bmp.GetPixel([int]($bmp.Width * 0.2), $midY)
$cBot = $bmp.GetPixel([int]($bmp.Width * 0.5), $botY)

Write-Host "Top card color: $(Get-Hex $cTop) (R:$($cTop.R), G:$($cTop.Top), B:$($cTop.B))"
Write-Host "Mid card color: $(Get-Hex $cMid)"
Write-Host "Bot card color: $(Get-Hex $cBot)"

$bmp.Dispose()
