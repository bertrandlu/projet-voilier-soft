<?php

//Classe Voilier
class voilier {
  //Variable privée de la classe Voilier
  private $id,$dateinfo,$longitude,$latitude,$vitesse,$force_vent,$direction_vent;

  //Getter de la classe Voilier
  public function getID() {
      return $this->id;
  }
  public function getdate() {
      return $this->dateinfo;
  }
  public function getlong() {
      return $this->longitude;
  }
  public function getlat() {
      return $this->latitude;
  }
  public function getvit() {
      return $this->vitesse;
  }
  public function getfor() {
      return $this->force_vent;
  }
  public function getdir() {
      return $this->direction_vent;
  }

  //Setter de la classe Voilier
  public function setID($id) {
      $this->id = $id;  
  }
  public function setdate($dateinfo) {
      $this->dateinfo = $dateinfo;  
  }
  public function setlong($longitude) {
      $this->longitude = $longitude;  
  }
  public function setlat($latitude) {
      $this->latitude = $latitude;  
  }
  public function setvit($vitesse) {
      $this->vitesse = $vitesse;  
  }
  public function setfor($force_vent) {
      $this->force_vent = $force_vent;  
  }
  public function setdir($direction_vent) {
      $this->direction_vent = $direction_vent;  
  }



}
?>