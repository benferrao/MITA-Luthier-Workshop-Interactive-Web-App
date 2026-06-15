#!/bin/bash
# Cleanup script for MITA-Luthier-Workshop-Interactive-Web-App
#
# Removes confirmed-unused files:
#  - Leftover @nuxt/ui scaffold folders (nuxt-app/, ui/)
#  - Unused PNGs at public root (c_bow_0.png, c_violin_1.png)
#  - Unused image folders (public/images/tools_compressed, violins_compressed)
#  - 128 unused root-level .jpg files in public/images/
#
# This will free up roughly 195MB.
#
# USAGE:
#   1. Place this script and unused_images.txt in the root of your repo
#      (/Users/beneditoferrao/Desktop/violin-workshop/violin-workshop/MITA-Luthier-Workshop-Interactive-Web-App)
#   2. cd into that directory
#   3. Run: bash cleanup.sh
#   4. Review with: git status
#   5. Commit: git add -A && git commit -m "Remove unused scaffolds, images, and 3D assets"
#   6. Push: git push

set -e

echo "Working directory: $(pwd)"
read -p "This will delete files in the current directory. Continue? (y/n) " confirm
if [ "$confirm" != "y" ]; then
  echo "Aborted."
  exit 1
fi

# 1. Leftover Nuxt UI scaffold folders
if [ -d "nuxt-app" ]; then
  git rm -rq nuxt-app || rm -rf nuxt-app
  echo "Removed nuxt-app/"
fi

if [ -d "ui" ]; then
  git rm -rq ui || rm -rf ui
  echo "Removed ui/"
fi

# 2. Unused root PNGs
for f in public/c_bow_0.png public/c_violin_1.png; do
  if [ -f "$f" ]; then
    git rm -fq -- "$f" || rm -f -- "$f"
    echo "Removed $f"
  fi
done

# 3. Unused compressed image folders
for d in public/images/tools_compressed public/images/violins_compressed; do
  if [ -d "$d" ]; then
    git rm -rq -- "$d" || rm -rf -- "$d"
    echo "Removed $d/"
  fi
done

# 4. 128 unused root-level .jpg files (listed in unused_images.txt)
if [ ! -f "unused_images.txt" ]; then
  echo "ERROR: unused_images.txt not found in current directory. Aborting image cleanup."
  exit 1
fi

removed=0
missing=0
while IFS= read -r name; do
  [ -z "$name" ] && continue
  f="public/images/$name"
  if [ -f "$f" ]; then
    git rm -fq -- "$f" || rm -f -- "$f"
    removed=$((removed+1))
  else
    missing=$((missing+1))
  fi
done < unused_images.txt

echo ""
echo "Done."
echo "Removed $removed unused images (${missing} were already missing)."
echo ""
echo "Review changes with: git status"
echo "Then commit with:    git add -A && git commit -m 'Remove unused scaffolds, images, and dead assets'"
