# projet-voilier-soft

Readme :

Ce dossier comporte les différents fichiers développés pour notre projet.
Prérequis : Wamp, Node JS
Explication des dossiers :
* Dossier APP : Comporte tous les fichiers ainsi que les informations permettant d’utiliser l’application de visualisation. Ce fichier est un site web et doit être déployé dans le dossier « www » de votre serveur.
* Dossier Client : Comporte tous les fichiers qui permettent de communiquer avec les serveurs situés sur les voiliers. Il est composé du fichier « client.js » qui permet de récupérer les informations envoyées par le serveur du port 8082 qui sont celles relatives aux positions GPS du voilier ainsi que sa vitesse, le cap du voilier ainsi que la direction du vent. Sur le port 8083, il envoie les balises entrées par l’utilisateur vers les voiliers.
* Dossier Serveur : Comporte des fichiers tels que le serveur utilisés pour faire les tests de communication avec l’application de visualisation des données. Le serveur du port 8082 envoie les informations du voilier vers le client lorsque celui-ci le demande, ainsi que sur le port 8083 afin de récupérer les positions des balises.
* Dossier BDD :   Comporte les tables devant être importées dans votre base de données afin de pouvoir utiliser l’application.
1) Insertion des tables dans la base de données :

1. Mettre en marche WAMP et aller à l’adresse  « localhost/phpmyadmin ».
2. Créer une nouvelle base de données
3. Importer les tables « voilier » et « balise » dans votre nouvelle base de données.
2) Mise en place de l’interface de visualisation :

1. Mettre le dossier « App » dans le fichier « www » de l’application Wamp.
2. Pour établir la connexion entre l’interface de visualisation et la base de données, il vous suffit de modifier dans le fichier « voilierDAO.class » ainsi que dans le fichier « baliseDAO.class » la connexion à la base de données dans le constructeur. Changer le nom de la base de données en fonction de celui que vous avez choisis ainsi que l’identifiant de connexion et le mot de passe.
3. Tester avec votre navigateur en allant à l’adresse : « localhost/app »


3) Mise en place du serveur de test – client :

Mettre l’application « serveur.js », faisant office de serveur de test sur une autre machine, dans le fichier « client.js ». Modifier l’adresse IP du serveur en fonction de la machine où se situe le serveur de test. Pour faire fonctionner le client, utiliser la commande :
	Node client.js
Et pour le serveur de test :
	Node server.js
Utilisation de Node JS :

Rappel commande sur Windows 8.1 :
cdCette commande permet de se déplacer dans l’arborescence des fichiersdirCette commande permet de voir ce qu’il y a dans le fichier où l’on se situe
	Pour utiliser Node JS il faut tout d’abord ouvrir un invité de commande. Lorsque l’invité de commande est ouvert il  suffit de vous diriger vers le fichier où se trouve le client ou le serveur avec la commande « cd ».  Lorsque vous êtes dans les dossiers « client » ou « serveur » utiliser une des deux commandes « node client.js » ou « node server.js » afin d’utiliser le client ou bien pour mettre en route le serveur.
	S’il y a un message d’erreur, réinstaller la bibliothèque socket.io avec l’aide de la commande « npm install socket.io », ainsi que la bibliothèque socket.io-client avec la commande « npm install socket.io-install ».

Utilisation de Wamp :

	Après avoir installé Wamp mettre en route le logiciel et vérifier que le serveur Apache est bien en ligne, alors l’icône Wamp s’affiche en vert. Lorsque Wamp est bien mis en place  créer une nouvelle base de données et rajouter les tables « Voilier » et « Balise ».



