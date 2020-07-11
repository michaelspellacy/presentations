---
layout: null
---

/* We only do any scripting if the browser actually supports video */

if (!!document.createElement('video').play) {

	window.addEventListener('load',function() {

		var video=document.getElementById('video-example-2');

		/* remove the controls attribute */

		video.removeAttribute('controls');

		/* wrap the video in a div, so we can absolutely position the new controller in there */

		var container=document.createElement('div');
		container.style.position='relative';
		video.parentNode.insertBefore(container,video);
		video.parentNode.removeChild(video);
		container.appendChild(video);

		/* create the controller - we're using innerHTML here for expediency */

		var controller = document.createElement('div');
		controller.id="controls";
		video.parentNode.appendChild(controller);
		controller.innerHTML='<button id="playpause"><img src="btn-play.png" width="15" height="15" alt="play"></button><output id="display">-:--:--</output><img src="btn-audio.png" width="15" height="15" alt="volume" id="volumeicon"><input type="range" min="0" max="1" step="0.1" id="volume">';

		/* set the value of the volume slider to match that of the video (should be 1, but just in case) */

		document.getElementById('volume').value = video.volume;

		/* listen for timeupdate and update the time display in the controller*/

		video.addEventListener('timeupdate',function(e) {

			/* split currentTime (seconds) into separate hour/minute/second strings */

			var s=e.target.currentTime;
			var h=Math.floor(s/3600);
			s=s%3600;
			var m=Math.floor(s/60);
			s=Math.floor(s%60);

			/* pad the minute and second strings to two digits */

			if (s.toString().length < 2) s="0"+s;
			if (m.toString().length < 2) m="0"+m;

			document.getElementById('display').innerHTML = h+":"+m+":"+s;}, true);

		/* when video actually starts playback, update the play/pause button */

		video.addEventListener('play',function(e) {
			document.getElementById('playpause').innerHTML='<img src="btn-pause.png" width="15" height="15" alt="pause">';
		}, true);

		/* when video actually pauses, update the play/pause button */	

		video.addEventListener('pause',function(e) {
			document.getElementById('playpause').innerHTML='<img src="btn-play.png" width="15" height="15" alt="play">';
		}, true);

		/* when video reahes the end, update the play/pause button */		

		video.addEventListener('ended',function(e) {
			document.getElementById('playpause').innerHTML='<img src="btn-play.png" width="15" height="15" alt="play">';
		}, true);

		/* determine what to do if the play/pause button has been clicked */

		document.getElementById('playpause').addEventListener('click',function() {

			if (document.getElementById('player').paused) {

				/* if video is currently paused, play it */

				document.getElementById('player').play();

			} else {

				/* video isn't paused... */

				if (document.getElementById('player').ended) {

					/* if we're at the end, reset currentTime and play */

					document.getElementById('player').currentTime=0;
					document.getElementById('playpause').innerHTML='<img src="btn-pause.png" width="15" height="15" alt="pause">';
					document.getElementById('player').play();

				} else {

					/* otherwise, just pause */

					document.getElementById('player').pause();

				}

			}

		}, true);

		/* listen out for a change to the volume slider and update video volume accordingly */

		document.getElementById('volume').addEventListener('change',function(e) {

			document.getElementById('player').volume=e.target.value;

			if (e.target.value==0) {

				/* if the volume is set to zero, we explicitly set the muted attribute on the video */

				document.getElementById('player').muted = true;
				document.getElementById('volumeicon').src="btn-audio-mute.png";

			} else {

				/* if the audio was muted, we unmute it automatically on volume change */

				document.getElementById('player').muted = false;
				document.getElementById('volumeicon').src="btn-audio.png";

			}

			return false;

		}, true);

	}, true);
	
}