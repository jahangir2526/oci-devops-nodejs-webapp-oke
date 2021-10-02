if [ -z "$1" ]
then
	echo "Commit message is empty";
	exit;
fi

git add .
git commit -m "$1"
git pull && git push origin main 
