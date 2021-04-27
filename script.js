	//General funcs		vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	function toggleFullscreen() {
		var elem = document.documentElement;

		if (window.isFullscreened){
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) { /* Firefox */
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) { /* IE/Edge */
				document.msExitFullscreen();
			}
			window.isFullscreened = false;
		}
		else{
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) { /* Firefox */
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) { /* IE/Edge */
				elem.msRequestFullscreen();
			}
			window.isFullscreened = true;
		}
	}

	function randomNeonColor() {
		var sick_neon_colors = ["#CB3301", "#FF0066", "#FF6666", "#FEFF99", "#FFFF67", "#CCFF66", "#99FE00", "#EC8EED", "#FF99CB", "#FE349A", "#CC99FE", "#6599FF", "#03CDFF", "#FFFFFF"];
		return sick_neon_colors[Math.floor(Math.random()*sick_neon_colors.length)];
	};

	function showMusicSources(videoContainer){
		var musicSources = $(videoContainer).find('div[id$="musicSources"]');
		musicSources.stop(true, true);
		musicSources.show();
	}

	function hideMusicSources(videoContainer){
		$(videoContainer).find('div[id$="musicSources"]').hide("fade", {}, 1000);
	}
	//General funcs		^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	//Twitch streams  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	embed = new Twitch.Embed("musicPlayer", {
		channel: "chillhopmusic",
		height: 295,
		width: 525,
		theme: "dark",
		layout: "video",
		muted: false,
		volume: 100
	});

	var musicPlayer;
	musicPlayer = embed.getPlayer();

	// channelName, channelIconUrl
 	var chillHopChannels = [["chillhopmusic", "https://static-cdn.jtvnw.net/jtv_user_pictures/f77898d7-223d-4600-a218-ed8267991538-profile_image-70x70.png"],
													["relaxbeats"   , "https://static-cdn.jtvnw.net/jtv_user_pictures/relaxbeats-profile_image-76acee755ecb616f-70x70.jpeg"],
													["chilledcattv" , "https://static-cdn.jtvnw.net/jtv_user_pictures/dd95b22b-4cbe-4083-ae5c-a6e17ac7a398-profile_image-70x70.png"]];

	var channels = {};
	channels["ChillHop"]  = chillHopChannels;

	var streamGenres = Object.keys(channels);
	var selectedChannelGenre = streamGenres[0];
	var selectedChannelIndex = 0;
	var searchingForLiveChannel = false;

	// Find live channel
	embed.addEventListener(Twitch.Embed.OFFLINE, function() {
		console.log(musicPlayer.getChannel() + " is offline.");

		if(!searchingForLiveChannel){
			console.log("Searching for live channel...");
			searchingForLiveChannel = true;
			setTwitchChannel(channels[Object.keys(channels)[0]][0][0]);
		} else{
			var areAttemptingAChannel = false;
			var pastCurrentChannel = false;
			$.each(channels, function(genreIndex, channelsInGenre){
				$.each(channelsInGenre, function(channelIndex, channel){
					if(channel[0] == musicPlayer.getChannel()){
						pastCurrentChannel = true;
					}else if(pastCurrentChannel){
						console.log("Setting channel to: " + channel[0]);
						setTwitchChannel(channel[0]);
						areAttemptingAChannel = true;
					}
					return !areAttemptingAChannel;
				});
				return !areAttemptingAChannel;
			});
			if(!areAttemptingAChannel){
				console.log("No channels are live :(");
			}
		}
	});

	embed.addEventListener(Twitch.Embed.ONLINE, function() {
		searchingForLiveChannel = false;
		console.log(musicPlayer.getChannel() + " is online!");
	});

	//Twitch streams  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	//Youtube videos	vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	// 2. This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// 3. This function creates an <iframe> (and YouTube player)
	//    after the API code downloads.
	var player2;
	var player3;
	function onYouTubeIframeAPIReady() {
		player2 = new YT.Player('player2', {
			host: 'https://www.youtube.com',
			height: '239',
			width: '425',
			videoId: 'ZY3J3Y_OU0w',
			events: {
			'onReady': onPlayerReady
			}
		});
		player3 = new YT.Player('player3', {
			host: 'https://www.youtube.com',
			height: '239',
			width: '425',
			videoId: 'aDfZ6STAfqA',
			events: {
			'onReady': onPlayerReady
			}
		});
	}

	// 4. The API will call this function when the video player is ready.
	function onPlayerReady(event) {
		if(event.target.h.id == "player2"){event.target.setVolume(80);}
		else{event.target.setVolume(30);}
		event.target.seekTo(0);
		event.target.playVideo();
	}

	function playorpauseVideos() {
		setMoonPhase();

		if(!musicPlayer.isPaused() || player2.getPlayerState() == 1 || player3.getPlayerState() == 1){
			musicPlayer.pause();
			player2.pauseVideo();
			player3.pauseVideo();
		}else{
			musicPlayer.play();
			player2.playVideo();
			player3.playVideo();
		}
	}

	function setTwitchChannel(channelName){
		$.each(channels, function(genreIndex, channelsInGenre){
			$.each(channelsInGenre, function(channelIndex, channel){
				if(channelName == channel[0]){
					selectedChannelGenre = genreIndex;
					selectedChannelIndex = channelIndex;
					return false;
				}
			});
		});

		musicPlayer.setChannel(channelName);
		musicPlayer.play();

		populateStreamList();
	}

	//Populate the list of streams
	function populateStreamList() {
		$("#musicSources *:not('#genreTabStrip')").remove();

		$.each(channels, function(genreName, channelsInGenre){
			var genreNameAsId = genreName.replace(new RegExp(" ", "g"), "_") + "TabContent";

			/*
			var genreTabElement = document.createElement("li");
			var genreTabLink = document.createElement("a");
			$(genreTabLink).attr("href", "#" + genreNameAsId);
			$(genreTabLink).text(genreName);
			$(genreTabElement).append(genreTabLink);
			$("#genreTabStrip").append(genreTabElement);
			*/

			var genreTabContent =  document.createElement("div");
			$(genreTabContent).attr("id", genreNameAsId);
			$(genreTabContent).css("margin-top", "0.5em");
			$(genreTabContent).css("width", "100%");
			$(genreTabContent).css("align-items", "center");
			$(genreTabContent).css("display", "flex");
			$(genreTabContent).css("justify-content", "space-evenly");
			$(genreTabContent).css("padding", 0);
			$("#musicSources").append(genreTabContent);

			for (let c=0; c < channelsInGenre.length; c++){
				var channelIconContainer = document.createElement("div");
				$(channelIconContainer).css("position", "relative");

				var channelIconElement = document.createElement("img");
				$(channelIconElement).height('100px');
				$(channelIconElement).width('133px');
				$(channelIconElement).attr("src", channelsInGenre[c][1]);
				$(channelIconElement).attr("onclick", "setTwitchChannel('" + channelsInGenre[c][0] + "')");
				$(channelIconContainer).append(channelIconElement);

				if(c>0){$(channelIconElement).css("margin-left", "10px");}
				else{$(channelIconElement).css("margin-left", "0px");}

				if (genreName == selectedChannelGenre && c == selectedChannelIndex) {
					$(channelIconElement).css("box-shadow", "white 0px 0px 10px 1px");

					var musicLevelsElement = document.createElement("img");

					$(musicLevelsElement).height($(channelIconElement).height()/3);
					$(musicLevelsElement).width($(channelIconElement).width());
					$(musicLevelsElement).attr("src", "Images/levels.gif");
					$(musicLevelsElement).attr("class", "selectedChannelOverlay");
					$(musicLevelsElement).css("position", "absolute");
					$(musicLevelsElement).css("left", parseFloat($(channelIconElement).css("margin-left")));
					$(musicLevelsElement).css("bottom", 0);
					$(musicLevelsElement).css("filter", "hue-rotate(" + Math.floor(Math.random() * 360) + "deg) drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black)");
					$(channelIconContainer).append(musicLevelsElement);
				}

				$(genreTabContent).append(channelIconContainer);
			}
		});

		$("#musicSources").tabs().tabs('destroy').tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
        $("#musicSources li").removeClass('ui-corner-top').addClass('ui-corner-left');

		var indexOfSelectedStream = streamGenres.indexOf(selectedChannelGenre)
		//$("#genreTabStrip li a")[indexOfSelectedStream].click()
	}

	//Youtube videos	^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	//Shooting stars	vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	function LoopAnimate() {
	// Add animation class to star after 5 secons
		setTimeout(function() {
			document.getElementById("shootingStar").className += " animate";
		}, 5000);
		// remove animation class after 9seconds
		setTimeout(function() {
			var star = document.getElementById("shootingStar"),
			  starCont = document.getElementById("shootingStarContainer");
			randomMargin();
			star.className = star.className.replace(" animate", "");
		}, 9000);
	}

	//function to add a random margin
	function randomMargin() {
		var starCont = document.getElementById("shootingStarContainer");
		//Off the screen 75% of the time
		if(Math.random() <= .75){
			starCont.style.marginTop = "-100%";
		}
		else{
			const ANIMATIONWIDTH = 220 ;
			var topnum = Math.floor(Math.random() * 60),
				starContMargin = getComputedStyle(starCont).getPropertyValue("margin-top");
			topnum += "%";
			var leftnum = Math.floor(Math.random() * 85),
				starCont = document.getElementById("shootingStarContainer"),
				starContMargin = getComputedStyle(starCont).getPropertyValue("margin-left");
			leftnum += "%";

			starCont.style.marginTop = topnum;
			starCont.style.marginLeft = leftnum;
		}
	}

	$(document).ready(function(){
		// Call LoopAnimate every 10 seconds
		LoopAnimate();
		window.setInterval(function() {
			LoopAnimate();
		}, 10000);
		populateStreamList();
		setMoonPhase();
		$('[id$="musicSources"]').hide();

		//adblock notification
    if($("#adblockBait").width() > 0) {
        //alert('No AdBlocker');
    } else {
        //alert('AdBlocker Detected');
    }
	});
	//Shooting stars		^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	//Moon Phase	vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	function setMoonPhase(){
		var moonPhaseElement = $("#moonphase");
		moonPhaseElement.css("border", "none");

		var moonPercentThroughCycle = getMoonPercentThroughCycle();
		var moonPercentFilled = (moonPercentThroughCycle * 2) <= 1 ? moonPercentThroughCycle * 2 : 1 - ((moonPercentThroughCycle * 2) - 1);
		var moonPixelFilled = moonPercentFilled * moonPhaseElement.width();

		$("#mooncolor").css("background-color", randomNeonColor());

		if(moonPercentThroughCycle <= .25){
			moonPhaseElement.css("border-right", moonPixelFilled + "px solid transparent");
		} else if(moonPercentThroughCycle <= .5){
			moonPhaseElement.css("border-left", moonPhaseElement.width() - moonPixelFilled + "px solid transparent");

			var backgroundColor = moonPhaseElement.css("background-color");
			var borderColor = moonPhaseElement.css("border-color");

			moonPhaseElement.css("background-color", "transparent");
			moonPhaseElement.css("border-color", "black");

		} else if(moonPercentThroughCycle <= .75){
			moonPhaseElement.css("border-right", moonPhaseElement.width() - moonPixelFilled + "px solid transparent");

			var backgroundColor = moonPhaseElement.css("background-color");
			var borderColor = moonPhaseElement.css("border-color");

			moonPhaseElement.css("background-color", "transparent");
			moonPhaseElement.css("border-color", "black");
		}
		else{
			moonPhaseElement.css("border-left", moonPixelFilled + "px solid transparent");
		}

	}

	function getMoonPercentThroughCycle()
	{
		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth() + 1; //January is 0
		var year = today.getFullYear();

		if (month < 3) {
			year--;
			month += 12;
		}

		++month;

		var c = 365.25 * year;
		var e = 30.6 * month;
		var totalDaysElapsed = c + e + day - 694039.09; //totalDaysElapsed is total days elapsed
		var totalDaysElapsedInt = 0;

		totalDaysElapsed /= 29.5305882; //divide by the moon cycle

		totalDaysElapsedInt = parseInt(totalDaysElapsed); //int(jd) -> b, take integer part of jd

		totalDaysElapsed -= totalDaysElapsedInt; //subtract integer part to leave fractional part of original jd

		return totalDaysElapsed;
	}
	//Moon Phase	^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	//kybinds				 vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	var allowedKeys = {
	  37: 'left',
	  38: 'up',
	  39: 'right',
	  40: 'down',
	  65: 'a',
	  66: 'b'
	};

	var areCheatsLocked = false;
	var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
	var konamiCodePosition = 0;
	var konamiCodeString = "⇧⇧⇩⇩⇦⇨⇦⇨BA";

	document.addEventListener('keydown', function(e) {
	  if(window.logKeys){
		console.log(e.keyCode);
	  }

	  if(!areCheatsLocked){
		  var key = allowedKeys[e.keyCode];
		  var requiredKey = konamiCode[konamiCodePosition];

		  if (key == requiredKey) {
			konamiCodePosition++;
			$("#cheatCodeTextbox").text(konamiCodeString.substring(0, (konamiCodePosition)));

			if (konamiCodePosition == konamiCode.length) {
			  activateCheats();
			  konamiCodePosition = 0;
			  $("#cheatCodeTextbox").css("color", "green");
			  $("#cheatCodeTextbox").fadeOut(3000);
			}
		  } else {
			areCheatsLocked = true;
			konamiCodePosition = 0;
			$("#cheatCodeTextbox").css("color", "red");
			$("#cheatCodeTextbox").fadeOut(3000);
			setTimeout(function(){
			$("#cheatCodeTextbox").css("color", "white");
				$("#cheatCodeTextbox").text("");
				areCheatsLocked = false;
				$("#cheatCodeTextbox").fadeIn();
			},3000);
		  }
	  }
	  switch (e.keyCode){
				case 70: //f
					console.log("Paying respects o7");
					toggleFullscreen();
					break;
			}
	});

	function activateCheats() {
		areCheatsLocked = true;
		$("#moon").hide();
		$("#mooncolor").hide();
		$("#zeldaMoon").show();
		$("#zeldaMoonEyes").show();
		console.log("cheats activated");
	}
	//keybinds 				^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	// exit fullscreen      vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	if (document.addEventListener)
	{
		document.addEventListener('webkitfullscreenchange', exitHandler, false);
		document.addEventListener('mozfullscreenchange', exitHandler, false);
		document.addEventListener('fullscreenchange', exitHandler, false);
		document.addEventListener('MSFullscreenChange', exitHandler, false);
	}

	function exitHandler()
	{
		if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
		{
			window.isFullscreened = false;
		}
	}
	// exit fullscreen      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
