<?php 
		//Inclusion des fichiers dao
		require_once "../../model/include_dao.php";
		//Créer une instance de la base de données
        $bdd = bdd::getInstance();
        //Récupère les données avec le bon idbateau
        $resultatdonnees = $bdd->aff_inf($_GET['idbateau']);
        //Affiche ces données 
      	$bdd->refresh_affichage($resultatdonnees); 
?>