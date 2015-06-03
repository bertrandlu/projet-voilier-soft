<?php 
		//Inclusion des fichiers dao
		require_once "../../model/include_dao.php";
		//Créer une instance de la base de données
        $bdd = bdd::getInstance();
        //Récupère les données précédentes avec le bon idbateau et les affiches
        $bdd->recup_log_prec($_GET['idbateau'],$_GET['nblignes']); 
?>