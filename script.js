	//General funcs		vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	function openOrCloseFullscreenWindow() {
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
		layout: "video"
	});

	var musicPlayer;
	musicPlayer = embed.getPlayer();
	//Twitch streams  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	//Youtube videos	vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	// 2. This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement('script');

	// channelName, channelIconUrl
 	var chillHopChannels = [["chillhopmusic", "https://static-cdn.jtvnw.net/jtv_user_pictures/f77898d7-223d-4600-a218-ed8267991538-profile_image-70x70.png"],
													["relaxbeats"   , "https://static-cdn.jtvnw.net/jtv_user_pictures/relaxbeats-profile_image-76acee755ecb616f-70x70.jpeg"]];

	var chillstepChannels = ["GVC5adzPpiE", "R2WCvT75KzQ", "6dHrafwh974"];		// |

	var synthChannels = ["6BHBwHLKAVI", "8wURCYMVWzg", "uXSeF2FgAdg"];			// |

	var fantasyChannels = ["SNDTo_nt_jE", "NuIAYHVeFYs", "JpIEAL7enB4"];		// |

	var oldWorldChannels = ["tb0B3auGbtA", "O_J16Olu_HA", "iZZ-y_z6zLQ"];		// |

	var animeChannels = ["oeMZrIe0Mos", "mUiazw80Lzo", "AvQka2HrceY"];			// |

	var jazzChannels = ["Dx5qFachd3A", "DSGyEsJ17cI", "fEvM-OUbaKs"];			// |

	var channels = {};
	channels["ChillHop"]  = chillHopChannels;
	channels["Chillstep"] = chillstepChannels;
	channels["Synth"]     = synthChannels;
	channels["Fantasy"]   = fantasyChannels;
	channels["Old World"] = oldWorldChannels;
	channels["Anime"]     = animeChannels;
	//channels["Jazz"] = jazzChannels;

	var streamGenres = Object.keys(channels);
	var selectedChannelGenre = streamGenres[0];
	var selectedChannelIndex = 0;

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
		event.target.setVolume(50);
		//if(event.target.a.id == "musicPlayer"){event.target.setVolume(50);} todo: can we do this with Twitch?
		if(event.target.a.id == "player2"){event.target.setVolume(80);}
		else{event.target.setVolume(30);}
		event.target.seekTo(0);
		event.target.playVideo();
	}

	function playorpauseVideos() {
		setMoonPhase();
		//todo: Change musicPlayer pause
		if(/*musicPlayer.getPlayerState() == 1 ||*/ player2.getPlayerState() == 1 || player3.getPlayerState() == 1){
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
		// todo: change musicPlayer reload
		populateStreamList();
	}

	function createSearchTab(){
		var searchTabElement = document.createElement("li");
		var searchTabLink = document.createElement("a");
		var searchTabId = "SearchTabContent";
		$(searchTabLink).attr("href", "#" + searchTabId);
		$(searchTabLink).text("🔍");
		$(searchTabElement).append(searchTabLink);

		var searchTabContent =  document.createElement("div");
		$(searchTabContent).attr("id", searchTabId);
		$(searchTabContent).css("margin-top", "0.5em");

		$("#genreTabStrip").append(searchTabElement);
		$("#musicSources").append(searchTabContent);

		var searchTextboxElement = document.createElement("input");
		$(searchTabContent).append(searchTextboxElement);

		/*
		for (let c=0; c < channelsInGenre.length; c++){
			var channelIconElement = document.createElement("img");
			$(channelIconElement).height('100px');
			$(channelIconElement).width('133px');
			$(channelIconElement).attr("src", "https://img.youtube.com/vi/" + channelsInGenre[c] + "/0.jpg");
			$(channelIconElement).attr("onclick", "reloadmusicPlayer('" + channelsInGenre[c] + "')");
			$(searchTabContent).append(channelIconElement);

			if(c>0){$(channelIconElement).css("margin-left", "10px");}
			else{$(channelIconElement).css("margin-left", "0px");}

			if (key == selectedChannelGenre && c == selectedChannelIndex) {
				$(channelIconElement).css("box-shadow", "white 0px 0px 10px 1px");

				var musicLevelsElement = document.createElement("img");

				$(musicLevelsElement).height($(channelIconElement).height()/3);
				$(musicLevelsElement).width($(channelIconElement).width());
				$(musicLevelsElement).attr("src", "Images/levels.gif");
				$(musicLevelsElement).attr("class", "selectedChannelOverlay");
				$(musicLevelsElement).css("position", "absolute");
				$(musicLevelsElement).css("bottom", parseFloat($("#musicSources").css("padding-bottom")) - 9 - 0 + "px"); //15 = horizontal scrollbar height. Changed to 0 becuase scrollbar removed. 9 = a magic number. Sorry :T
				$(musicLevelsElement).css("left", ($(channelIconElement).width()*c) + (parseFloat($(channelIconElement).css("margin-left"))*c) + parseFloat($("#musicSources").css("padding-left")) + 12.5);
				$(musicLevelsElement).css("filter", "hue-rotate(" + Math.floor(Math.random() * 360) + "deg) drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black)");

				$(searchTabContent).append(musicLevelsElement);
			}
		}
		*/
	}

	//Populate the list of streams
	function populateStreamList() {
		$("#musicSources *:not('#genreTabStrip')").remove();

		//createSearchTab();

		$.each(channels, function(key, channelsInGenre){
			var genreTabElement = document.createElement("li");
			var genreTabLink = document.createElement("a");
			var keyAsId = key.replace(new RegExp(" ", "g"), "_") + "TabContent";
			$(genreTabLink).attr("href", "#" + keyAsId);
			$(genreTabLink).text(key);
			$(genreTabElement).append(genreTabLink);

			var genreTabContent =  document.createElement("div");
			$(genreTabContent).attr("id", keyAsId);
			$(genreTabContent).css("margin-top", "0.5em");
			$(genreTabContent).css("width", "100%");
			$(genreTabContent).css("align-items", "center");
			$(genreTabContent).css("display", "flex");
			$(genreTabContent).css("justify-content", "space-evenly");

			$("#genreTabStrip").append(genreTabElement);
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

				if (key == selectedChannelGenre && c == selectedChannelIndex) {
					$(channelIconElement).css("box-shadow", "white 0px 0px 10px 1px");

					var musicLevelsElement = document.createElement("img");

					$(musicLevelsElement).height($(channelIconElement).height()/3);
					$(musicLevelsElement).width($(channelIconElement).width());
					$(musicLevelsElement).attr("src", "Images/levels.gif");
					$(musicLevelsElement).attr("class", "selectedChannelOverlay");
					$(musicLevelsElement).css("position", "absolute");
					$(musicLevelsElement).css("left", parseFloat($(channelIconElement).css("margin-left")));
					$(musicLevelsElement).css("bottom", 0);
					//$(musicLevelsElement).css("bottom", parseFloat($("#musicSources").css("padding-bottom")) - 19 - 0 + "px"); //15 = horizontal scrollbar height. Changed to 0 becuase scrollbar removed. 19 = a magic number. Sorry :T
					//$(musicLevelsElement).css("left", ($(channelIconElement).width()*c) + (parseFloat($(channelIconElement).css("margin-left"))*c) + parseFloat($("#musicSources").css("padding-left")) + 19.5); //19.5 was originally 12.5 idk where the 12.5 originally came from. Guess this is a magic number now :I
					$(musicLevelsElement).css("filter", "hue-rotate(" + Math.floor(Math.random() * 360) + "deg) drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black)");
					$(channelIconContainer).append(musicLevelsElement);
				}

				$(genreTabContent).append(channelIconContainer);
			}
		});

		$("#musicSources").tabs().tabs('destroy').tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
        $("#musicSources li").removeClass('ui-corner-top').addClass('ui-corner-left');

		var indexOfSelectedStream = streamGenres.indexOf(selectedChannelGenre)
		$("#genreTabStrip li a")[indexOfSelectedStream].click()
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
			  $("#cheatCodeTextbox").fadeOut(1000);
			}
		  } else {
			areCheatsLocked = true;
			konamiCodePosition = 0;
			$("#cheatCodeTextbox").css("color", "red");
			$("#cheatCodeTextbox").fadeOut(1000);
			setTimeout(function(){
			$("#cheatCodeTextbox").css("color", "white");
				$("#cheatCodeTextbox").text("");
				areCheatsLocked = false;
				$("#cheatCodeTextbox").fadeIn();
			},1000);
		  }
	  }
	  switch (e.keyCode){
				case 70: //f
					console.log("Paying respects o7");
					openOrCloseFullscreenWindow();
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
