<?php
	//Inclusion des fichiers dao
	require_once "../../model/include_dao.php";
	//Créer une instance de la base de données
	$bdd = bdd::getInstance();
	//Récupère le nombre de voilier
    $nb_voiliers = $bdd->get_nbID();
    //Boucle pour récupérer les données du voilier
    for ($i = 1; $i <= $nb_voiliers; $i++){
    	$voilier = $bdd->info_voilier($i);
   		$tab_voiliers[$i] = array("id" => $voilier->getId(),"long" => $voilier->getLong(), "lat" => $voilier->getLat());
    }
    //Récupère les infos dans une trame JSON
    echo json_encode($tab_voiliers);
    
?>