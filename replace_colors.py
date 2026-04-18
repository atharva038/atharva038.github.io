import os
import re

replacements = {
    r'from-white/5\b': 'from-surface',
    r'via-white/30\b': 'via-surface-light',
    r'text-foreground/90': 'text-foreground',
    r'text-foreground/65': 'text-muted-foreground',
    r'bg-foreground': 'bg-foreground', # Wait, actually bg-white text-background might exist
    r'border-white/\[0\.[1-9]+\]': 'border-border',
    r'from-white/\[0\.[0-9]+\]': 'from-surface',
    r'via-white/\[0\.[0-9]+\]': 'via-surface-light',
    r'group-hover:border-electric/30': 'group-hover:border-electric',
}

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for pattern, replacement in replacements.items():
        new_content = re.sub(pattern, replacement, new_content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src/components'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))
