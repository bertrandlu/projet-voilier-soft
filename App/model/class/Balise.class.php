<?php
//Classe Balise
class balise {
  //Variables de la balise
  private $id, $longitude,$latitude;

  //Getter de la classe balise
  public function getID() {
      return $this->id;
  }
  public function getlong() {
      return $this->longitude;
  }
  public function getlat() {
      return $this->latitude;
  }

  //Setter de la classe balise
  public function setID($id) {
      $this->id = $id;  
  }
  public function setlong($longitude) {
      $this->longitude = $longitude;  
  }
  public function setlat($latitude) {
      $this->latitude = $latitude;  
  }



}
?>