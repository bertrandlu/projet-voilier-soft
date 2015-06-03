/****************************************/
/*	Nom: Ajax_Map.js                    */
/*  Description: Affichage de la carte  */
/*  Affichage des voiliers, bouée,      */
/*  trace les déplacements des voiliers */
/****************************************/

/**************************************/
//Zone déclaration de variable
/**************************************/
var tab_position = null;
var tab_tempPos = new Array();
var tab_marker = new Array();
var map = null;
var bounds = new google.maps.LatLngBounds();

$(document).ready(function(){
	/**************************************/
	/*	Classe temp_pos                   */
	/**************************************/
	//Getter
	function getId() {
	  return this.id;
	}
	function getLatActuel() {
	  return this.latActuel;
	}
	function getLongActuel() {
	  return this.longActuel;
	}
	function getLatPrec() {
	  return this.latPrec;
	}
	function getLongPrec() {
	  return this.longPrec;
	}

	//Setter
	function setLatActuel(lat) {
	  this.latActuel = lat;
	}
	function setLongActuel(long) {
	  this.longActuel = long;
	}
	function setLatPrec(lat) {
	  this.latPrec = lat;
	}
	function setLongPrec(long) {
	  this.longPrec = long;
	}

	/*******************************************************************/
	/*Cette fonction permet de stocker la position des voiliers ainsi  */
	/*Que leurs positions précédentes								   */
	/*Cette fonction permet de tracer le déplacement des voiliers      */
	/*******************************************************************/
	function temp_pos(id, lat, long) {
	  this.id = id;
	  this.latActuel = lat;
	  this.longActuel = long;
	  this.latPrec = null;
	  this.longPrec = null;
	  this.getId = getId;
	  this.getLatActuel = getLatActuel;
	  this.getLongActuel = getLongActuel;
	  this.getLatPrec = getLatPrec;
	  this.getLongPrec = getLongPrec;
	  this.setLatActuel = setLatActuel;
	  this.setLongActuel = setLongActuel;
	  this.setLatPrec = setLatPrec;
	  this.setLongPrec = setLongPrec;
	}
	
	/**************************************/
	/*	Initialisation de la Map          */
	/**************************************/
	initialize(); 
	function initialize() {
      var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(48.429691, -4.611998) //La carte est centrée sur le lac de Ty Colo
      };
      	map = new google.maps.Map(document.getElementById('map'), mapOptions);
      	google.maps.event.addDomListener(window, 'load', initialize); //Initialisation fonction listener 
		google.maps.event.addListener(map, "rightclick", function(event) { //Detecte click droit sur la carte
	    	var lat = event.latLng.lat(); //Récupére la latitude du click
	    	var lng = event.latLng.lng(); //Récupére la longitude du click
	    	$("#latBuoy").val(lat); //Affichage dans le champs latitude
	    	$("#longBuoy").val(lng); //Affichage dans les champs longitude
		});
    }
    //Initialisation: Listener Google Map
	
    /**************************************/
	/*	         Requete AJAX             */
	/**************************************/
    //Timer toute les 1sec pour faire la requete AJAX
	var refreshId = setInterval(function() {   ajax_info();refresh_map();}, 1000);
	//Fonction Ajax: Requete JSON pour demander les positions des voiliers
	function ajax_info(){
			var jqxhr = $.getJSON( 'controllers/Ajax/ajax_position.php', function(json) { //Demande informations en AJAX
			  console.log( "success" ); //Affichage console si l'envoi est bon
			  tab_position = json;
			}).done(function() {
			    console.log( "second success" ); //Affichage console si l'envoi est bon
			  }).fail(function() {
			    console.log( "error" ); //Affichage console si l'envoi est mauvais
			  }).always(function() {
			    console.log( "complete" ); //Affichage console toujours lorsqu'il y a un envoi
			  }); 
    }

    //Fonction: Refresh l'affichage de la Google MAP
    function refresh_map(){
		var i = 1;
		if(tab_position != null){	
			while(tab_position[i] != null){
				if(tab_marker[tab_position[i]['id']] == null){ //On vérifie l'id 
					add_marker(i); //On créer & affiche le marker
					var objectPos = new temp_pos(tab_position[i]['id'], tab_position[i]['lat'], tab_position[i]['long']); //Création d'un nouveau objet temp_pos 
					tab_tempPos[i] = objectPos; //On intégre le nouvelle objet temp_pos créer dans le tableau tab_tempPos
				}else{
					tab_tempPos[i].setLatActuel(tab_position[i]['lat']); //On ajoute une nouvelle latitude
					tab_tempPos[i].setLongActuel(tab_position[i]['long']); //On ajoute une nouvelle longitude
					if((tab_tempPos[i].getLatActuel() != tab_tempPos[i].getLatPrec() || tab_tempPos[i].getLongActuel() != tab_tempPos[i].getLongPrec())){
						if(tab_tempPos[i].getLatPrec() != null || tab_tempPos[i].getLongPrec() != null){ //On verifie que les coordonnes précedentes ne sont pas nulles
							draw_polyline(i); 
							addLine(); //On créer un nouveau trait qui vas de l'ancienne position à la nouvelle
						}
						tab_tempPos[i].setLatPrec(tab_tempPos[i].getLatActuel());
						tab_tempPos[i].setLongPrec(tab_tempPos[i].getLongActuel());
						tab_marker[tab_position[i]['id']].setMap( null); //On efface l'ancien marker
						add_marker(i); //On ajoute un nouveau marker à la nouvelle position
					}
				}
				i++;
			}
		}
	}

    /**************************************/
	/*	         Autres fonctions:        */
	/*		Marker & Polyne               */ 	
	/**************************************/
	//Fonction affiche un nouveau marker: Pour les voiliers
	function add_marker(i){
		var myLatLng = new google.maps.LatLng(tab_position[i]['lat'],tab_position[i]['long']);
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			animation: google.maps.Animation.DROP,
			title: tab_position[i]['id']
		});
		var num_id = tab_position[i]['id'];
		tab_marker[num_id] = marker;
	}

	//Fonction trace une ligne entre les coordonnees precedente & actuel
	function draw_polyline(i){
		flightPlanCoordinates = [
			new google.maps.LatLng(tab_tempPos[i].getLatActuel(), tab_tempPos[i].getLongActuel()),
			new google.maps.LatLng(tab_tempPos[i].getLatPrec(), tab_tempPos[i].getLongPrec())
		];
		flightPath = new google.maps.Polyline({
			path: flightPlanCoordinates,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2
		});
	}

	//Fonction ajoute une ligne
	function addLine() {
	  flightPath.setMap(map);
	}
	
	/**************************************/
	/*	         Fonctions Balises        */
	/*		Création & suppression        */ 	
	/**************************************/

	//Detecte click pour création d'une balise
	$( "#button_buoy" ).click(function() {
	  	var lat = $("#latBuoy").val();
		var long = $("#longBuoy").val();
		//Vérifie les valeurs saisies
		if(isNaN(lat) == false && isNaN(long) == false){
			add_buoy(lat, long); //Ajout d'une balise
		}else{
			alert("Les valeurs entrées ne sont pas correctes");
		}
	});

	//Fonction pour créer une nouvelle balise
	function add_buoy(lat, long){
		var pinColor = "FFF";
    	var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
		var myLatLng = new google.maps.LatLng(lat,long); //Position du marker pour la balise
		var markerBuoy = new google.maps.Marker({
			position: myLatLng,
			map: map,
			animation: google.maps.Animation.DROP,
			icon: pinImage,
			title:"balise"
		});
		google.maps.event.addListener(markerBuoy, 'click', function() { //Instanciation Listener lorsque l'on clique sur une balise
	    	this.setMap( null); //Supression de la balise
  		});
	}
	
	

});
 

