<?php
	$file = $_GET["video"];
?>	
<Script>
	//register canplaythrough event to #audio element to can get duration
	var f_duration =0;  //store duration
	var thisVideoPlayer = document.getElementById("schedFile");
	thisVideoPlayer.addEventListener('loadedmetadata', function(e){
	    f_duration = Math.round(thisVideoPlayer.duration);
	    $("#schedFile").attr("data-dur", f_duration);	
	    return f_duration;
	});

	var obUrl;
	obUrl = URL.createObjectURL(<?php echo file; ?>);
	document.getElementById("schedFile").setAttribute('src', obUrl);
</script>	
<audio id="schedFile" preload="metadata" data-dur=""></audio>
<?php		

echo"fuck";			    
?>