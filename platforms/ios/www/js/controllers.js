angular.module('starter.controllers', ['firebase'])

    .controller('LoginCtrl', function ($scope, $firebaseAuth, $state) {
        $scope.login = {};
        var firebaseObj = new Firebase("https://knightpass.firebaseio.com"), loginObj = $firebaseAuth(firebaseObj);
    
        $scope.signin = function () {
            var username = $scope.login.username, password = $scope.login.password;
 
            loginObj.$authWithPassword({
                email: username,
                password: password
            })
                .then(function (user) {
                //Success callback
                    console.log('Authentication successful');
                    $state.go('tab.dash');
 
                }, function (error) {
                //Failure callback
                    console.log('Authentication failure');
                });

        };
        $scope.register = function () {
            $state.go('signup');
        };

  
    })
    .controller('SignupCtrl', function ($scope, $firebaseAuth, $state) {
        $scope.signup = {};
        $scope.options = [
            {class: 'sword', Str: '2', Def: '2', Mag: '2', Spd: '2', Luc: '1', xp: '0', nextlvl: '100'},
            {class: 'axe', Str: '2', Def: '1', Mag: '2', Spd: '2', Luc: '2', xp: '0', nextlvl: '100'},
            {class: 'lance', Str: '2', Def: '2', Mag: '2', Spd: '1', Luc: '2', xp: '0', nextlvl: '100'}
        ];/*
    
    var class = [item.class , item.Str , item.Def , item.Mag, item.Spd, item.Luc, item.xp, item.nextlvl];   */
        var firebaseObj = new Firebase("https://knightpass.firebaseio.com"), usernameRef = new Firebase("https://knightpass.firebaseio.com/users"), onComplete = function (error) {
            if (error) {
                console.log('Synchronization failed');
            } else {
                console.log('Synchronization succeeded');
            }
        };
        /*usernameRef.set({ name: $scope.signup.username, class: $scope.options.class, Str: $scope.options.Str, Def: $scope.options.Def, Mag: $scope.options.Mag, Spd: $scope.options.Spd, Luc: $scope.options.Luc, xp: $scope.options.xp, nextlvl: $scope.options.nextlvl, lvl: '1' }, onComplete);*/
    
        $scope.signup = function () {
        
            var username = $scope.signup.username, password = $scope.signup.password;
        
            firebaseObj.createUser({
                email: username,
                password: password
            }, function (error, user) {
                if (error) {
                    console.log("Error creating user:", error);
                } else {
                    console.log("Successfully created user account with uid:", user.uid);
                }
            });
            usernameRef.set({ name: $scope.signup.username, class: $scope.options.class, Str: $scope.options.Str, Def: $scope.options.Def, Mag: $scope.options.Mag, Spd: $scope.options.Spd, Luc: $scope.options.Luc, xp: $scope.options.xp, nextlvl: $scope.options.nextlvl, lvl: '1' }, onComplete);
        
        };
    })
  

    .controller('StatsCtrl', function ($scope) {

    })
    .controller('FightCtrl', function ($scope) {

    })
    .controller('DashCtrl', function ($scope) {
    
    });