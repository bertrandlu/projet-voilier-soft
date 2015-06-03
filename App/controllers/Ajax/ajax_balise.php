<?php 
		//Inclusion des fichiers dao
		require_once "../../model/include_dao.php";
		//Création d'une instance de balise 
        $baliseDAO = baliseDAO::getInstance();
        $balise = new balise();
        //Rentre les données de la balise
        $balise->setlong($_POST['longitude']);
        $balise->setlat($_POST['latitude']);
        //Insertion dans la base de données
        $baliseDAO->insert_Balise($balise);
?>