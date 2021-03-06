var app = angular.module('kazeNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });
    $urlRouterProvider.otherwise('home');
  }]);

app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);

app.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts){
    $scope.test = 'Hello World!';

    $scope.posts = posts.posts;

    $scope.addPost = function(){
      if(!$scope.title || $scope.title === "") { return; }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes:0,
        comments: [
          {author: 'Joe', body: 'Stupid Post!', upvotes: 0},
          {author: 'Bobby Light', body: 'This site is ugly, what a waste of time...', upvotes: 0}
        ]
      });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.incrementUpvotes = function(post){
      post.upvotes += 1;
    };
  }]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function(){
      if($scope.bodt === '') { return; }
      $scope.post.comments.push({
        body:$scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body;
    };
  }]);
