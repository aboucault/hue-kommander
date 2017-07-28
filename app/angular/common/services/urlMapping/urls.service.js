(function() {
    'use strict';

    class Urls {
        $get(){
            return {
                "rest": '__REST__/',
                "restURL": this.restURL,
                "user": {username: '__username__'}
            };
        }
    }

    angular
        .module('app.common')
        .provider('urls', Urls);
})();
