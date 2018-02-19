angular.module('sos-redacao').factory('Redacao', [function(){

	function Redacao(content){
		this.content = content;
	}

    Redacao.prototype.constructor = Redacao;

	return Redacao;
}]);