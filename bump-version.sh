#!/bin/bash
# Version bump script for Swagger to Scalar extension

set -e

if [ -z "$1" ]; then
  echo "Usage: ./bump-version.sh <version>"
  echo "Example: ./bump-version.sh 1.1.0"
  exit 1
fi

VERSION=$1

# Validate version format (semantic versioning)
if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Error: Version must be in format X.Y.Z (e.g., 1.0.0)"
  exit 1
fi

echo "📦 Bumping version to $VERSION..."

# Update manifest.json
sed -i '' "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" extension/manifest.json
echo "✅ Updated extension/manifest.json"

# Update content.js header
sed -i '' "s/@version .*/@version $VERSION/" extension/content.js
echo "✅ Updated extension/content.js"

# Update README badges
sed -i '' "s/version-.*-blue/version-$VERSION-blue/" README.md
echo "✅ Updated README.md"

echo ""
echo "🎉 Version bumped to $VERSION!"
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff"
echo "  2. Commit: git add -A && git commit -m 'chore: bump version to $VERSION'"
echo "  3. Tag: git tag v$VERSION"
echo "  4. Push: git push && git push --tags"
echo ""
echo "GitHub Actions will automatically:"
echo "  - Package the extension"
echo "  - Create a release with the zip file"

