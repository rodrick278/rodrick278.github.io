#!/usr/bin/env sh
git add -A
git commit -m 'update'
git push git@github.com:rodrick278/rodrick278.github.io.git master
# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 添加CNAME
echo 'rodrick.cn' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:rodrick278/blog.git master:gh-pages
# git push -f git@github.com:rodrick278/rodrick278.github.io.git master
git push -f git@github.com:rodrick278/rodrick278.github.io.git master:gh-pages

cd -