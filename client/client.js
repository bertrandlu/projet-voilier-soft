/***************************************************/
/*	Nom:Client.js							       */			
/*	Description: Réception des données sur         */ 
/*					l'ordinateur de supervision    */
/*	Auteur: Bertrand Lu & Lucas Hélaine-Ménard     */
/*                                                 */
/*                                                 */
/****************************************************/

//Initialisation des variables
var io = require('socket.io-client');
var net = require('net');
var socket_balise = io.connect('http://192.168.1.66:8083');
var HOST = '192.168.1.66';
var mysql = require("mysql");
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projet_m1'
});


db.connect();
send_Balise();
var test = setInterval(function(){
	onRequest_info();
 }, 5000);

//Fonction de récupération des informations des voiliers
function onRequest_info() {
	var client_info = net.connect({port: 8082, host: HOST});
	client_info.on('data' , function(data){
		console.log('Reception de la trame JSON' + data);
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
			 	   console.log('Insertion dans la base de donnees' + err);
				} else{
			 	   console.log('Error while performing Query. Fonction Voilier');
				}
	   	});
	});
}

//Fonction d'envoie des données vers la BeagleBone
function send_Balise() {
  console.log('Envoi balise');
  	db.query('SELECT * FROM balise', function(err, rows, fields) {
		if (!err){
			for (var i = 0; i < rows.length; i++) {
				var trame_JSON = '{"Longitude:"'+ rows[i].Longitude + ',"Latitude:"' +  rows[i].Latitude +',"Index:"' + rows[i].id + ',"Add:"' + true +'}';
				console.log('trame JSON balise:' + trame_JSON);
			    socket_balise.emit('data', trame_JSON);
			}
		}else{
		    console.log('Error while performing Query. Fonction Balise');
		}
	});	
}


