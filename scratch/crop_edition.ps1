Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("s:\docsynecx\auto_docs_2\public\images\events\iics_invitation_front.png")
# Let's crop a few sections: bottom 200px and left 100px
$rect1 = [System.Drawing.Rectangle]::new(0, $bmp.Height - 300, $bmp.Width, 300)
$crop1 = $bmp.Clone($rect1, $bmp.PixelFormat)
$crop1.Save("s:\docsynecx\auto_docs_2\scratch\crop_bottom.png", [System.Drawing.Imaging.ImageFormat]::Png)
$crop1.Dispose()
$bmp.Dispose()
Write-Host "Crop bottom saved successfully"
