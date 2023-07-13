git add .
git commit -m "$1"
currBranch= git rev-parse --symbolic-full-name --abbrev-ref HEAD
git push --set-upstream origin $currBranch
