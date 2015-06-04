# projet-voilier-soft

Readme�:

Ce dossier comporte les diff�rents fichiers d�velopp�s pour notre projet.
Pr�requis�: Wamp, Node JS
Explication des dossiers�:
* Dossier APP�: Comporte tous les fichiers ainsi que les informations permettant d�utiliser l�application de visualisation. Ce fichier est un site web et doit �tre d�ploy� dans le dossier ��www�� de votre serveur.
* Dossier Client�: Comporte tous les fichiers qui permettent de communiquer avec les serveurs situ�s sur les voiliers. Il est compos� du fichier ��client.js�� qui permet de r�cup�rer les informations envoy�es par le serveur du port 8082 qui sont celles relatives aux positions GPS du voilier ainsi que sa vitesse, le cap du voilier ainsi que la direction du vent. Sur le port 8083, il envoie les balises entr�es par l�utilisateur vers les voiliers.
* Dossier Serveur�: Comporte des fichiers tels que le serveur utilis�s pour faire les tests de communication avec l�application de visualisation des donn�es. Le serveur du port 8082 envoie les informations du voilier vers le client lorsque celui-ci le demande, ainsi que sur le port 8083 afin de r�cup�rer les positions des balises.
* Dossier BDD�:   Comporte les tables devant �tre import�es dans votre base de donn�es afin de pouvoir utiliser l�application.
1) Insertion des tables dans la base de donn�es :

1. Mettre en marche WAMP et aller � l�adresse  ��localhost/phpmyadmin��.
2. Cr�er une nouvelle base de donn�es
3. Importer les tables ��voilier � et ��balise�� dans votre nouvelle base de donn�es.
2) Mise en place de l�interface de visualisation�:

1. Mettre le dossier ��App�� dans le fichier ��www�� de l�application Wamp.
2. Pour �tablir la connexion entre l�interface de visualisation et la base de donn�es, il vous suffit de modifier dans le fichier ��voilierDAO.class�� ainsi que dans le fichier ��baliseDAO.class�� la connexion � la base de donn�es dans le constructeur. Changer le nom de la base de donn�es en fonction de celui que vous avez choisis ainsi que l�identifiant de connexion et le mot de passe.
3. Tester avec votre navigateur en allant � l�adresse�: ��localhost/app��


3) Mise en place du serveur de test�� client�:

Mettre l�application ��serveur.js��, faisant office de serveur de test sur une autre machine, dans le fichier ��client.js��. Modifier l�adresse IP du serveur en fonction de la machine o� se situe le serveur de test. Pour faire fonctionner le client, utiliser la commande�:
	Node client.js
Et pour le serveur de test�:
	Node server.js
Utilisation de Node JS�:

Rappel commande sur Windows 8.1�:
cdCette commande permet de se d�placer dans l�arborescence des fichiersdirCette commande permet de voir ce qu�il y a dans le fichier o� l�on se situe
	Pour utiliser Node JS il faut tout d�abord ouvrir un invit� de commande. Lorsque l�invit� de commande est ouvert il  suffit de vous diriger vers le fichier o� se trouve le client ou le serveur avec la commande ��cd��.  Lorsque vous �tes dans les dossiers ��client�� ou ��serveur�� utiliser une des deux commandes ��node client.js�� ou ��node server.js�� afin d�utiliser le client ou bien pour mettre en route le serveur.
	S�il y a un message d�erreur, r�installer la biblioth�que socket.io avec l�aide de la commande ��npm install socket.io��, ainsi que la biblioth�que socket.io-client avec la commande ��npm install socket.io-install��.

Utilisation de Wamp�:

	Apr�s avoir install� Wamp mettre en route le logiciel et v�rifier que le serveur Apache est bien en ligne, alors l�ic�ne Wamp s�affiche en vert. Lorsque Wamp est bien mis en place  cr�er une nouvelle base de donn�es et rajouter les tables ��Voilier�� et ��Balise��.



