//Initialisation des variables
var numerobateau = null;

$(document).ready(function(){
    $('.box').click(function(){
        numerobateau = $(this).data('id'); //On récupère ce qu'il y a dans le data-id
    });
});

function refresh_logs(){
  if(numerobateau != null){ //Si le bateau existe
    var nblignes = Math.floor($('#container-logs').height() / 31);
    $.ajax({
      url: 'controllers/Ajax/ajax_refresh_logs.php', //On charge la page ajax_refresh_logs.php
      data: { 'idbateau' :  numerobateau, 'nblignes': nblignes}, //Avec comme idbateau la variable numerobateau
      success: function(reponse) {
        $('#container-logs').html(reponse); //On affiche les logs rafraîchis
      }
    });
  }
}

setInterval("refresh_logs()", 2000); //Permet de répéter l'action (rafraîchissement) toutes les 2s
