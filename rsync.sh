#!/bin/sh

sshremote=root@39.108.218.145

multi_pro_name="mulit_ak"
spa_pro_name="spa_ak"

test_pre="/test_"
prod_pre="/prod_"
qa_pre="/qa_"
base_path="/home/appian/workspace"

env=$1
project=$2

path=$base_path/$env_
public="/public/"
dist="/dist/"

if [ $project == "multi_ak" ]; then
	path=$path$multi_pro_name$public
	echo $path
	rsync -rlptDvz -e ssh --rsync-path='sudo rsync' $sshremote:$path ./public/
else if [ $project == "spa_ak" ]; then
	path=$path$spa_pro_name$dist
	rsync -rlptDvz -e ssh --rsync-path='sudo rsync' $sshremote:$path ./dist/
    path_dist=$path/index.html
    echo $path_dist
    rsync -rlptDvz -e ssh --rsync-path='sudo rsync' $sshremote:$path_dist ./public/views/index.html
fi