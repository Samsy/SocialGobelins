SocialGobelins
==============

A social sprite-animated interface

(NOTE : Pour tester la branche "optimization/clustering" - qui permet d'utiliser tous les coeurs du processeur, il faut lancer l'app sous un système Linux avec redis-server installé).

##Installation :

Pour Windows, utiliser l'interpréteur Node.js. Pour Linux/Mac OS X, utiliser la console directement.

Se rendre dans le dossier du projet et installer les dépendances avec npm :

```npm install```

##Lancer l'application :

```node ./index.js```

Par défaut les requêtes sont écoutées sur le port 3700 et sur l'adresse locale (127.0.0.1). Pour modifier le port d'écoute, modifier le fichier index.js :

```
var port = 4200;
``` 
        
Pour utiliser l'application avec d'autres postes du réseau, modifier l'adresse du serveur dans les fichiers envoyés au client,
par exemple si l'application tourne sur le poste ayant l'ip 192.168.1.42 (et écoute sur le port 4200) :
        
####public/index.html :   
        
```html
<script src="http://192.168.1.42:4200/socket.io/socket.io.js"></script>
```
```js

//...
var socket = io.connect('http://192.168.1.42:4200');
//...
```

####public/chat.js : 
        
```js
//...
var socket = io.connect('http://192.168.1.42:4200');
//...
 ```





