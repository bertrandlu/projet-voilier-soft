<?php
	

	class baliseDAO {
		private $baliseDAO, $balise, $compte;
		private $idTab = array();
		
		
		private static $_instance = null;
	 
	   /**
	    * Constructeur de la classe: Connecte à la
	    * Base de données
	    * @param void
	    * @return un objet avec une connection à la BDD
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
			$this->baliseDAO = $connexion;
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
	       self::$_instance = new baliseDAO;  
	     }
	 
	     return self::$_instance;
	   }

	   /**
	    * Fonction qui récupère les informations 
	    * des balises et les retournes.
	    *
	    * @param void
	    * @return Tableau avec les valeurs des positions des balises
	    */
	   function get_Balise(){
	   		$i =0;
	   		$tab_balise = array();
	   		$this->balise = new balise;
			$req = $this->baliseDAO->prepare('SELECT * FROM balise ');
			$req->execute();
			while ($donnees = $req->fetch())
			{
				$this->balise->setID($donnees['id']);
				$this->balise->setlong($donnees['Longitude']);
				$this->balise->setlat($donnees['Latitude']);
				$tab_balise[$i] = $this->balise;
				$i++;
			}
			return $tab_balise;
	   }

	   /**
	    * Fonction qui rentre les informations 
	    * des balises dans la base de données.
	    *
	    * @param Objet balise
	    * @return void
	    */
	   function insert_Balise($balise){
			$req = $this->baliseDAO->prepare('INSERT INTO balise(Longitude, Latitude) VALUES(:longitude, :latitude)');
			var_dump($req);
			$req->execute(array(
			    'longitude' => $balise->getlong(),
			    'latitude' => $balise->getlat()
			 ));
		}
	}
	

	
?>