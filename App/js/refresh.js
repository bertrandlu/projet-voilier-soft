//Initialisation des variables
var numerobateau = null;
var idboxbateau = null;
var boxbateau = null;

$(document).ready(function(){
    $('.box').click(function(){ //Detecte le clique sur un voilier
        //On récupère l'id de la box
        idboxbateau = $(this).attr('id'); 
        //On concatène avec un # devant
        boxbateau = '#'+idboxbateau;      
        //On récupère ce qu'il y a dans le data-id     
        numerobateau = $(this).data('id'); 
    });
});


function refresh_inf(){
  if(numerobateau != null){ //Si le bateau existe
    $.ajax({
      url: 'controllers/Ajax/ajax_donnees.php', //On charge la page ajax_donnees.php
      data: { 'idbateau' :  numerobateau}, //Avec comme idbateau la variable numerobateau
      success: function(reponse) {
        $(boxbateau).html(reponse); //On affiche la page avec la donnée de la boite boxbateau rafraîchie
    }});
  }
}

setInterval("refresh_inf()", 2000); //Permet de répéter l'action (rafraîchissement) toutes les 2s
