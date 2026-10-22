with open('src/components/hero/HeroStage.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

old_block = """      {/* 1. Frosted Tag Pill matching reference video */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8ebfa]/92 border border-blue-200/80 shadow-xs mb-6 w-fit backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
        </span>
        <span className="text-xs sm:text-[13px] font-semibold text-[#2563EB] tracking-tight">
          For businesses that run on Tally, an ERP, or CargoWise
        </span>
      </div>"""

new_block = """      {/* 1. Frosted Tag Pill with High Contrast */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8eafb] border border-[#c7d2fe]/90 shadow-xs mb-6 w-fit backdrop-blur-sm select-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
        </span>
        <span className="text-xs sm:text-[13px] font-bold text-[#1e3a8a] tracking-tight">
          For businesses that run on Tally, an ERP, or CargoWise
        </span>
      </div>"""

if old_block in text:
    text = text.replace(old_block, new_block, 1)
    with open('src/components/hero/HeroStage.tsx', 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)
    print("Successfully updated HeroStage.tsx with LF")
else:
    old_crlf = old_block.replace('\n', '\r\n')
    if old_crlf in text:
        text = text.replace(old_crlf, new_block.replace('\n', '\r\n'), 1)
        with open('src/components/hero/HeroStage.tsx', 'w', encoding='utf-8', newline='\r\n') as f:
            f.write(text)
        print("Successfully updated HeroStage.tsx with CRLF")
    else:
        print("Target not found!")
