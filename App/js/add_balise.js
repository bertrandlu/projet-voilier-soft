/*****************************************/
/*		Nom: add_balise					 */
/*		Description: Envoie en Ajax la 	 */
/*		position des bouée pour l'inserer*/
/*		dans la BDD                      */
/*****************************************/
$(document).ready(function(){
	//Détecte l'appuie sur le bouton "ajouter une bouée"
	$( "#button_buoy" ).click(function() {
		//Récupération des valeurs entrées dans les champs
	  	var longitude = $('#longBuoy').val();
	  	var latitude = $('#latBuoy').val();
	  	//Vérifie si les champs sont bien remplis
		if(isNaN(longitude) == false && isNaN(latitude) == false){
			var jqxhr = $.ajax({ //Renvoie vers le fichier ajax correspondant avec les données voulues
			  method: "POST",
			  url: "controllers/Ajax/ajax_balise.php",
			  data: { longitude: longitude, latitude: latitude }
			}).done(function( msg ) { //Affichage console si l'envoi est bon
			    console.log( "Réussite envoi donnée balise" );
			  })
			.fail(function() { //Affichage console si l'envoi est mauvais
			    console.log( "Echec envoi donnée balise" );
			})
			.always(function() { //Affichage console tout le temps
			    console.log( "Envoi donnée balise" );
			});  	
		}else{ //Si les champs sont mal remplis
			alert("Erreur de saisie, veuillez recommencer");
		}
		
	});
});
