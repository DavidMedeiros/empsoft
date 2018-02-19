angular.module('sos-redacao').service('ModalService', ['$mdDialog','$mdPanel',
    function($mdDialog, $mdPanel) {
        var self = this;

        this.showConfirm = function(title, message) {
            //About multiple: https://github.com/angular/material/issues/8630
            const modal = $mdDialog.confirm()
                .title(title)
                .textContent(message)
                .multiple(true)
                .ok('Yes')
                .cancel('No');

            return $mdDialog.show(modal);
        };

        this.showAlert = function (title, message) {
            const modal = $mdDialog.alert()
                .title(title)
                .textContent(message)
                .multiple(true)
                .ok('Ok');

            return $mdDialog.show(modal);
        };

        this.exibirIndicadorCarregamento = function () {
            return $mdPanel.create({
                template: '<div layout="row" layout-sm="column" layout-align="space-around"><md-progress-circular class="md-primary" md-mode="indeterminate"></md-progress-circular></div>',
                attachTo: angular.element(document.body),
                position: $mdPanel.newPanelPosition().center(),
                hasBackdrop: true
            });
        };

    }]);