angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('vlogin', {
      url: '/vlogin',
      templateUrl: 'templates/vlogin.html',
      controller: 'vlogCtrl'
  })
    .state('videoCall', {
        url: '/vid',
        templateUrl: 'templates/videoCall.html',
        controller: 'videoCallCtrl'
        
    })
    
      .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('pictureCapture', {
    url: '/pic',
    templateUrl: 'templates/pictureCapture.html',
    controller: 'pictureCaptureCtrl'
  })

  
  .state('accountSettings', {
    url: '/settings',
    templateUrl: 'templates/accountSettings.html',
    controller: 'accountSettingsCtrl'
  })

  .state('deleteAccount', {
    url: '/delete_account',
    templateUrl: 'templates/deleteAccount.html',
    controller: 'deleteAccountCtrl'
  })

  .state('aboutQwikEyes', {
    url: '/about',
    templateUrl: 'templates/aboutQwikEyes.html',
    controller: 'aboutQwikEyesCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});