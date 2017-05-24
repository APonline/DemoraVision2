/*vars*/
var bigDV = [];
var bigDVmarathon = [];
var programType = bigDV;
var marathonON = 0;
var broadcasting = 2;
var commercialON = 1;
var currDVpick = null;
var myDV = null;
var endTypes = ["jpg","png","gif"];
var endfileTypes = ["MP4","Mp4","mp4","jpg","jpeg","png","gif"];
var imgColors = [];
var firstOpen = 0;
var imageSpeed = 10000;
var currMedia;
var newImg;
var mainLogo;
var createdShedule = 0;
var commercialCount = 0;
var comm1;
var comm2;
var comm3;
var comm4;
var d1 = new Date ();
init();


/*-----------------*/


/*init - GOOD*/
function init(){
//start up
document.querySelector('.gotoTV').addEventListener('click', function (){$('#dir-select').trigger('click');}, false);
document.querySelector('#dir-select').addEventListener('change', listArchive, false);

//controllers
$('#prev').bind('click', controller);
$('#next').bind('click', controller);
document.addEventListener('keydown', onKeyControl, false);

//tv player
document.querySelector('#tv').addEventListener('ended', nextPlay, false);
$('#image').bind('mouseleave', resetCarousel);
}


/*-----------------*/


/*videoplayer - GOOD*/
function playArchiveFile(playme,myFile,id,extension) {
console.log('id: '+ id);
  if(commercialCount>3&&commercialON==1){
    commercialCount=0;
    playCOMM(playme,myFile,id,extension);
  }else{
    playIT(playme,myFile,id,extension);
  }
}
function playIT(playme,myFile,id,extension){
		commercialCount++;
		newImg=1;
		document.getElementById('broadcast').style.display = "block";
	
		var file = playme;
		var mytype = extension.substr(extension.length - 3);
		currMedia = mytype;
	
		//$('.mainItemEnd.active').css('height','18px');
	
		//$('.mainItemEnd').parents().css('height','38px');
		$('.mainItemEnd.active').parents().removeClass('active');
		$('.mainItemEnd.active').removeClass('active');
		$('#'+id).addClass('active');
		$('#'+id).parents().addClass('active');
		$('#'+id).parents().addClass('active');
		
		//updates playlist
		currDVpick = id;
		
		//load content
		if(mytype==="MP4"||mytype==="mp4"){
			var videoNode = document.querySelector('#tv');
			var type = "video/"+ mytype;
			var canPlay = videoNode.canPlayType(type);
			if (canPlay === ''){canPlay = 'no';}
			var isError = canPlay === 'no';
	
			document.getElementById('image').style.display = "none";
			document.getElementById('tv').style.display = "block";
			document.getElementById('image').src = "";
			if (isError) {
				$('#next').trigger('click');
				return
			}
			videoNode.src = file;
		
		}else{
			document.getElementById('tv').style.display = "none";
			document.getElementById('tv').src = "";
			var videoNode = document.querySelector('#image')
		
			$('#image').animate({opacity:0},400, function(){
				$('#image').css({'opacity':'0','display':'none'});
				videoNode.src = file;
				$('#image').css({'opacity':'0','display':'block'});
				$('#image').animate({opacity:1},600, function(){
					if($('#image:hover').length != 0){ 
					}else{
						newImg=0;
						setTimeout(fireNext, imageSpeed);
					}
				});
			});
		}

		animateSet('broadcast');
		//Now playing
		var title = myFile;
		var message = "NOW PLAYING: " + title;
		displayMessage(message);
	
		var myVideoPlayer = document.getElementById('tv');
		myVideoPlayer.addEventListener('loadedmetadata', function() {
			var upNextDur = myVideoPlayer.duration;
			var minutes = Math.floor(upNextDur / 60);
			
			var d1 = new Date (),
			d = new Date ( d1 );
			d.setMinutes ( d1.getMinutes() + minutes );
			d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
		
				//up Next playing
				var nextItem = $.inArray( currDVpick, programType );
				var upnextTitle = $('#'+programType[nextItem + 1]).parents('.mainFolderInner').children('.mainFolderInnerTitle').html();
				
				if(upnextTitle==undefined){
					upnextTitle = $('#'+programType[nextItem + 1]).html();
				}
				
				var upNext = "<span><span>COMING UP</span><br/>NEXT @ "+d+" </span> <div class='upNextTitle'>"+ upnextTitle +"</div>";
				
				//ad upnext image
				var upnextTitleBK = $('#'+programType[nextItem + 1]).parents('.mainFolderInner').attr('data-bk');
				$('.upNext').css({"background":"linear-gradient(to right, rgba(0,0,0, .3) 0%, rgba(0,0,0, .7) 50%, rgba(0,0,0, 1) 70%), url('"+upnextTitleBK+"') left 20% / 70% no-repeat","background-color":"rgba(0,0,0, 1)!important"});
				createProgramm();
				displayNextMessage(upNext);
				showProgramm();
		});
}
function playCOMM(playme,myFile,id,extension){
	document.getElementById('broadcast').style.display = "block";

	var commCount = Math.floor( (Math.random() * $('.Commercials').children('.mainItemEnd').length) + 2 );
	var myComm = $('.Commercials').children('.mainItemEnd:nth-child('+commCount+')').attr('data-file');
	
	var file = myComm;
	var mytype = myFile.substr(myFile.length - 3);
	currMedia = mytype;
	
	//load content
	var videoNode = document.querySelector('#tv')
	var type = "video/"+ mytype;
	var canPlay = videoNode.canPlayType(type)
	if (canPlay === '') canPlay = 'no'
	var isError = canPlay === 'no';
	
	var message = "<br />";
	displayMessage(message);

	document.getElementById('image').style.display = "none";
	document.getElementById('tv').style.display = "block";
	document.getElementById('image').src = "";
	if (isError) {
		$('#next').trigger('click');
		return
	}
	videoNode.src = file;
	document.querySelector('#tv').removeEventListener('ended', nextPlay, false);
	document.querySelector('#tv').addEventListener('ended', backToBroadcast, false);
	
	comm1 = playme;
	comm2 = myFile;
	comm3 = id;
	comm4 = extension;
	
	animateSet('broadcast');
}

function backToBroadcast(){
	var playme = comm1;
	var myFile = comm2;
	var id = comm3;
	var extension = comm4;

	commercialCount=0;
	playArchiveFile(playme,myFile,id,extension);
	document.querySelector('#tv').addEventListener('ended', nextPlay, false);
}

function fireNext(){
	if(currMedia==="mp4"||currMedia==="MP4"){}else{ 
		if($('#image:hover').length != 0){ 
		}else{
			if(newImg==1){}else{
				$('#next').trigger('click');
			}
		}
	}
}
function resetCarousel(){
	setTimeout(autoNext, imageSpeed);
	function autoNext(){
		$('#next').trigger('click');
	}
}
function upNext(){
	//messages
	var myVideoPlayer = document.getElementById('tv');
	
	if(marathonON == 1){	
		var upNextDur = myVideoPlayer.duration;
		var minutes = Math.floor(upNextDur / 60);
			
		var d1 = new Date (),
    	d = new Date ( d1 );
		d.setMinutes ( d1.getMinutes() + minutes );
		d = d.toLocaleTimeString().replace(/:\d+ /, ' ');	
	
			//up Next playing
			var nextItem = $.inArray( currDVpick, programType );
			var upnextTitle = $('#'+programType[nextItem + 1]).parents('.mainFolderInner').children('.mainFolderInnerTitle').html();
    		
    		if(upnextTitle==undefined){
				upnextTitle = $('#'+programType[nextItem + 1]).html();
				var upNextT = ""+upnextTitle;
			}else{
				var upnextTitleEnd = $('#'+programType[nextItem + 1]).html();
				var upNextT = "<span style='font-size:40px;'>"+upnextTitle+"</span><br />"+upnextTitleEnd;
			}
			
			
			if(upNextT.length > 30){
				var styleAd = "style='font-size: 45px;letter-spacing: 0px;'";
			}else{
				var styleAd = "style='font-size: 80px;letter-spacing: 4px;'";
			}
			
			var upNext = "<span><span>COMING UP</span><br/>NEXT @ "+d+" </span> <div class='upNextTitle' "+styleAd+">"+ upNextT +"</div>";
			
			//ad upnext image
			var upnextTitleBK = $('#'+programType[nextItem + 1]).parents('.mainFolderInner').attr('data-bk');
			$('.upNext').css({"background":"linear-gradient(to right, rgba(0,0,0, .3) 0%, rgba(0,0,0, .7) 50%, rgba(0,0,0, 1) 70%), url('"+upnextTitleBK+"') left 20% / 70% no-repeat","background-color":"rgba(0,0,0, 1)!important"});

			displayNextMessage(upNext);	
	}else{
		var upNextDur = myVideoPlayer.duration;
		var minutes = Math.floor(upNextDur / 60);
			
		var d1 = new Date (),
    	d = new Date ( d1 );
		d.setMinutes ( d1.getMinutes() + minutes );
		d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
		
			//up Next playing
			var nextItem = $.inArray( currDVpick, programType );
			var upnextTitle = $('#'+programType[nextItem + 1]).parents('.mainFolderInner').children('.mainFolderInnerTitle').html();
			
			if(upnextTitle==undefined){
				upnextTitle = $('#'+programType[nextItem + 1]).html();
			}
			
			if(upnextTitle.length > 30){
				var styleAd = "style='font-size: 45px;letter-spacing: 0px;'";
			}else{
				var styleAd = "style='font-size: 80px;letter-spacing: 4px;'";
			}
			
			var upNext = "<span><span>COMING UP</span><br/>NEXT @ "+d+" </span> <div class='upNextTitle' "+styleAd+">"+ upnextTitle +"</div>";
			
			//ad upnext image
			var upnextTitleBK = $('#'+programType[nextItem + 1]).parents('.mainFolderInner').attr('data-bk');
			$('.upNext').css({"background":"linear-gradient(to right, rgba(0,0,0, .3) 0%, rgba(0,0,0, .7) 50%, rgba(0,0,0, 1) 70%), url('"+upnextTitleBK+"') left 20% / 70% no-repeat","background-color":"rgba(0,0,0, 1)!important"});
			
			displayNextMessage(upNext);
	}	
	showProgramm();
}
function displayMessage(message, isError) {
	var element = document.querySelector('#message')
	element.innerHTML = message
	element.className = isError ? 'error' : 'info'
}
function displayNextMessage(message, isError) {
	var element = document.querySelector('#upNext')
	element.innerHTML = message;
}
/*videoplayer - GOOD*/


/*video - archive*/
//dynamic dir load
function listArchive(event) {
	document.getElementById('archive').style.display = "block";
	
	//cycle through folders
	var folders = event.target.files;
	for (var i = 0, f; f = folders[i]; i++) {
		if(folders[i].type==""){continue}
		
		//gets root Category
		var dirs = folders[i].webkitRelativePath;
		dirs = dirs.split("/");
		for(var j=0; j<dirs.length - 1; j++){
			var folderName = dirs[j];
			if(j==0){
				var parentFolder = dirs[0];
			}else{
				var parentFolder = dirs[j - 1];
			}
			
			createfolders(parentFolder, folderName);
		}
		
		//create folders
		function createfolders(parentFolder, folderName){
			//master dir
			if(myDV === null && parentFolder == folderName){
				folderName = parentFolder;
				$('#myDVfolder').html("<h1>" + cleanTitles(parentFolder) + "</h1>");
				
				var Folder = document.createElement("div");
				var newFolderTitle = cleanTitles(folderName);
				Folder.className += "outterFolder";
				Folder.className += newFolderTitle;
				Folder.setAttribute("id", "folder"+newFolderTitle);
				Folder.setAttribute("data-name", "outterFolder");
				
				if(myDV === null){
					document.querySelector("#myDVfolder").appendChild(Folder);
					myDV = newFolderTitle;
				}
			}else{
			//all dirs
				var Folder2 = document.createElement("div");
				var newFolderTitle = cleanTitles(folderName);
				Folder2.className += "innerFolder";
				Folder2.className += newFolderTitle;
				if(folderName=="Commercials"){
					Folder2.className += " Commercials";
				}
				Folder2.setAttribute("id", "folder"+newFolderTitle);
				Folder2.setAttribute("data-name", "innerFolder");
				Folder2.innerHTML = cleanTitleName(folderName);
			
				//main dir category 2nd level
				if(cleanTitles(parentFolder)==myDV && myDV !== null){
					if($('#folder'+cleanTitles(folderName)).length <=0){
						Folder2.className += " mainFolder";
						
						var Folder2title = document.createElement("div");
						Folder2title.innerHTML = cleanTitleName(folderName);
						Folder2.innerHTML = "";
						Folder2.setAttribute("data-name", "mainFolder");
						Folder2title.style.cssText = "margin-bottom:16px";
						Folder2title.setAttribute("id", "folderName"+cleanTitles(newFolderTitle));
						Folder2.setAttribute("data-parent", cleanTitles(folderName));
						Folder2.className += " folder"+cleanTitles(folderName)+newFolderTitle;
						
						var list = document.querySelector('#folder'+myDV); 
						list.insertBefore(Folder2, list.childNodes[0]);
						document.querySelector('#folder'+cleanTitles(folderName)).appendChild(Folder2title);
					}
				}else{
				//all inner levels
				
					if($('#folder'+cleanTitles(folderName)).length < 1){			
							Folder2.innerHTML = "";
							var Folder2title = document.createElement("div");
							Folder2title.innerHTML = cleanTitleName(folderName);
										
						if($('#folder'+cleanTitles(parentFolder)).hasClass('mainFolderInner')){
						
							Folder2.className += " mainFolderInnerEnd";
							Folder2.setAttribute("data-name", "mainFolderInnerEnd");
							Folder2title.className += " mainFolderInnerEndTitle";
							Folder2.setAttribute("data-parent", cleanTitles(parentFolder));
							Folder2.className += " folder"+cleanTitles(parentFolder)+newFolderTitle;
							
							var list = document.querySelector('#folder'+cleanTitles(parentFolder)); 
							list.insertBefore(Folder2, list.childNodes[0]);
							document.querySelector('.folder'+cleanTitles(parentFolder)+cleanTitles(folderName)).appendChild(Folder2title);
							
							$('#folder'+cleanTitles(parentFolder)).prepend($('#folder'+cleanTitles(parentFolder)).find('.mainFolderInnerTitle'));
						}else if($('#folder'+cleanTitles(parentFolder)).length >= 1){
							Folder2.className += " mainFolderInner";
							Folder2.setAttribute("data-name", "mainFolderInner");
							Folder2title.className += " mainFolderInnerTitle";
							Folder2.className += " folder"+cleanTitles(folderName)+cleanTitles(folderName);
							Folder2.setAttribute("data-parent", cleanTitles(folderName));

							var list = document.querySelector('#folder'+cleanTitles(parentFolder)); 
							list.insertBefore(Folder2, list.childNodes[0]);			
							document.querySelector('#folder'+cleanTitles(folderName)).appendChild(Folder2title);
							
							$('#folder'+cleanTitles(parentFolder)).prepend($('#folderName'+cleanTitles(parentFolder)));
						}
					}
				}
			}
		}	
	}

	
	
	//cycle through files
	var files = event.target.files;
	for (var i2 = 0, f2; f2 = files[i2]; i2++) {
		if(files[i2].type==""){continue}
		//gets root Category
		var allfiles = files[i2].webkitRelativePath;
		allfiles = allfiles.split("/");

		var fileName2 = allfiles[allfiles.length - 1];
		var parentFolder2 = allfiles[allfiles.length - 2];			
		
		createfiles(cleanTitles(parentFolder2), fileName2, i2);
		
		//create files
		function createfiles(parentFolder2, fileName2, i2){
			var archiveLink = document.createElement("div");
			var fileURL = URL.createObjectURL(files[i2]);
			var title = cleanTitles(fileName2);
			//title = title.substr(0, title.lastIndexOf("."));
			archiveLink.className += " mainItemEnd";
			archiveLink.setAttribute("data-name", "mainItemEnd");
			var fileTitle = fileName2.substr(0, fileName2.length - 3);
			archiveLink.innerHTML = cleanTitleName(fileTitle);		
			archiveLink.setAttribute("onclick", "playArchiveFile('"+fileURL+"','"+cleanTitleName(fileTitle)+"','myDV"+i2+"','"+cleanTitleName(fileName2)+"')");
			archiveLink.setAttribute("id", "myDV"+[i2]);
			archiveLink.setAttribute("data-file", fileURL);
			var itemDV = archiveLink.setAttribute("id", "myDV"+[i2]);			
			
			var coverCheck = cleanTitles(fileName2).substr(cleanTitles(fileName2).length - 3);
			if($.inArray(coverCheck, endTypes) != -1&& $('#folder'+parentFolder2).hasClass('mainFolderInner')){
				var matchFolder = cleanTitles(fileName2).slice(0,cleanTitles(fileName2).length-3);
				
				if(matchFolder == cleanTitles(parentFolder2)){
					var r = new FileReader();
						r.onload = (function(f) {
							return function(e) {
								var dataURL = r.result;
								var output = document.querySelector('#folder'+parentFolder2);
								function gocolor(colorME){
									var colorThief = new ColorThief();
									colorThief.getColor(colorME);
								}
								var fakeimage = document.createElement("img");
								fakeimage.style.cssText += "opacity:0;width:200px;height:200px;position:fixed;top:-200px;";
								fakeimage.setAttribute("id", "myimg"+[i2]);
								fakeimage.setAttribute("src", dataURL);
								document.querySelector('body').appendChild(fakeimage);
								
								gocolor(fakeimage);
								imgColors = imgColors.toString();
								var colors = imgColors.split(",");
								
								$('#folder'+parentFolder2).attr('data-bk',dataURL);
								$('#folder'+parentFolder2).css({"background":"linear-gradient(to right, rgba("+parseInt(colors[0] - 70)+","+parseInt(colors[1] - 70)+","+parseInt(colors[2] - 70)+", 1) 0%, rgba("+colors[0]+","+colors[1]+","+colors[2]+", 1) 55%, rgba("+colors[0]+","+colors[1]+","+colors[2]+", 0) 70%), url('"+dataURL+"') right 50% / 75% no-repeat"});								
								$('#folder'+parentFolder2).children('.mainFolderInnerTitle').css("background-color","rgba("+colors[0]+","+colors[1]+","+colors[2]+",1)");
								$('#folder'+parentFolder2).children('.mainFolderInnerEnd:nth-child(odd)').children('.mainFolderInnerEndTitle').css("background","rgba("+parseInt(colors[0] - 30)+","+parseInt(colors[1] - 30)+","+parseInt(colors[2] - 30)+",1)");
								$('#folder'+parentFolder2).children('.mainFolderInnerEnd:nth-child(even)').children('.mainFolderInnerEndTitle').css("background","rgba("+parseInt(colors[0] - 40)+","+parseInt(colors[1] - 40)+","+parseInt(colors[2] - 40)+",1)");
								
								$('#folder'+parentFolder2).children('.mainFolderInnerEnd').children('.mainFolderInner').children('.mainFolderInnerTitle:nth-child(odd)').css("background","rgba("+parseInt(colors[0] - 90)+","+parseInt(colors[1] - 90)+","+parseInt(colors[2] - 90)+",1)");
								$('#folder'+parentFolder2).children('.mainFolderInnerEnd').children('.mainFolderInner').children('.mainFolderInnerTitle:nth-child(even)').css("background","rgba("+parseInt(colors[0] - 120)+","+parseInt(colors[1] - 120)+","+parseInt(colors[2] - 120)+",1)");
								$("#myimg"+[i2]).remove();
							};
						})(f);
						r.readAsDataURL(files[i2]);
				}
			}else if($.inArray(coverCheck, endTypes) != -1 && $('#folder'+parentFolder2+'[data-name="outterFolder'+parentFolder2+'"]')){
				//gets master logo
				var Logo = document.createElement("div");
				Logo.className += "broadcastLogo";
				Logo.setAttribute("id", "broadcastLogo");	
				
				var LogoSML = document.createElement("div");
				LogoSML.className += "broadcastLogoSML";
				if($("#myDVfolder h1").length!=0){
					document.querySelector("#myDVfolder h1").remove();
				}
					var sp2 = document.getElementById("myDVfolder");
					var parentDiv = sp2.parentNode;					
					parentDiv.insertBefore(Logo,sp2);
					document.querySelector("#myDVfolder").appendChild(LogoSML);
					
					var r = new FileReader();
						r.onload = (function(f) {
							return function(e) {
								var dataURL = r.result;
								var output = document.querySelector('#folder'+parentFolder2);
								function gocolor(colorME){
									var colorThief = new ColorThief();
									colorThief.getColor(colorME);
								}
								var fakeimage = document.createElement("img");
								fakeimage.style.cssText += "opacity:0;width:200px;height:200px;position:fixed;top:-200px;";
								fakeimage.setAttribute("id", "myimg"+[i2]);
								fakeimage.setAttribute("src", dataURL);
								document.querySelector('body').appendChild(fakeimage);
								
								gocolor(fakeimage);
								imgColors = imgColors.toString();
								var colors = imgColors.split(",");
								mainLogo = dataURL;
								$('body').css({"background":"linear-gradient(-135deg, rgba("+parseInt(colors[0] - 70)+","+parseInt(colors[1] - 70)+","+parseInt(colors[2] - 70)+", .8) 0%, rgba("+colors[0]+","+colors[1]+","+colors[2]+", .6) 50%, rgba("+parseInt(colors[0] - 70)+","+parseInt(colors[1] - 70)+","+parseInt(colors[2] - 70)+", .8) 100%), url('"+dataURL+"') right 50% / 75% no-repeat"});								
								$('.broadcastLogo').css({"background":"url('"+dataURL+"') right 50% / 75% no-repeat, linear-gradient(to right, rgba("+parseInt(colors[0])+","+parseInt(colors[1])+","+parseInt(colors[2])+", 1) 0%, rgba("+colors[0]+","+colors[1]+","+colors[2]+", 1) 50%, rgba("+parseInt(colors[0] - 70)+","+parseInt(colors[1] - 70)+","+parseInt(colors[2] - 70)+", 1) 100%)","background-color":"rgba("+parseInt(colors[0] - 70)+","+parseInt(colors[1] - 70)+","+parseInt(colors[2] - 70)+", 1)!important"});
								$('.broadcastLogoSML').css({"background":"url('"+dataURL+"') right 50% / 75% no-repeat","background-color":"transparent"});
								
								$("#bgvid").animate({opacity:0},300, function(){$("#bgvid").css('display','none');});
								$("#myimg"+[i2]).remove();
							};
						})(f);
						r.readAsDataURL(files[i2]);	
								
						//Creates coming up next
						var upNext = document.createElement("div");
						upNext.className += "upNext";
						upNext.setAttribute("id", "upNext");
						document.querySelector("#broadcastLogo").appendChild(upNext);
										
			}else{
				var fileCheck = cleanTitles(fileName2).substr(cleanTitles(fileName2).length - 3);
				if($.inArray(fileCheck, endfileTypes) != -1){
					
					if(parentFolder2!="Commercials"){
						bigDV.push("myDV"+i2);
						bigDVmarathon.push("myDV"+i2);	
						
						//GET TIMES OF FILES
						/*var videoCheck = document.createElement("video");
						videoCheck.className += "vidDurTest";
						videoCheck.setAttribute("id", "vidmyDV"+[i2]);
						videoCheck.setAttribute("preload", "metadata");
						document.querySelector('.controller').appendChild(videoCheck);
						$("#vidmyDV"+[i2]).attr('src',fileURL);
						
							var $el = $("#vidmyDV"+[i2]);
							$el.one('loadedmetadata', function () {
								
								var thisDur = $el[0].duration;
								var minutes = Math.floor(thisDur / 60);
							
								$("#myDV"+[i2]).attr("data-dur", minutes);
								$("#vidmyDV"+[i2]).remove();
							});	*/
													
					}
					
					var parentRoot = $('#folder'+parentFolder2).attr('data-parent');
					document.querySelector('.folder'+parentRoot+parentFolder2).appendChild(archiveLink);
				}
			}
		}
	}
	startWatch();
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function nextPlay(){	
	event.preventDefault();
	var nextItem = $.inArray( currDVpick, programType );
	console.log(nextItem);
	$('#'+programType[nextItem + 1]).trigger('click');
}

function createProgramm(){
	if(createdShedule==0){
		var progSchedule = document.createElement("div");
		progSchedule.className += "progSchedule";
		progSchedule.setAttribute("id", "progSchedule");
		document.querySelector("#broadcastLogo").appendChild(progSchedule);
	
		var showProgShedule = document.createElement("div");
		showProgShedule.className += "showProgSchedule";
		showProgShedule.setAttribute("id", "showProgSchedule");
		document.querySelector("#progSchedule").appendChild(showProgShedule);
		showProgShedule.innerHTML = "SHOW SCHEDULE";
		$('#showProgSchedule').bind('click', openProgramm);
	
		//schedule
		var progScheduleFrame = document.createElement("div");
		progScheduleFrame.className += "progScheduleFrame";
		document.querySelector("#progSchedule").appendChild(progScheduleFrame);
		
		var progScheduleInner = document.createElement("ul");
		progScheduleInner.className += "progScheduleInner";
		document.querySelector(".progScheduleFrame").appendChild(progScheduleInner);
		createdShedule=1;
	}
}
function showProgramm(){
	$('.progScheduleInner').html('');
	
	var nextItem = $.inArray( currDVpick, programType );
	
	var lastminSet = 0;
	for(var i=nextItem; i<programType.length; i++){
		var progSheduleInnerItem = document.createElement("li");
		progSheduleInnerItem.className += "progScheduleInnerItem";
		var shedName = cleanTitleName($('#'+programType[i]).parents('.mainFolderInner').children('.mainFolderInnerTitle').html());
		var title = $('#'+programType[i]).parents('.mainFolderInner').children('.mainFolderInnerTitle').html();
		if(title==undefined){
			shedName = progSheduleInnerItem.innerHTML = cleanTitleName($('#'+programType[i]).html());
		}	

		var shedTime = $('#'+programType[i]).attr('data-dur');
		
		var d = new Date ( d1 );
		if(lastminSet==0){
			d.setMinutes ( d1.getMinutes() );
			lastminSet = lastminSet + 1;
		}else{
			lastminSet = lastminSet - 1;
			if(!lastminSet==0){lastminSet = lastminSet + 2;}
			d.setMinutes ( d1.getMinutes() + lastminSet + parseInt(shedTime) );
			lastminSet = (lastminSet + parseInt(shedTime));
		}
		
		d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
		console.log('last:'+lastminSet,'thisT:'+d,'mins:'+shedTime)

		progSheduleInnerItem.setAttribute("id", programType[i]+"vidcheck");
		progSheduleInnerItem.innerHTML = "<div class='schedTime'>TIME: "+d+"</div> <div class='schedName'>"+shedName+"</div>";
		document.querySelector(".progScheduleInner").appendChild(progSheduleInnerItem);
	}
}
function openProgramm(){
	if($("#progSchedule").children(".progScheduleFrame").hasClass('activeProg')){
		$(".progScheduleFrame, #progSchedule").removeClass('activeProg');
		$('#showProgShedule').html("SHOW SCHEDULE");
	}else{
		$(".progScheduleFrame, #progSchedule").addClass('activeProg');
		$('#showProgShedule').html("HIDE SCHEDULE");
	}
}

//cleaning info
function cleanTitles(title){
	if(title.indexOf(' ') >= 0){
		title = title.replace(/\ /g, '-');
	}
	title = title.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
	title = title.replace(/\'/gi, "&#39;");
	title = title.replace(/\%20/gi, ' ');
	title = title.replace(/\%7E/gi, ' ');
	title = title.replace(/\%2D/gi, ' ');
	
	return title;
}
function cleanTitleName(title){	
	if(title){
		if(title.indexOf(' ') >= 0){
			//title = title.replace(/\ /g, '-');
			title = title.replace(/\ /g, ' ');
		}
		title = title.replace(/\'/gi, "&#39;");
		title = title.replace(/\ /g, ' ');
		title = title.replace(/\./g, '');
		title = title.replace(/\%20/g, ' ');
		title = title.replace(/\%7E/g, ' ');
	
		return title;
	}
}
function addArchiveBinds(){
	$('.mainFolder, .mainFolderInnerEnd, .mainFolderInner').bind('click', openArchive);
}

//player controls
function printValue(slider,sliderTitle){
	var theSlide = $('#'+slider).val();
	var newText;
	switch(slider){
		case "marathon":
			switch(theSlide){
				case "0":
					newText = "OFF";
					programType = [];
					programType = bigDV;
					marathonON = 0;
					upNext();
					break;
				case "1":
					newText = "ON";
					programType = [];
					programType = bigDVmarathon;
					marathonON = 1;
					upNext();
					break;
			}
			break;
		case "programtype":
			switch(theSlide){
				case "0":
					newText = "TV";
					broadcasting = 0;
					break;
				case "1":
					newText = "MOVIES";
					broadcasting = 1;
					break;
				case "2":
					newText = "BOTH";
					broadcasting = 2;
					break;
			}
			break;
		case "commercials":
			switch(theSlide){
				case "0":
					commercialON = 0;
					newText = "OFF";
					break;
				case "1":
					commercialON = 1;
					newText = "ON";
					break;
			}
			break;
	}
	
	$('#'+slider).blur();
	$('.'+sliderTitle).html(newText);
}
function onKeyControl(event){

	var mySwitch = event.keyCode;
	switch(mySwitch){
		case 37:
			$('#prev').trigger('click');
		break;
		case 39:
			$('#next').trigger('click');
		break;
	}
}
function controller(){
	var nextItem = $.inArray( currDVpick, programType );
	var direction = $(this).attr('data-name');
		
	var playme;	
	if(direction=="prev"){
		playme = nextItem - 1;
	}else{
		playme = nextItem + 1;
	}
	$("#" + programType[playme] + "").trigger("click");
}

function startWatch(){	
	document.querySelector('.page1').style.display = "none";
	shuffle(bigDV);
	programType = [];
	programType = bigDV;
	var item = programType[0];
	$('#'+item).trigger('click');
	addArchiveBinds();
} 

function openArchive(){
	var id = $(this).attr('id');
console.log(id);
 	if($('#'+id).hasClass('active')){
		$('#'+id).removeClass('active');
	}else{
		$('#'+id).addClass('active');
	}
	return false;

}

/*animate*/
function animateSet(spot){
	var target = document.getElementById(spot);
	var scrollTarget = target.offsetTop - 20;

	animate(document.body, "scrollTop", "", document.body.scrollTop, scrollTarget, 600, true);
}
function animate(elem,style,unit,from,to,time,prop) {
var w = window.innerWidth;
    if( !elem) return;
    var start = new Date().getTime(),
        timer = setInterval(function() {
            var step = Math.min(1,(new Date().getTime()-start)/time);
            if (prop) {
                elem[style] = (from+step*(to-from))+unit;
            } else {
                elem.style[style] = (from+step*(to-from))+unit;
            }
            if( step == 1){ 
            	clearInterval(timer);
            }
        },25);
    elem.style[style] = from+unit;
	return;
}
/*animate*/