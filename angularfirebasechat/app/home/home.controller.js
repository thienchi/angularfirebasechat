(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', '$firebase','$scope'];
    function HomeController(UserService, $rootScope, $firebase,$scope) {
        var vm = this;

        vm.user = null;

        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }
        var name = $rootScope.globals.currentUser.username;

        var previousChat = '';
        $scope.name = name;
        $scope.chatMessage = "";
        $scope.time = "";//
        var ref = new Firebase($rootScope.pt);

        var sync = $firebase(ref);
        $scope.chatMessages = sync.$asArray();

        $scope.sendChat = function () {
            if($scope.chatMes == previousChat || $scope.chatMes.length == 0) return;
            var dateTime = new Date();
            var chatMessage = { name: name, message: $scope.chatMes, time: dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString()};
            $scope.chatMessages.$add(chatMessage);
            previousChat = $scope.chatMes;
            $scope.chatMes = "";
        };

        $scope.clear = function() {
            for (var i = 0; i < $scope.chatMessages.length; i++) {
                $scope.chatMessages.$remove($scope.chatMessages[i]);
            }
        };
    }

})();