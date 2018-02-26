angular.module('sos-redacao').factory('Redacao', [function(){

	function Redacao(content, status, name){
		this.content = content;
		this.status = 0;
		this.name = name;
	}

    Redacao.prototype.constructor = Redacao;

	return Redacao;
}]);