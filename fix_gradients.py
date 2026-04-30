import os
import re

files_to_patch = {
    'src/components/Skills.tsx': [
        (r'className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-surface-light to-transparent"',
         r'className="hidden dark:block absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-surface-light to-transparent"'),
        (r'className="absolute inset-0 bg-gradient-to-br from-surface via-transparent to-transparent',
         r'className="hidden dark:block absolute inset-0 bg-gradient-to-br from-surface via-transparent to-transparent'),
        (r'className="absolute -inset-24 bg-gradient-to-br from-electric/10 to-purple-500/10',
         r'className="hidden dark:block absolute -inset-24 bg-gradient-to-br from-electric/10 to-purple-500/10')
    ],
    'src/components/About.tsx': [
        (r'className="absolute inset-0 bg-gradient-to-br from-surface to-transparent',
         r'className="hidden dark:block absolute inset-0 bg-gradient-to-br from-surface to-transparent')
    ],
    'src/components/Experience.tsx': [
        (r'className="absolute left-6 sm:left-8 top-0 w-px bg-gradient-to-b from-electric to-transparent',
         r'className="absolute left-6 sm:left-8 top-0 w-px bg-electric dark:bg-gradient-to-b dark:from-electric dark:to-transparent'),
        (r'className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-surface-light to-transparent experience-shimmer"',
         r'className="hidden dark:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-surface-light to-transparent experience-shimmer"')
    ],
    'src/components/ProjectCard.tsx': [
        (r'className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent',
         r'className="hidden dark:block absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent'),
        (r'className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent"',
         r'className="hidden dark:block absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent"'),
        (r'className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-\[#0a0a0a\]"',
         r'className="hidden dark:lg:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a]"')
    ],
    'src/components/Achievements.tsx': [
        (r'className="absolute inset-0 bg-gradient-to-br from-electric/5 via-transparent to-purple-500/5',
         r'className="hidden dark:block absolute inset-0 bg-gradient-to-br from-electric/5 via-transparent to-purple-500/5'),
        (r'className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"',
         r'className="hidden dark:block absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"')
    ],
    'src/components/ProjectModal.tsx': [
        (r'className="absolute inset-0 bg-gradient-to-t from-\[#0f0f14\] via-\[#0f0f14\]/30 to-transparent"',
         r'className="hidden dark:block absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/30 to-transparent"')
    ],
    'src/components/ui/argent-loop-infinite-slider.tsx': [
        (r'className="absolute inset-0 bg-gradient-to-b from-background via-background to-\[#0d0d0d\]"',
         r'className="hidden dark:block absolute inset-0 bg-gradient-to-b from-background via-background to-[#0d0d0d]"')
    ]
}

def patch_files():
    for filepath, patches in files_to_patch.items():
        if not os.path.exists(filepath):
            print(f"File not found: {filepath}")
            continue
            
        with open(filepath, 'r') as f:
            content = f.read()
            
        for search_str, replace_str in patches:
            if re.search(search_str, content):
                content = re.sub(search_str, replace_str, content)
                print(f"Patched {search_str[:30]}... in {filepath}")
            else:
                print(f"Could not find {search_str[:30]}... in {filepath}")
                
        with open(filepath, 'w') as f:
            f.write(content)

if __name__ == '__main__':
    patch_files()
