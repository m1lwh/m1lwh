$ErrorActionPreference = 'Stop'
$base = 'https://unpkg.com/lucide-static@0.462.0/icons'
$names = @(
    'house','user','folder','gamepad-2','zap','history','cpu','terminal','mail','github',
    'send','message-circle','server','copy','check','circle-check','chevron-down','chevron-up',
    'chevron-right','search','command','languages','music','x','arrow-right','arrow-up',
    'arrow-up-right','external-link','coffee','code-xml','git-branch','layers','rocket','shield',
    'sparkles','activity','calendar','target','heart','book-open','map-pin','monitor','keyboard',
    'hard-drive','headphones','wrench','puzzle','flag','package','users','crown','award','star',
    'flame','briefcase','database','globe','moon','volume-2','volume-x','refresh-cw','play',
    'smartphone','key','download','settings','file-text','link','clock','trending-up','box','lock'
)
$outDir = 'C:\Users\mrrob\Desktop\my bio\assets\icons'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('<!-- Lucide icons (ISC license, https://lucide.dev) — assembled into a single inline sprite -->')
[void]$sb.AppendLine('<svg xmlns="http://www.w3.org/2000/svg" style="display:none">')
$missing = @()
foreach ($n in $names) {
    try {
        $content = (Invoke-WebRequest -Uri "$base/$n.svg" -UseBasicParsing -TimeoutSec 20).Content
        $m = [regex]::Match($content, '<svg[^>]*viewBox="([^"]+)"[^>]*>(.*?)</svg>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        if ($m.Success) {
            $inner = $m.Groups[2].Value
            [void]$sb.AppendLine("  <symbol id=`"i-$n`" viewBox=`"$($m.Groups[1].Value)`">")
            [void]$sb.AppendLine($inner)
            [void]$sb.AppendLine('  </symbol>')
        } else {
            $missing += $n
        }
    } catch {
        $missing += $n
    }
}
[void]$sb.AppendLine('</svg>')
$sprite = $sb.ToString()
Set-Content -Path (Join-Path $outDir 'sprite.svg') -Value $sprite -Encoding UTF8
"BUILT sprite: $($sprite.Length) bytes, $($names.Count - $missing.Count)/$($names.Count) icons"
if ($missing.Count -gt 0) { "MISSING: $($missing -join ', ')" }
