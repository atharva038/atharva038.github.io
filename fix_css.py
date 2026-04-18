with open("src/index.css", "r") as f:
    content = f.read()

content = content.replace("@utility glass {", ".glass {")
content = content.replace("@utility glass-panel {", ".glass-panel {")
content = content.replace("@utility glass-button {", ".glass-button {")

with open("src/index.css", "w") as f:
    f.write(content)
