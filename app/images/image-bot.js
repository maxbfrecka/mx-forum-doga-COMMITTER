angular.module('imageBot',[])

.directive('mxImageBot', ['testData', '$routeParams', 'newReplyClick', 'threadData', 'replyData', 'imageBotData', function(testData, $routeParams, newReplyClick, threadData, replyData, imageBotData){
	return {
		restrict: 'E',
	  templateUrl: 'images/image-bot.html',
	  scope: true,
	  transclude: true,
	  controllerAs: "ic",
	  controller: function() {
	  	var ic = this;
	  	ic.generateImage = imageBotData.generateImage
	  	ic.generateImage()

	  	ic.image = imageBotData.imageID

	  	ic.sayimage = "image"


	  	ic.generateImage()

	  	//IC.IMAGE IS WORKING FINE!


	  }
	}
}])


.factory('imageBotData', function(){
	var imageBotData = {}

	imageBotData.imageID = null;

	imageBotData.generateImage = function(){
  	var canvas = document.getElementById("canvas");
		var context = c.getContext("2d");
		ctx.beginPath(); 
		ctx.lineWidth="1";
		ctx.strokeStyle="green";
		ctx.moveTo(0,3);
		ctx.lineTo(50,30);
		ctx.moveTo(10,50);
		ctx.stroke();
	}
	
	return imageBotData

})

.directive('fallbackSrc', function () {
  var fallbackSrc = {
    link: function postLink(scope, iElement, iAttrs) {
      iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.fallbackSrc);
      });
    }
   }
   return fallbackSrc;
});