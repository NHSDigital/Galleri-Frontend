git checkout -b "gal-$1/$2" develop
currBranch= git rev-parse --symbolic-full-name --abbrev-ref HEAD
echo "Created: $currBranch"
git push $currBranch
echo "Pushing: $currBranch"
