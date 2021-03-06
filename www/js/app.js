// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('login', {
    url:"/login",
    templateUrl: "templates/login.html",
    controller: "LoginCtrl"  
  })
  .state('signup', {
    url:"/signup",
    templateUrl: "templates/signup.html",
    controller: "SignupCtrl"  
  })
  .state('victory', {
    url:"/victory",
    templateUrl: "templates/victory.html",
    controller: "WinCtrl"  
  })
  .state('defeat', {
    url:"/defeat",
    templateUrl: "templates/defeat.html",
    controller: "LoseCtrl"  
  })
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dashboard': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.fight', {
      url: '/fight',
      views: {
        'tab-fight': {
          templateUrl: 'templates/fight.html',
          controller: 'FightCtrl'
        }
      }
    })
  .state('tab.stats', {
    url: '/stats',
    views: {
      'tab-stats': {
        templateUrl: 'templates/stats.html',
        controller: 'StatsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
