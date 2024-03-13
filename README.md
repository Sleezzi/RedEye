# RedEye - The OpenSource Discord bot
## How to use RedEye?
To use RedEye you can add it [here](https://redeye.sleezzi.fr)

## Help
If you need help, you can ask for it on [our Discord](https://redeye.sleezzi.fr/server). You can ask for help from the community, the developer and the server administrator.

## Frequently asked question
### I want to modify and share RedEye, do I have the right?
Of course, RedEye is an OpenSource bot, you can modify, use and share RedEye. However, there are some conditions to respect:
- Do not use RedEye for adult content;
- Do not sell RedEye, if you want to share it it must be free;
- You must credit <b>Sleezzi</b> as the original author

**Avant de lancer le bot, vérifier que vous avez bien complété le fichier *config.json***

## Folder/File Tree
/[events](/events/)/ => *Contains all files for events*
<br>/[commands](/commands/)/ => *Contains 2 folders relating to commands*
<br>/[contextMenu](/contextMenu//)/ => *Contains 2 folders relating to orders*
<br> ├ [prefix](/commands/prefix/)/ => *Contains all prefix type commands (by default the prefix is!)*
<br>   └ [slash](/commands/slash/)/ => *Contains all application type commands (the one used with /)*
<br>/[components](/components/)/ => *Contains all the "practical" files, it makes development easier*
<br>/[cdn](/cdn/)/ => *Contains 2 folders*
<br>   ├ [img](/cdn/img/)/ => *The images, most of them are on the Internet, but sometimes the modules require them to be local*
<br>   └ [fonts](/cdn/fonts/)/ => *Fonts for Canvas*
<br>/[index.js](/index.js) => The main file, it will be executed first
<br>/[config.json](/config.json) => This is the file that contains the tokens. **It needs to be completed.**
# License
CC BY-NC