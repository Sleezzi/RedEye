echo "   -> Retrieving the last update"
git pull -f --all https://github.com/Sleezzi/Blueprint-Bot.git
echo "   -> Bot Updated
   -> Downloading Modules"
npm i
echo "   -> Modules downloaded"
clear
npm start