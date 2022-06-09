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

	var PLAYER_INDEX_TWITCH = 0;
	var PLAYER_INDEX_YOUTUBE = 1;
	var currentPlayerTab = $("#playerTabsContainer div:first-child");
	var currentPlayerIndex = PLAYER_INDEX_TWITCH;
	var players;
	function changePlayerTab(newPlayerTab, newPlayerIndex){
		let currentPlayer = players[currentPlayerIndex];
		let newPlayer = players[newPlayerIndex];

		$(currentPlayerTab).removeClass("selectedTab");
		$(newPlayerTab).addClass("selectedTab");
		currentPlayerTab = newPlayerTab;

		mainPlayerPause();

		$(currentPlayer).hide();
		$(newPlayer).show();

		currentPlayerIndex = newPlayerIndex;
		mainPlayerPlay();

		populateSourceList();
	}

	function showMainPlayerOptions(videoContainer){
		var musicSources = $(videoContainer).find('div[id$="musicSources"]');
		var playerTabsContainer = $(videoContainer).find('div[id$="playerTabsContainer"]');
		musicSources.stop(true, true);
		musicSources.show();
		playerTabsContainer.stop(true, true);
		playerTabsContainer.show();
	}

	function hideMainPlayerOptions(videoContainer){
		$(videoContainer).find('div[id$="musicSources"]').hide("fade", {}, 1000);
		$(videoContainer).find('div[id$="playerTabsContainer"]').hide("fade", {}, 1000);
	}
	//General funcs		^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	//Twitch streams  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	embed = new Twitch.Embed("twitchMusicPlayer", {
		channel: "chillhopmusic",
		height: 295,
		width: 525,
		theme: "dark",
		layout: "video",
		muted: false,
		volume: 100
	});

	var twitchMusicPlayer;
	twitchMusicPlayer = embed.getPlayer();

	// Twitch
	// channelName, channelIconUrl
 	var twitchChannels = [["chillhopmusic", "https://static-cdn.jtvnw.net/jtv_user_pictures/50b96cf1-bf61-4bf7-8fe1-6f5e1410047f-profile_image-70x70.png"],
													["relaxbeats"   , "https://static-cdn.jtvnw.net/jtv_user_pictures/relaxbeats-profile_image-76acee755ecb616f-70x70.jpeg"],
													["chilledcattv" , "https://static-cdn.jtvnw.net/jtv_user_pictures/dd95b22b-4cbe-4083-ae5c-a6e17ac7a398-profile_image-70x70.png"]];

	// YouTube
	var videogameVideoIds = ["g9c2WTCj0Pk", "bgIBFEtJQv4", "ebmwJnhtMgY"]; // Minecraft, Lord of the Rings, World of Warcraft
 	var youtubeChannels = {};
	youtubeChannels["VideoGame"] = videogameVideoIds;

	var sources = {};
	sources[0] = twitchChannels;
	sources[1] = youtubeChannels;

	var streamGenres = Object.keys(youtubeChannels);
	var selectedChannelGenre = streamGenres[0];
	var selectedChannelIndeces = [0, 0];
	var searchingForLiveChannel = false;

	// Find live channel
	embed.addEventListener(Twitch.Embed.OFFLINE, function() {
		console.log(twitchMusicPlayer.getChannel() + " is offline.");

		if(!searchingForLiveChannel){
			console.log("Searching for live channel...");
			searchingForLiveChannel = true;
			setTwitchChannel(twitchChannels[0][0]);
		} else{
			var areAttemptingAChannel = false;
			var pastCurrentChannel = false;
			$.each(twitchChannels, function(channelIndex, channel){
				if(channel[0] == twitchMusicPlayer.getChannel()){
					pastCurrentChannel = true;
				}else if(pastCurrentChannel){
					console.log("Setting channel to: " + channel[0]);
					setTwitchChannel(channel[0]);
					areAttemptingAChannel = true;
				}
				return !areAttemptingAChannel;
			});
			if(!areAttemptingAChannel){
				console.log("No channels are live :(");
			}
		}
	});

	embed.addEventListener(Twitch.Embed.ONLINE, function() {
		searchingForLiveChannel = false;
		console.log(twitchMusicPlayer.getChannel() + " is online!");
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
	var playerLeft;
	var mainYoutubePlayer;
	var playerRight;
	function onYouTubeIframeAPIReady() {
		playerLeft = new YT.Player('playerLeft', {
			host: 'https://www.youtube.com',
			height: '239',
			width: '425',
			videoId: 'cdKop6aixVE',  // Fireplace
			events: {
			'onReady': onPlayerReadySidePlayers,
      'onStateChange': function(event) {
          if (event.data === YT.PlayerState.ENDED) {
						playerLeft.playVideo();
					}
				}
			}
		});
		mainYoutubePlayer = new YT.Player('youtubeMusicPlayer', { // Main Player
			host: 'https://www.youtube.com',
			height: '295',
			width: '525',
			videoId: youtubeChannels[Object.keys(youtubeChannels)[0]][0], // First Video in first tab
			events: {
			'onReady': onPlayerReadyMainYoutubePlayer,
      'onStateChange': function(event) {
          if (event.data === YT.PlayerState.ENDED) {
						mainYoutubePlayer.playVideo();
					}
				}
			}
		});
		playerRight = new YT.Player('playerRight', {
			host: 'https://www.youtube.com',
			height: '239',
			width: '425',
			videoId: 'aDfZ6STAfqA', // Rain
			events: {
			'onReady': onPlayerReadySidePlayers,
      'onStateChange': function(event) {
          if (event.data === YT.PlayerState.ENDED) {
						playerRight.playVideo();
					}
				}
			}
		});
	}

	// 4. The API will call this function when the video player is ready.
	function onPlayerReadySidePlayers(event) {
		if(event.target.h.id == "playerLeft"){event.target.setVolume(80);}
		else{event.target.setVolume(30);}
		event.target.seekTo(0);
		event.target.playVideo();
	}

	// 4. The API will call this function when the video player is ready.
	function onPlayerReadyMainYoutubePlayer(event) {
		event.target.setVolume(80);
		event.target.seekTo(0);

		players = $("#mainPlayerContainer").children();
		currentPlayer = players[0];
	}

	function isMainPlayerPaused() {
		switch(currentPlayerIndex) {
			case PLAYER_INDEX_TWITCH:
				return twitchMusicPlayer.isPaused();
				break;
			case PLAYER_INDEX_YOUTUBE:
				return mainYoutubePlayer.getPlayerState() != 1;
				break;
		}
	}

	function mainPlayerPause() {
		switch(currentPlayerIndex) {
			case PLAYER_INDEX_TWITCH:
				twitchMusicPlayer.pause();
				break;
			case PLAYER_INDEX_YOUTUBE:
				mainYoutubePlayer.pauseVideo();
				break;
		}
	}

	function mainPlayerPlay() {
			switch(currentPlayerIndex) {
				case PLAYER_INDEX_TWITCH:
					twitchMusicPlayer.play();
					break;
				case PLAYER_INDEX_YOUTUBE:
					mainYoutubePlayer.playVideo();
					break;
			}
	}

	function playOrPauseVideos() {
		setMoonPhase();

		if(!isMainPlayerPaused() || playerLeft.getPlayerState() == 1 || playerRight.getPlayerState() == 1){
			mainPlayerPause();
			playerLeft.pauseVideo();
			playerRight.pauseVideo();
		}else{
			mainPlayerPlay();
			playerLeft.playVideo();
			playerRight.playVideo();
		}
	}

	function setTwitchChannel(channelName){
		$.each(twitchChannels, function(channelIndex, channel){
			if(channelName == channel[0]){
				//selectedChannelGenre = genreIndex;
				selectedChannelIndeces[PLAYER_INDEX_TWITCH] = channelIndex;
				return false;
			}
		});

		twitchMusicPlayer.setChannel(channelName);
		twitchMusicPlayer.play();

		populateSourceList();
	}

	function setYoutubeVideo(videoId){
		$.each(youtubeChannels, function(key, videoIdsInGroup){
			if($.inArray(videoId, videoIdsInGroup) > -1){
				return false;
			}
		});

		selectedChannelIndeces[PLAYER_INDEX_YOUTUBE] = youtubeChannels[Object.keys(youtubeChannels)[0]].indexOf(videoId); // TODO: Replace Object.keys(youtubeChannels)[0] with current tab index if ever multiple
		mainYoutubePlayer.loadVideoById(videoId);
		populateSourceList();
	}

	function toggleSearchView(){
		$("#defaultMusicSources").toggle();
		$("#youtubeSearch").toggle();
	}

	function searchYoutube(){
		var searchString = $("#searchInput").val();

	  var results = YouTube.Search.list('id,snippet', {q: 'dogs', maxResults: 25});// TODO: These parms
	}

	//Populate the list of streams
	function populateSourceList() {
		$("#defaultMusicSources *").remove();
		var channelsInSource = sources[currentPlayerIndex];

		switch(currentPlayerIndex) {
			case PLAYER_INDEX_TWITCH:
				$("#searchViewButton").hide();

				var tabContent =  document.createElement("div");
				$(tabContent).attr("id", "TwitchTabContent");
				$(tabContent).css("margin-top", "0.5em");
				$(tabContent).css("width", "100%");
				$(tabContent).css("align-items", "center");
				$(tabContent).css("display", "flex");
				$(tabContent).css("justify-content", "space-evenly");
				$(tabContent).css("padding", 0);
				$("#defaultMusicSources").append(tabContent);

				for (let c=0; c < channelsInSource.length; c++){
					var channelIconContainer = document.createElement("div");
					$(channelIconContainer).css("position", "relative");

					var channelIconElement = document.createElement("img");
					$(channelIconElement).height('100px');
					$(channelIconElement).width('133px');
					$(channelIconElement).attr("src", channelsInSource[c][1]);
					$(channelIconElement).attr("onclick", "setTwitchChannel('" + channelsInSource[c][0] + "')");
					$(channelIconContainer).append(channelIconElement);

					if(c>0){$(channelIconElement).css("margin-left", "10px");}
					else{$(channelIconElement).css("margin-left", "0px");}

					if (c == selectedChannelIndeces[currentPlayerIndex]) {
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

					$(tabContent).append(channelIconContainer);
				}
				break;
			case PLAYER_INDEX_YOUTUBE:
				$("#searchViewButton").show();
				var searchViewButton =  document.createElement("div");
				$(searchViewButton).attr("id", "searchViewButton");
				$(tabContent).css("padding", 5);

				$.each(channelsInSource, function(genreName, channelsInTab){
					var tabNameAsId = genreName.replace(new RegExp(" ", "g"), "_") + "TabContent";

					/*
					var genreTabElement = document.createElement("li");
					var genreTabLink = document.createElement("a");
					$(genreTabLink).attr("href", "#" + genreNameAsId);
					$(genreTabLink).text(genreName);
					$(genreTabElement).append(genreTabLink);
					$("#genreTabStrip").append(genreTabElement);
					*/

					var tabContent =  document.createElement("div");
					$(tabContent).attr("id", tabNameAsId);
					$(tabContent).css("margin-top", "0.5em");
					$(tabContent).css("width", "100%");
					$(tabContent).css("align-items", "center");
					$(tabContent).css("display", "flex");
					$(tabContent).css("justify-content", "space-evenly");
					$(tabContent).css("padding", 0);
					$("#defaultMusicSources").append(tabContent);

					for (let c=0; c < channelsInTab.length; c++){
						var channelIconContainer = document.createElement("div");
						$(channelIconContainer).css("position", "relative");

						var channelIconElement = document.createElement("img");
						$(channelIconElement).height('100px');
						$(channelIconElement).width('133px');
						$(channelIconElement).attr("src", "https://img.youtube.com/vi/" + channelsInTab[c] + "/0.jpg");
						$(channelIconElement).attr("onclick", "setYoutubeVideo('" + channelsInTab[c] + "')");
						$(channelIconContainer).append(channelIconElement);

						if(c>0){$(channelIconElement).css("margin-left", "10px");}
						else{$(channelIconElement).css("margin-left", "0px");}

						if (genreName == selectedChannelGenre && c == selectedChannelIndeces[currentPlayerIndex]) {
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

						$(tabContent).append(channelIconContainer);
					}
				});
				break;
		}

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
		populateSourceList();
		setMoonPhase();

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
		var isWaxing = moonPercentThroughCycle <= 0.5;
		moonPhaseElement.css({"transform" : (isWaxing ? "rotateZ(25deg)" : "rotateZ(-25deg)")});
		console.log(moonPhaseElement.css("transform"));
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
