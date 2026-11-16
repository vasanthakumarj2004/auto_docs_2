Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("C:\Users\srir4\.gemini\antigravity\brain\d738ae95-f698-4527-be55-5f498de485dd\.user_uploaded\media_1794831892588_7fedd01e.jpg")

function Get-Hex($color) {
    return "#{0:X2}{1:X2}{2:X2}" -f $color.R, $color.G, $color.B
}

foreach ($y in @(240, 270, 350, 450, 600, 700, 800)) {
    $c = $bmp.GetPixel(150, $y)
    $hex = Get-Hex $c
    Write-Host ("y=" + $y + ": " + $hex + " (R:" + $c.R + ", G:" + $c.G + ", B:" + $c.B + ")")
}

$bmp.Dispose()
