angular.module('musicController',[])
.directive('mxMusicController', ['ngAudio', 'nowPlayingList', function(ngAudio, nowPlayingList){
	return {
		restrict: 'E',
	  templateUrl: 'musicPlayer/musicController.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "mc",
	  link: function(scope, element, attrs){

	  	/////////IF HAVING PROBLEMS: check line 139 for ngaudioglobals, I set it to unlock (false) to stop audio from getting fucked up when changing pages


	  	//changes songs when they finish
	  	//makes sure song is playing
		  	scope.$watch(function(){return scope.nowPlaying.currentTime},
		  		function(){
		  			//this nowPlayingTrackNumber references the next track... actually, adding 1 will return object for current
		  			//checks if the currentTime is at the end of the song
		  			if (scope.nowPlaying.remaining==0){
		  				//will then check if any other songs on the album...
		  				//if there are, then it will load the next song
		  				//checks if track which just finished is the same track number as the track length
		  				//if it is not, there are more tracks, so does operation
		  				if (nowPlayingList.nowPlayingAlbumLength != nowPlayingList.nowPlayingTrackNumber){
			  				
			  				nowPlayingList.nowPlayingChange = !nowPlayingList.nowPlayingChange
			  				nowPlayingList.nowPlayingTrack = nowPlayingList.nowPlayingAlbum.tracks[nowPlayingList.nowPlayingTrackNumber]
			  				nowPlayingList.nowPlayingTrackNumber = nowPlayingList.nowPlayingTrack.trackNumber

			  				
			  			} else {
			  				//when album ends, loads in the first song again and stops audio
			  				nowPlayingList.nowPlayingTrack = nowPlayingList.nowPlayingAlbum.tracks[0]
			  				nowPlayingList.nowPlayingTrackNumber = nowPlayingList.nowPlayingTrack.trackNumber
			  				scope.trackTitle=nowPlayingList.nowPlayingTrack.trackTitle
			  				scope.nowPlaying = ngAudio.load(nowPlayingList.nowPlayingTrack.sourceFile)
			  				scope.nowPlaying.restart()


		  				}
		  			}
		  		}
		  	)

	  	//watch now playing track to change to load next song
	  	scope.$watch(function(){return nowPlayingList.nowPlayingChange},
	  		function(){
	  			if (nowPlayingList.nowPlayingTrack != null){
	  				//if something was already playing (is defined already), stop playing
	  				if (scope.nowPlaying != undefined){
		  				//if the track is the same one already playing, restart and play again
		  				if (scope.nowPlaying.id === nowPlayingList.nowPlayingTrack.sourceFile){
		  					scope.nowPlaying.currentTime=0
		  					if (scope.nowPlaying.paused === true){
		  						scope.nowPlaying.play()
		  					}
		  				} else {
		  				scope.nowPlaying.restart()
		  				//if first track playing, load the new track
			  			scope.nowPlaying = ngAudio.load(nowPlayingList.nowPlayingTrack.sourceFile)
			  			//wait until the above is defined...
			  			scope.nowPlaying.play()			  		
			  			scope.trackTitle=nowPlayingList.nowPlayingTrack.trackTitle
			  			scope.albumTitle=nowPlayingList.nowPlayingAlbum.albumTitle
			  			scope.artistName=nowPlayingList.nowPlayingArtist.artist
			  			scope.albumCover = nowPlayingList.nowPlayingAlbum.albumCover
			  			}
			  		} else {
			  			scope.nowPlaying = ngAudio.load(nowPlayingList.nowPlayingTrack.sourceFile)
			  			//wait until the above is defined...
			  			scope.nowPlaying.play()
			  			scope.trackTitle=nowPlayingList.nowPlayingTrack.trackTitle
			  			scope.albumTitle=nowPlayingList.nowPlayingAlbum.albumTitle
			  			scope.artistName=nowPlayingList.nowPlayingArtist.artist
			  			scope.albumCover = nowPlayingList.nowPlayingAlbum.albumCover
			  		}
			  	}
	  		}
	  	)

	  	

	  	/*scope.$watch(function(){return nowPlayingList.nowPlayingTrack},
	  		function(){
	  			console.log('nowplayingtrack changed')
	  			scope.nowPlaying = ngAudio.load("assets/testAudio/slogo.wav")
	  			console.log(scope.nowPlaying)

	  		}
	  	)*/



	  },
	  controller: function(ngAudio){
	  	//pc = music controller
	  	var mc = this

	  }
	}
}])





.factory('nowPlayingList', function(){
	nowPlayingList = {}

	nowPlayingList.nowPlayingList = null


	nowPlayingList.nowPlayingTrack = null
	nowPlayingList.nowPlayingAlbum = null
	nowPlayingList.nowPlayingArtist= null

	nowPlayingList.nowPlayingTrackNumber = null
	nowPlayingList.nowPlayingAlbumTrackLength = null

	nowPlayingList.nowPlayingChange = true
	

	//on click:
	// adds album to the nowPlayingAlbum property
	// adds track to nowPlayingTrack property
	// loads that track into 



	return nowPlayingList
})