angular.module('starter.controllers', ['firebase'])

    .controller('LoginCtrl', function ($scope, $firebaseAuth, $state) {
        $scope.login = {};
        var firebaseObj = new Firebase("https://knightpass.firebaseio.com"), loginObj = $firebaseAuth(firebaseObj);
    
        $scope.signin = function () {
            var username = $scope.login.username, password = $scope.login.password, base = username.replace(/\./g, ',');
            window.localStorage['username'] = base;
 
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
        $scope.data = {};
        var classchoice = $scope.data.classVar;
        console.log(classchoice);
        $scope.options = [
            {classname: 'sword', Str: '2', Def: '2', Mag: '2', Spd: '2', Luc: '1', xp: '0', nextlvl: '100'},
            {classname: 'axe', Str: '2', Def: '1', Mag: '2', Spd: '2', Luc: '2', xp: '0', nextlvl: '100'},
            {classname: 'lance', Str: '2', Def: '2', Mag: '2', Spd: '1', Luc: '2', xp: '0', nextlvl: '100'}
        ];
        var firebaseObj = new Firebase("https://knightpass.firebaseio.com"), usernameRef = new Firebase("https://knightpass.firebaseio.com/users"), onComplete = function (error) {
            if (error) {
                console.log('Synchronization failed');
            } else {
                console.log('Synchronization succeeded');
            }
        };
        
    
        $scope.signup = function () {
            
            var username = $scope.signup.username, password = $scope.signup.password, classchoice = $scope.data.classVar, userclass = {}, base = username.replace(/\./g, ','), userref = usernameRef.child(base);
            window.localStorage['username'] = base;
            var usernamestored = window.localStorage['username'];
            console.log(usernamestored);
            if (classchoice === 'sword') {
                userclass = {classname: 'sword', Str: '2', Def: '2', Mag: '2', Spd: '2', Luc: '1', xp: '0', nextlvl: '100'};
            } else if (classchoice === 'axe') {
                userclass = {classname: 'axe', Str: '2', Def: '1', Mag: '2', Spd: '2', Luc: '2', xp: '0', nextlvl: '100'};
            } else {
                userclass = {classname: 'lance', Str: '2', Def: '2', Mag: '2', Spd: '1', Luc: '2', xp: '0', nextlvl: '100'};
            }
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
        
            
            userref.set({Def: userclass.Def, Luc: userclass.Luc, Mag: userclass.Mag, Spd: userclass.Spd,  Str: userclass.Str, classname: userclass.classname, lvl: '1', nextlvl: userclass.nextlvl, xp: userclass.xp}, onComplete);
            $state.go('login');
        };
    })
  

    .controller('StatsCtrl', function ($scope) {
        var firebaseobj = new Firebase("https://knightpass.firebaseio.com/users"), username = window.localStorage['username'], userref = firebaseobj.child(username);
        $scope.images = {};
        $scope.getDef = function (userref) {
            userref.on("value", function (snapshot) {
                var stats = snapshot.val();
                $scope.def = ("Def: " + stats.Def);
                console.log($scope.def);
            });
        };
        $scope.getStr = function (userref) {
            userref.on("value", function (snapshot) {
                var stats = snapshot.val();
                $scope.str = ("Str: " + stats.Str);
                console.log($scope.str);
            });
        };
        $scope.getMag = function (userref) {
            userref.on("value", function (snapshot) {
                var stats = snapshot.val();
                $scope.mag = ("Mag: " + stats.Mag);
                console.log($scope.mag);
            });
        };
        $scope.getSpd = function (userref) {
            userref.on("value", function (snapshot) {
                var stats = snapshot.val();
                $scope.spd = ("Spd: " + stats.Spd);
                console.log($scope.spd);
            });
        };
        $scope.getLuc = function (userref) {
            userref.on("value", function (snapshot) {
                var stats = snapshot.val();
                $scope.luc = ("Luc: " + stats.Luc);
                console.log($scope.luc);
            });
        };
        $scope.getxp = function (userref) {
            userref.on("value", function (snapshot) {
                var stats = snapshot.val();
                $scope.xp = ("XP:  " + stats.xp);
                console.log($scope.xp);
            });
        };
        $scope.getlvl = function (userref) {
            userref.on("value", function (snapshot) {
                var stats = snapshot.val();
                $scope.lvl = ("lvl: " + stats.lvl);
                console.log($scope.lvl);
            });
        };
        $scope.getclass = function (userref) {
            userref.on("value", function (snapshot) {
                var stats = snapshot.val();
                var classname = stats.classname;
                window.localStorage['classname'] = classname;
                console.log("classname: " + classname);
            });
        };
        $scope.getimg = function (userref) {
            if (window.localStorage['classname'] == 'sword') {
                $scope.images = "img/sword.png";
            } else if (window.localStorage['classname'] == 'axe') {
                $scope.images = "img/axe.png";
            } else {
                $scope.images = "img/lance.png";
            }
        };
    
        $scope.getDef(userref);
        $scope.getStr(userref);
        $scope.getMag(userref);
        $scope.getSpd(userref);
        $scope.getLuc(userref);
        $scope.getxp(userref);
        $scope.getlvl(userref);
        $scope.getclass(userref);
        $scope.getimg(userref);
        
        
    })
    .controller('FightCtrl', function ($scope, $state) {
        var firebaseobj = new Firebase("https://knightpass.firebaseio.com/users"), username = window.localStorage['username'], userref = firebaseobj.child(username);
        $scope.images = {};
        $scope.images2 = {};
        $scope.comp = {};
        var lvl = null;
        $scope.getcomp = function (userref) {
            console.log(window.localStorage['classname']);
            if (window.localStorage['classname'] == 'sword') {
                $scope.comp = {classname: 'lance', Str: '2', Def: '2', Mag: '2', Spd: '1', Luc: '2', xp: '0', nextlvl: '100'};
            } else if (window.localStorage['classname'] == 'axe') {
                $scope.comp = {classname: 'sword', Str: '2', Def: '2', Mag: '2', Spd: '2', Luc: '1', xp: '0', nextlvl: '100'};
            } else {
                $scope.comp = {classname: 'axe', Str: '2', Def: '1', Mag: '2', Spd: '2', Luc: '2', xp: '0', nextlvl: '100'};
            }
            userref.on("value", function (snapshot) {
                
                var stats = snapshot.val(), firebaseobj = new Firebase("https://knightpass.firebaseio.com/users"), compobj = firebaseobj.child(username);
                lvl = stats.lvl;
                console.log("$scope.lvl: " + lvl);
                if (lvl != 1) {
                    $scope.lvlup(lvl, $scope.comp);
                    console.log(username);
                    $scope.attack(compobj, $scope.comp);
                } else {
                    $scope.attack(compobj, $scope.comp);
                }
            });
            
        };
        $scope.lvlup = function (lvl, comp) {
            lvl = parseInt(lvl) + 1;
            var rand = Math.floor(Math.random() * (parseInt(lvl, 10)));
            $scope.comp.Str = parseInt($scope.comp.Str, 10) + rand;
            console.log("rand: " + rand + "comp Str: " + $scope.comp.Str);
            
            rand = Math.floor(Math.random() * (parseInt(lvl, 10)));
            $scope.comp.Def = parseInt($scope.comp.Def, 10) + rand;
            console.log("rand: " + rand + "comp Def: " + $scope.comp.Def);
            
            rand = Math.floor(Math.random() * (parseInt(lvl, 10)));
            $scope.comp.Spd = parseInt($scope.comp.Spd, 10) + rand;
            console.log("rand: " + rand + "comp Spd: " + $scope.comp.Spd);
            
            rand = Math.floor(Math.random() * (parseInt(lvl, 10)));
            $scope.comp.Mag = parseInt($scope.comp.Mag, 10) + rand;
            console.log("rand: " + rand + "comp Mag: " + $scope.comp.Mag);
            
            rand = Math.floor(Math.random() * (parseInt(lvl, 10)));
            $scope.comp.Luc = parseInt($scope.comp.Luc, 10) + rand;
            console.log("rand: " + rand + "comp Luc: " + $scope.comp.Luc);
        };
        $scope.attack = function (userref, comp) {
            var playerhealth = 100, comphealth = 100, playerAttack = 0, compAttack = 0, playerDefense = 0, compDefense = 0, playerStr = null, playerDef = null, playerSpd = null, playerMag = null, playerLuc = null, tempSpd = comp.Spd, firebaseObj = new Firebase("https://knightpass.firebaseio.com/users"), compobj = firebaseObj.child(username);
            $scope.evade = function (userref) {
                compobj.on("value", function (snapshot) {
                    var stats = snapshot.val();
                    playerLuc = stats.Luc;
                    playerStr = parseInt(stats.Str,10);
                    playerDef = parseInt(stats.Def);
                    playerSpd = parseInt(stats.Spd);
                    playerMag = parseInt(stats.Mag);
                    playerxp = parseInt(stats.xp);
                    nextone = parseInt(stats.nextlvl);
                    
                });
            };
            $scope.evade(compobj);
            $scope.hp1 = 100;
            $scope.hp2 = 100;
            $scope.hit = function() {
                console.log("comp spd: " + tempSpd + " Player Luc: " + playerLuc);
                if (parseInt(tempSpd) > parseInt(playerLuc)){
                    console.log("PlayerStr: " + playerStr);
                    playerAttack = playerStr + playerSpd;
                    compAttack = parseInt(comp.Str) + parseInt(comp.Spd);
                    console.log("Player attack: " + parseInt(playerAttack));
                    playerDefense = parseInt(playerDef) + parseInt(playerLuc), compDefense = parseInt(comp.Def) + parseInt(comp.Luc);
                    playerhealth = parseInt(playerhealth) - parseInt(compAttack) - parseInt(playerDefense) * parseInt(2);
                    $scope.hp1 = playerhealth;
                    console.log("player health: " + playerhealth);
                    playerLuc = parseInt(playerLuc) + parseInt(1);
                } else {
                    playerAttack = parseInt(playerStr, 10) + parseInt(playerSpd, 10);
                    compAttack = parseInt(comp.Str) + parseInt(comp.Spd);
                    console.log("Player attack: " + playerAttack);
                    playerDefense = parseInt(playerDef) + parseInt(playerLuc);
                    compDefense = parseInt(comp.Def) + parseInt(comp.Luc);
                    comphealth = parseInt(comphealth) - parseInt(playerAttack) - parseInt(compDefense) * parseInt(2);
                    $scope.hp2 = comphealth;
                    console.log("comp health: " + comphealth);
                    tempSpd = parseInt(tempSpd) + parseInt(1);
                }    
            
            if (playerhealth <= 0) {
                playerxp = playerxp + 1;
                console.log("you lose" + "current xp: " + playerxp);
                $state.go('defeat');
            }
            else if (comphealth <= 0) {
                console.log("you win!");
                playerxp = playerxp + 10;
                nextone = nextone - playerxp;
                var onComplete = function(error) {
                    if (error) {
                        console.log('Synchronization failed');
                    } else {
                        console.log('Synchronization succeeded');
                    }
                };
                userref.update({ xp: playerxp, nextlvl: nextone}, onComplete);
                $state.go('victory');
            }
            }
        };
        $scope.xpnow = function(userref) { 
                    userref.on("value", function (snapshot) {
                        var stats = snapshot.val();
                        window.localStorage['xp'] = stats.xp;
                        console.log(xpcur);
                    })
        };
       
        $scope.getimg = function (userref) {
            console.log(window.localStorage['classname']);
            if (window.localStorage['classname'] == 'sword') {
                $scope.images = "img/sword.png";
            } else if (window.localStorage['classname'] == 'axe') {
                $scope.images = "img/axe.png";
            } else {
                $scope.images = "img/lance.png";
            }
        };
    
        $scope.getimg2 = function (userref) {
            if (window.localStorage['enemy'] == 'sword') {
                $scope.images2 = "img/sword.png";
            } else if (window.localStorage['enemy'] == 'axe') {
                $scope.images2 = "img/axe.png";
            } else {
                $scope.images2 = "img/lance.png";
            }
        };
        $scope.getcomp(userref);
        $scope.getimg(userref);
        $scope.getimg2(userref);
    })
    .controller('DashCtrl', function ($scope, $firebaseAuth, $state) {
        $scope.logout = function () {
            var firebaseobj = new Firebase("https://knightpass.firebaseio.com");
            
            firebaseobj.unauth();
            $state.go('login');
        };
    })
    .controller('WinCtrl', function ($scope, $firebaseAuth, $state) {
        $scope.stats = function () {
            $state.go('tab.stats');
        };
    })
    .controller('LoseCtrl', function ($scope, $firebaseAuth, $state) {
        $scope.stats = function () {
            $state.go('tab.stats');
        };
    });
    
    