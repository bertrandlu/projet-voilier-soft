$(document).ready(function(){
	
		$('.box').click(function(){ //Détecte le clique un voilier
			//Récupération des dimensions
			$height_box = $(this).height();
			$width_box = $(this).width();
			//Changement des dimensions
			$('.box').height(50);
			$('.box').width('100%');
			$(this).height(160);

		});
});
 
