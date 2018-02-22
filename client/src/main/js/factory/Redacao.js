angular.module('sos-redacao').factory('Redacao', [function(){

	function Redacao(content){
		this.content = content;
		this.status = 0;
	}

    Redacao.prototype.constructor = Redacao;

	return Redacao;
}]);