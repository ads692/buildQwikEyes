angular.module('app.controllers', [])
  

//.controller('videoCallCtrl', function ($scope,localStorageService,$state) {
//    function vcallcontroller(localStorageService, $scope, $ionicPopup) {
.controller('videoCallCtrl', function ($scope,$state,$ionicPopup) {
    
        //$scope.username = localStorageService.get('username');
        $scope.username = "user1";

        var peer = new Peer($scope.username, {
            key: 'kxym8j9d4pldi',
            config: {
                'iceServers': [
                  { url: 'stun:stun1.l.google.com:19302' },
                  { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
                ]
            }
        });

        /* if you run your own peerserver
        var peer = new Peer($scope.username, {
          host: 'your-peerjs-server.com', port: 3000, path: '/peerjs',
          config: {'iceServers': [
            { url: 'stun:stun1.l.google.com:19302' },
            { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
          ]}
        });
      */

        function getVideo(successCallback, errorCallback) {
            navigator.webkitGetUserMedia({ audio: true, video: true }, successCallback, errorCallback);
        }


        function onReceiveCall(call) {

            $ionicPopup.alert({
                title: 'Incoming Call',
                template: 'Someone is calling you. Connecting now..'
            });

            getVideo(
                function (MediaStream) {
                    call.answer(MediaStream);
                },
                function (err) {
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'An error occurred while try to connect to the device mic and camera'
                    });
                }
            );

            call.on('stream', onReceiveStream);
        }


        function onReceiveStream(stream) {
            var video = document.getElementById('contact-video');
            video.src = window.URL.createObjectURL(stream);
            video.onloadedmetadata = function () {
                $ionicPopup.alert({
                    title: 'Call Ongoing',
                    template: 'Call has started. You can speak now'
                });
            };

        }

        $scope.startCall = function (userinput) {
            
            //var contact_username = "user1";
            var contact_username = userinput.cuser;

            console.log("calling" + contact_username);
            getVideo(
                function (MediaStream) {

                    var call = peer.call(contact_username, MediaStream);
                    call.on('stream', onReceiveStream);
                },
                function (err) {
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'An error occurred while try to connect to the device mic and camera'
                    });
                }
            );

        };

        peer.on('call', onReceiveCall);



    

})

//.controller('vlogCtrl', function ($scope, localStorageService, $state) {
//function vlogcontroller(localStorageService, $scope, $state) {
.controller('vlogCtrl', function ($scope, $state) {
    function vlogcontroller($scope, $state) {

        $scope.login = function () {

            var username = $scope.username;
            //localStorageService.set('username', username);
            $state.go('videocall');

        };

    }
})

.controller('loginCtrl', function($scope) {

})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('menuCtrl', function($scope) {

})
   
.controller('pictureCaptureCtrl', function($scope) {

})
   
  
.controller('accountSettingsCtrl', function($scope) {

})
   
.controller('deleteAccountCtrl', function($scope) {

})
   
.controller('aboutQwikEyesCtrl', function($scope) {

})


 