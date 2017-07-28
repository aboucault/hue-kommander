(function() {
    'use strict';

    angular
        .module('app.common')
        .controller('HttpErrorModalController', HttpErrorModalController);

    /* @ngInject */
    function HttpErrorModalController(httpErrorsInterceptor, $mdDialog, util, appContext) {
        var httpErrorModalCtrl = this;

        httpErrorModalCtrl.isDetailsVisible = false;
        httpErrorModalCtrl.currentErrors = httpErrorsInterceptor.currentErrors;
        httpErrorModalCtrl.getGenericError = getGenericError;
        httpErrorModalCtrl.getDetails = getDetails;
        httpErrorModalCtrl.close = close;
        httpErrorModalCtrl.copyDetails = copyDetails;

        /////////////////////////

        function getGenericError() {
            var genericError;

            if(httpErrorsInterceptor.currentErrors.length === 1) {
                genericError = getGenericErrorFromStatus(httpErrorsInterceptor.currentErrors[0].status);
            } else {
                genericError = getGenericErrorFromStatus(null);
            }

            return genericError;
        }

        function getDetails() {
            return angular.toJson(angular.copy(httpErrorsInterceptor.currentErrors));
        }

        function close() {
            $mdDialog.hide();
        }

        function copyDetails() {
            util.copyToClipBoard(getDetails());
        }

        // ---- HELPER(s) ----

        function getGenericErrorFromStatus(status) {
            switch (status) {
                case 403: return {
                    title: 'error.defaults.403.title',
                    message: 'error.defaults.403.message'
                };
                case 404: return {
                    title: 'error.defaults.404.title',
                    message: 'error.defaults.404.message'
                };
                case 408: return {
                    title: 'error.defaults.408.title',
                    message: 'error.defaults.408.message'
                };
                case 500: return {
                    title: 'error.defaults.500.title',
                    message: 'error.defaults.500.message'
                };
                default: return {
                    title: 'error.defaults.default.title',
                    message: 'error.defaults.default.message'
                };
            }
        }
    }
})();
