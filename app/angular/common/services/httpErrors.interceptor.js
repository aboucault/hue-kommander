/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    class HttpErrorsInterceptor {
        setErrorsStatusToBeSkipped(errorsStatusToBeSkipped) {
            this._errorsStatusToBeSkipped;
        }

        overrideShouldIntercept(overrideShouldIntercept) {
            this._overrideShouldIntercept = overrideShouldIntercept;
        }

        constructor() {
            this._errorsStatusToBeSkipped = [400]; // by defautl Http 400 are not intercepted
            this._overrideShouldIntercept = null;

            this.$get = serviceFn;

            /* @ngInject */
            function serviceFn($q, $injector, urls) {
                var self = this;

                var _currentErrors = [],
                    _isModalOpen = false;

                var httpErrorsInterceptorService = {
                    /* -- Interceptor -- */
                    requestError: handleError,
                    responseError: handleError,
                    /* End Interceptor */

                    get currentErros() {
                        return _currentErrors;
                    },
                    isModalOpen: _isModalOpen,
                    add: add,
                    purge: purge
                };

                return httpErrorsInterceptorService;

                ////////////////////////////

                function handleError(error) {
                    var status = error.status;

                    var shouldIntercept;

                    if(self._overrideShouldIntercept !== null) { //IOverrideShouldIntercept has precedence
                        var overrideShouldInterceptService = $injector.get(self._overrideShouldIntercept);
                        shouldIntercept = overrideShouldInterceptService.shouldIntercept(error);
                    } else {
                        shouldIntercept = _.indexOf(self._errorsStatusToBeSkipped, status) === -1;
                    }

                    if(shouldIntercept) {
                        if(status === 401) { // unauthorized
                            $injector.get('$state').go('forbidden.unauthorized');
                        } else if(status === 0) {
                            if(error.config.url.indexOf(urls.rest) === -1) {
                                $injector.get('$state').go('forbidden.unavailable');
                            }
                        } else if(status >= 300 && status <= 599) {
                            httpErrorsInterceptorService.add(error);
                            if(!httpErrorsInterceptorService.isModalOpen) {
                                httpErrorsInterceptorService.isModalOpen = true;
                                _showErrorPopup().then(() => {
                                    httpErrorsInterceptorService.isModalOpen = false;
                                    httpErrorsInterceptorService.purge();
                                });
                            }
                        }
                    }
                    return $q.reject(error);
                }

                function add(error) {
                    _currentErrors.push(error);
                }

                function purge() {
                    _currentErrors.splice(0, _currentErrors.length);
                }

                // ---- HELPER(s) ----

                function _showErrorPopup() {
                    var parentEl = angular.element(document.body);
                    var $mdDialog = $injector.get('$mdDialog');
                    return $mdDialog.show({
                        parent: parentEl,
                        templateUrl: 'angular/common/httpErrorModal/httpErrorModal.html',
                        controller: 'HttpErrorModalController',
                        controllerAs: 'httpErrorModalCtrl'
                    });
                }
            }
        }
    }

    angular
        .module('app.common')
        .provider('httpErrorsInterceptor', HttpErrorsInterceptor);
})();
