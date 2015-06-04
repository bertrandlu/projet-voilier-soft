/***************************************************/
/*  Nom:Server.js                                  */     
/*  Description: Serveur sur le voilier permet de  */ 
/*               communiquer avec l'ordinateur de  */
/*               supervision                       */
/****************************************************/

//Initialisation des variables
var net = require('net');
var PORT_info = 8082;
var PORT_balise = 8083;
var tab_long = ['-4.607382','-4.607704','-4.608304','-4.608304','-4.608304','-4.610697', '-4.610708', '-4.610359', '-4.609452', '-4.608288', '-4.607307'];
var tab_lat = ['48.428146','48.428559','48.428705','48.428705','48.428705', '48.429335', '48.428929', '48.428573', '48.428249', '48.427939', '48.427829'];
var i = 0

//Mise en place du serveur avec écoute sur le port 8082
var server_info = net.createServer(function(req, res){
    console.log("Connexion port 8082");
}).listen(8082);

server_info.on('connection', function(socket){
      var info_JSON = '{"id":'+ '1' +',"Longitude":'+ tab_long[i] + ',"Latitude":"'+ tab_lat[i] +'","vitesse":"'+i+'","Direction":"'+i+'","DirectionVent":"'+i+'","lastlog":"'+i+'"}'; //Création de la trame JSON
    	console.log('Envoi informations voilier:'+ info_JSON); //Affichage de la trame JSON envoyée: informations des voiliers
      socket.write(info_JSON); //Envoie de la trame JSON
    	i++;
});

//Mise en place serveur avec écoute sur le port 8083
var server_balise = require('net').createServer();
var io = require('socket.io').listen(8083);
io.sockets.on('connection', function(socket) {
  // Un client se connecte
  console.log('Connexion port 8083');
  socket.on('data', function(data) {
    // Reception des balises
    console.log('Reception balise:' + data);
  });
});

    
