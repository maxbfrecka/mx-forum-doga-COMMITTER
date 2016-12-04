angular.module('albumPreview',[])
.directive('mxAlbumPreview', ['ngAudio', 'nowPlayingList', function(ngAudio, nowPlayingList){
	return {
		restrict: 'E',
	  templateUrl: 'albumPreview/albumPreview.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "apc",
	  link: function(scope, element, attrs){
	  	scope.artistName =attrs.artistName
	  	scope.albumTitle=attrs.albumTitle
	  	scope.albumCover=attrs.albumCover
	  	scope.tracks=attrs.tracks
	  },
	  controller: function(){


	  }
	}
}])










.filter('removeSpacesThenLowercase', function () {
  return function (text) {
    var str = text.replace(/\s+/g, '');
    return str.toLowerCase();
      };
})