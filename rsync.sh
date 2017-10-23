#!/bin/sh

sshremote=root@39.108.218.145

pro_multi="mulit_ak"
pro_spa="spa_ak"

test_pre="/144-"
prod_pre="/179-"
base_path="/var/lib/jenkins/workspace"

env=$1
project=$2

path=""
if [ $env == "prod" ] 
then
	path=$base_path$prod_pre
else
	path=$base_path$test_pre
fi

public="/public/"
if [ $project == "multi_ak" ]; then
	path=$path$pro_multi$public
	public="/public_oxy/"
	rsync -rlptDvz -e ssh --rsync-path='sudo rsync' $sshremote:$path .$public
else
	path_zsb=$path$pro_zsb$public
	rsync -rlptDvz -e ssh --rsync-path='sudo rsync' $sshremote:$path_zsb .$public
    path_fy=$path$pro_fy"/dist/index.html"
    echo $path_fy
    rsync -rlptDvz -e ssh --rsync-path='sudo rsync' $sshremote:$path_fy ./public/views/index.html
fi