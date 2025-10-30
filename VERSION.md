# Version Management

## Quick Version Bump

Use the included script to bump versions automatically:

```bash
./bump-version.sh 1.1.0
```

This updates:
- `extension/manifest.json`
- `extension/content.js` header
- `README.md` version badge

## Automated Release (GitHub Actions)

When you push a version tag, GitHub Actions automatically:
1. Packages the extension
2. Creates a GitHub release
3. Attaches the zip file

### Release Workflow

```bash
# 1. Bump version
./bump-version.sh 1.1.0

# 2. Commit changes
git add -A
git commit -m "chore: bump version to 1.1.0"

# 3. Create and push tag
git tag v1.1.0
git push && git push --tags
```

GitHub Actions will handle the rest! ✨

## Manual Version Bump

If you prefer manual updates:

1. Update `extension/manifest.json`:
   ```json
   "version": "1.1.0"
   ```

2. Update `extension/content.js`:
   ```javascript
   * @version 1.1.0
   ```

3. Update `README.md` badge:
   ```markdown
   ![Version](https://img.shields.io/badge/version-1.1.0-blue)
   ```

## Semantic Versioning

Follow [semver](https://semver.org/):

- **Major** (X.0.0): Breaking changes
- **Minor** (1.X.0): New features, backwards compatible
- **Patch** (1.0.X): Bug fixes, no new features

Examples:
- Bug fix: `1.0.0` → `1.0.1`
- New toggle feature: `1.0.1` → `1.1.0`
- Breaking API change: `1.1.0` → `2.0.0`

