(function() {
    'use strict';

    class Urls {
        $get(){
            return {
                "rest": '__REST__/',
                "restURL": this.restURL,
                "username": {username: '__username__'}
            };
        }
    }

    angular
        .module('app.common')
        .provider('urls', Urls);
})();
