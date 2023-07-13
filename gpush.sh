git add .
git commit -m "$1"
currBranch= git rev-parse --symbolic-full-name --abbrev-ref HEAD
git push $currBranch
echo "Pushed:$currBranch \nMessage:$1"
