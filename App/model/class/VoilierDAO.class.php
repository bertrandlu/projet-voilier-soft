<?php
	

	class bdd {
		private $bdd, $voilier, $compte;
		private $idTab = array();
		
		private static $_instance = null;
	 
	   /**
	    * Constructeur de la classe: 
	    *
	    * @param void
	    * @return void
	    */
	   private function __construct() {  
	   	try
			{
				$connexion = new PDO('mysql:host=localhost;dbname=projet_m1;charset=utf8', 'root', '');
				$connexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);
				$connexion->exec('SET NAMES utf8');
			}
			catch (Exception $e)
			{
				echo 'Erreur : '.$e->getMessage().'<br />';
				echo 'N° : '.$e->getCode();
				die();
			}
			$this->bdd = $connexion;
			return $connexion;
	   }
	 
	   /**
	    * Méthode qui crée l'unique instance de la classe
	    * si elle n'existe pas encore puis la retourne.
	    *
	    * @param void
	    * @return Singleton
	    */
	   public static function getInstance() {
	 
	     if(is_null(self::$_instance)) {
	       self::$_instance = new bdd();  
	     }
	 
	     return self::$_instance;
	   }

		/**
	    * Fonction qui récupère le nombre d'ids différents
	    * dans la base de données.
	    *
	    * @param void
	    * @return Nombre d'ids différents
	    */
		function get_nbID()
		{
	    	$req = $this->bdd->prepare('SELECT count(DISTINCT id) FROM voilier');
			$req->execute();
			$this->compte = $req->fetch();
			return $this->compte[0];
		}

		/**
	    * Fonction qui récupère tous les ids différents 
	    * dans la base de données et les mets dans un tableau.
	    *
	    * @param void
	    * @return Tableau des ids différents
	    */
		function get_allID(){
			$i=0;
			$req = $this->bdd->prepare('SELECT DISTINCT id FROM voilier');
			$req->execute();
			while ($nbid = $req->fetch())
			{
				$this->idTab[$i] = $nbid['id'];
				$i++;
			}
			return $this->idTab;
		}

		/**
	    * Fonction qui récupère la dernière information 
	    * correspondante au voilier et la retournes.
	    *
	    * @param id du voilier voulu
	    * @return Tableau avec les valeurs du voilier correspondant
	    */
		function aff_inf($id_v){
			$this->voilier = new voilier;
			$req = $this->bdd->prepare('SELECT * FROM voilier WHERE id = ? ORDER BY dateinfo DESC LIMIT 1');
			$req->execute(array($id_v));
			while ($donnees = $req->fetch())
			{
				$this->voilier->setID($donnees['id']);
				$this->voilier->setdate($donnees['dateinfo']);
				$this->voilier->setlong($donnees['longitude']);
				$this->voilier->setlat($donnees['latitude']);
				$this->voilier->setvit($donnees['vitesse']);
				$this->voilier->setfor($donnees['force_vent']);
				$this->voilier->setdir($donnees['direction_vent']);
				
			}
			return $this->voilier;
		}

		/**
	    * Fonction qui récupère les 10 dernières informations 
	    * dans la base de données et les mets dans un tableau
	    * puis l'affiche.
	    *
	    * @param id du voilier
	    * @return Affichage des données sur la page
	    */
		function recup_log_prec($id_v, $nblignes){
			$this->voilier = new voilier;
			$req = $this->bdd->prepare('SELECT * FROM voilier WHERE id = ? ORDER BY dateinfo DESC LIMIT 10');
			$req->execute(array($id_v));

			while ($donnees = $req->fetch())
			{
				$this->voilier->setID($donnees['id']);
				$this->voilier->setdate($donnees['dateinfo']);
				$this->voilier->setlong($donnees['longitude']);
				$this->voilier->setlat($donnees['latitude']);
				$this->voilier->setvit($donnees['vitesse']);
				$this->voilier->setfor($donnees['force_vent']);
				$this->voilier->setdir($donnees['direction_vent']);

           		echo "<div class=\"tableau\">
					<p>
						<span class=\"cola\">Bateau : ".$this->voilier->getID()."</span>
						<span class=\"colb\">Date : ".$this->voilier->getdate()."</span>
						<span class=\"colc\">Long : ".$this->voilier->getlong()."</span>
						<span class=\"cold\">Lat : ".$this->voilier->getlat()."</span>
						<span class=\"cole\">Vitesse : ".$this->voilier->getvit()."</span>
						<span class=\"colf\">Cap : ".$this->voilier->getfor()."</span>
						<span class=\"colg\">Direction du vent : ".$this->voilier->getdir()."</span>
					</p>
				 </div>";
			}
		}

		/**
	    * Fonction qui récupère le tableau des données
	    * et l'affiche.
	    *
	    * @param Tableau des données du voilier
	    * @return Affichage des données sur la page
	    */
		function affichage($tableau){
			echo "<div id=\"".$tableau->getID()."\" class=\"box\" data-id=\"".$tableau->getID()."\" >
            		<h3>Bateau n°".$tableau->getID()."</h3>
            		<div class=\"container_info\">
            			<p>
            				<span class=\"col1\">Date : ".$tableau->getdate()."</span>
            			</p>
            			<p>
            				<span class=\"col2\">Long : ".$tableau->getlong()."</span>
							<span class=\"col3\">Lat : ".$tableau->getlat()."</span>
						</p>
						<p>
							<span class=\"col4\">Vitesse : ".$tableau->getvit()."</span>
						</p>
						<p>
							<span class=\"col5\">Cap : ".$tableau->getfor()."</span>
							<span class=\"col6\">Direction du vent : ".$tableau->getdir()."</span>
						</p>
					 </div>
				</div>";
		}

		/**
	    * Fonction qui récupère le tableau des données 
	    * et l'affiche avec les données rafraichies.
	    *
	    * @param Tableau des données
	    * @return Affichage des données sur la page
	    */
		function refresh_affichage($tableau){ //Raffraîchissement de l'affichage
			    echo "<h3>Bateau n°".$tableau->getID()."</h3>
           			 <div class=\"container_info\">
						<p>
            				<span class=\"col1\">Date : ".$tableau->getdate()."</span>
            			</p>
            			<p>
            				<span class=\"col2\">Long : ".$tableau->getlong()."</span>
							<span class=\"col3\">Lat : ".$tableau->getlat()."</span>
						</p>
						<p>
							<span class=\"col4\">Vitesse : ".$tableau->getvit()."</span>
						</p>
						<p>
							<span class=\"col5\">Cap : ".$tableau->getfor()."</span>
							<span class=\"col6\">Direction du vent : ".$tableau->getdir()."</span>
						</p>
					</div>";
		}

		/**
	    * Fonction qui permet de récupérer les derniéres infos 
	    * d'un voilier 
	    *
	    * @param Id du voilier
	    * @return retourne un objet voilier 
	    */
		function info_voilier($id_v){

			$this->voilier = new voilier;
			$req = $this->bdd->prepare('SELECT * FROM voilier WHERE id = ? ORDER BY dateinfo DESC LIMIT 1');
			
				$req->execute(array($id_v));
				while ($donnees = $req->fetch())
				{
					$this->voilier->setID($donnees['id']);
					$this->voilier->setlong($donnees['longitude']);
					$this->voilier->setlat($donnees['latitude']);
				}
				
				return $this->voilier;
		}
	}
	
	
?>