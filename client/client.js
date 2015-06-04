/***************************************************/
/*	Nom:Client.js							       */			
/*	Description: Réception des données sur         */ 
/*					l'ordinateur de supervision    */
/*	Auteur: Bertrand Lu & Lucas Hélaine-Ménard     */
/****************************************************/

//Initialisation des variables
var io = require('socket.io-client');
var net = require('net');
var mysql = require("mysql");

var socket_balise = io.connect('http://192.168.1.66:8083'); //Adresse IP du serveur ainsi que le numéro de port
var HOST = '192.168.1.66'; //Adresse IP du serveur
var db = mysql.createConnection({ //Information de connection à la base de données
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projet_m1'
});


db.connect(); //Connection à la base de données
send_Balise(); //Appel de la fonction pour envoyer les balises
var test = setInterval(function(){ //Fonction onRequest_info utiliser toute les 5 secondes
	onRequest_info();
 }, 5000);

//Fonction de récupération des informations des voiliers
function onRequest_info() {
	var client_info = net.connect({port: 8082, host: HOST});
	client_info.on('data' , function(data){
		//Recuperation + parsage des data du serveur
		var info = data.toString("utf-8");
		var json = JSON.stringify(eval("(" + info + ")"));
		var info_objet = JSON.parse(info);
	  	if(HOST == '192.168.1.66'){
	  		var id = '1' 
	  	}else{
	  		var id = '2'
	  	}
		//Création format date
		Number.prototype.padLeft = function(base,chr){
		   var  len = (String(base || 10).length - String(this).length)+1;
		   return len > 0? new Array(len).join(chr || '0')+this : this;
		}
		var d = new Date();
		var dformat = [ d.getFullYear(),
		                (d.getMonth()+1).padLeft(),
		                d.getDate().padLeft()].join('-')+' ' +
		              [ d.getHours().padLeft(),
		                d.getMinutes().padLeft(),
		                d.getSeconds().padLeft()].join(':');

		//Connection à la BDD: Insertion dans la BDD 
		db.query('INSERT INTO voilier (id, dateinfo, longitude, latitude, vitesse, force_vent, direction_vent) VALUES (?,?,?,?,?,?,?)',[id,dformat,info_objet.Longitude, info_objet.Latitude,  info_objet.Vitesse  , info_objet.Direction, 'SE'], function(err, rows, fields) {
				if (!err){
			 	   console.log('Insertion dans la base de donnees' + err); //Succés insertion dans la base de données
				} else{
			 	   console.log('Error while performing Query. Fonction Voilier'); //Echec d'insertion dans la base de données
				}
	   	});
	});
}

//Fonction d'envoie des données vers la BeagleBone
function send_Balise() {
  	db.query('SELECT * FROM balise', function(err, rows, fields) { // Récupération de toutes les balises
		if (!err){
			for (var i = 0; i < rows.length; i++) {
				var trame_JSON = '{"Longitude:"'+ rows[i].Longitude + ',"Latitude:"' +  rows[i].Latitude +',"Index:"' + rows[i].id + ',"Add:"' + true +'}'; //Création de la trame JSON
				console.log('trame JSON balise:' + trame_JSON); //Affichage de la trame JSON envoyée: informations des balises
			    socket_balise.emit('data', trame_JSON); //Envoie la trame JSON
			}
		}else{
		    console.log('Error while performing Query. Fonction Balise'); //Message d'erreur
		}
	});	
}


