(function() {
    'use strict';

    angular
        .module('app.common.services.appContext')
        .constant('AppContext', {
            USER_CHANGES_EVENT: 'hk:appContext:userChanged'
        })
        .provider('appContext', ApplicationContextProvider);

    function ApplicationContextProvider() {
        let _provider = this;
        this.$get = AppContextService;

        function AppContextService(store, $state, $translate, $http, $rootScope, $q, $timeout, AppContext, util) {
            var CURRENT_USER_STORRAGE_KEY = 'CURRENT_USER_STORRAGE_KEY';
            var DEVICE_NAME_STORAGE_KEY = 'DEVICE_NAME_STORAGE_KEY';
            var IP_ADDRESS_STORAGE_KEY = 'IP_ADDRESS_STORAGE_KEY';

            var _readyDefer = $q.defer();

            var _currentUser;
            var _deviceName;
            var _ipAddress;

            activate();
            var service = {
                get ready() { return _readyDefer.promise; },
                // to let tests override the ready promise
                set ready(value) { _readyDefer.promise = value; },

                get user() { return _currentUser; },
                set user(v) { _currentUser = v; },
                get ipAddress() { return _ipAddress; },

                complementaryInfo: _provider.complementaryInfo,
                hasCurrentUser() { return _hasCurrentUser(); },
                redirectToSettings,
                loadContextFromLocalStorage,
                reloadContext,
                getPreferredLanguage
            };
            return service;

            /////////////////////////////

            function activate() {
                // laod context info
                let loadWebDiscoveryInfo = () => {
                    let defered = $q.defer();

                    loadContextFromLocalStorage();
                    reloadContext().then(() => {
                        saveContextInLocalStorage();
                        defered.resolve();
                    });
                    return defered.promise;
                };

                loadWebDiscoveryInfo().then(() => {
                    _readyDefer.resolve();
                });
            }

            function getPreferredLanguage(supported) {
                let navigatorLanguages, chosenLanguage;
                // find a supported language that match asked language (or return undefined)
                let findLanguage = (desiredLang) => _(supported).find(lang => _.startsWith(desiredLang, lang.substr(0, 2)));

                // IE does not have a languages list and chrome selected language not always on top, so we put it first
                navigatorLanguages = util.getLanguages() || [util.getLanguage()];
                navigatorLanguages.unshift(util.getLanguage());

                _(navigatorLanguages)
                    .forEach(lang => {
                        // exact match
                        chosenLanguage = _(supported).find(A => A === lang);
                        // If not exact match, find similar (ex: fr-FR instead of fr-CH)
                        chosenLanguage = chosenLanguage ? chosenLanguage : findLanguage(lang);
                        // If found, return, else loop again
                        if(chosenLanguage) { return false; }
                    });
                // If none supported, switch first supported language
                return chosenLanguage || supported[0];
            }

            // ---- HELPER(s) ----

            function _hasCurrentUser() {
                return ((_currentUser !== undefined) && (_currentUser !== null));
            }

            // ---- PRIVATE HELPER(s) ----

            function setCurrentUser(value) {
                if(_currentUser !== value) {
                    _currentUser = value;
                    saveContextInLocalStorage();
                    $rootScope.$broadcast(AppContext.USER_CHANGES_EVENT, value);
                }
            }

            function redirectToSettings() {
                $state.go('settings');
            }

            function saveContextInLocalStorage() {
                store.set(CURRENT_USER_STORRAGE_KEY, angular.copy(_currentUser)); // use copy to remove angular metadata
                store.set(DEVICE_NAME_STORAGE_KEY, angular.copy(_deviceName));
                store.set(IP_ADDRESS_STORAGE_KEY, _ipAddress);
            }

            function reloadContext() {
                return $http.get('http://' + IP_ADDRESS_STORAGE_KEY + '').then((results) => {
                    _currentUser = results.data.user;
                    _deviceName = results.data.deviceName;
                })
            }

            function loadContextFromLocalStorage() {
                _currentUser = store.get(CURRENT_USER_STORRAGE_KEY);
                _deviceName = store.get(DEVICE_NAME_STORAGE_KEY);
                _ipAddress = store.get(IP_ADDRESS_STORAGE_KEY);
            }
        }
    }
})();