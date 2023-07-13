git checkout -b "gal-$1/$2" develop
currBranch= git rev-parse --symbolic-full-name --abbrev-ref HEAD
echo $currBranch
