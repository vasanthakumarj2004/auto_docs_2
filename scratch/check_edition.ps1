Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("s:\docsynecx\auto_docs_2\public\images\events\iics_invitation_front.png")
Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"
$bmp.Dispose()
