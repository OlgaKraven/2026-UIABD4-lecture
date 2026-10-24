from pathlib import Path
import json
import zipfile

root = Path(__file__).resolve().parent.parent
spec = json.loads((root / 'practice-stand/stand.json').read_text(encoding='utf-8'))
destination = root / 'public/practice' / (spec['courseId'] + '-stand.zip')
entries = []
for path in (root / 'practice-stand').iterdir():
    if path.is_file() and path.suffix in ('.ps1', '.json', '.md'):
        entries.append((path, path.name))
for path in (root / 'public/practice').iterdir():
    if path.is_file() and path.suffix in ('.sql', '.py', '.yml'):
        entries.append((path, ('sql/' if path.suffix == '.sql' else 'monitoring/') + path.name))
destination.parent.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(destination, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
    for path, name in sorted(entries, key=lambda item: item[1]):
        info = zipfile.ZipInfo(name, (2026, 10, 25, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        archive.writestr(info, path.read_bytes())
print(json.dumps({'stand': str(destination.relative_to(root)), 'files': len(entries)}))
