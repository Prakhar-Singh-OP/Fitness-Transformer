from pathlib import Path
import re
p = Path('src/data/workouts.ts')
text = p.read_text(encoding='utf-8')
files = sorted(set(re.findall(r"video3DAnimationPath\('([^']+)'\)", text)))
print(len(files))
print('\n'.join(files))
