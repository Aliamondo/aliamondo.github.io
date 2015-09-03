window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var groupDisplayArea = document.getElementById('groupDisplayArea');
		var threatsDisplayArea = document.getElementById('threatsDisplayArea');
		var headerDisplayArea = document.getElementById('headerDisplayArea');
		var threats = [];
		var longestNameLength = 0;
		
		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					//groupDisplayArea.innerText = reader.result;
					
					var lines = reader.result.split('\n');
					threats = [];
					var groupResult = "";
					var threatsResult = "";
					
					for (var line = 0; line < lines.length; line++){
						//console.log(lines[line]);
						var endPosTemp = lines[line].indexOf(") -> "); //for threat names
						var groupFoundTemp = lines[line].indexOf("Detected:"); //for group names
						if (endPosTemp > -1) { //for the threat name detection and for updating the number of times the threat appears
							//console.log(endPosTemp);
							var startPosTemp = lines[line].lastIndexOf("(", endPosTemp); //for threat names
							var threatTemp = {name:lines[line].substring(startPosTemp + 1, endPosTemp), count:1};
							
							if (threatTemp.name.length > longestNameLength) {
								longestNameLength = threatTemp.name.length;
							}
							//console.log(threatTemp);
							
							var found = false;
							for (var i = 0; i < threats.length && !found; i++) {
								if (threats[i].name.toLowerCase()===threatTemp.name.toLowerCase()) {
									threats[i].count += 1;
									found = true;
									//console.log(threats[i].name.concat(", count: ", threats[i].count.toString()));
								}
							}
							if (!found) {
								threats.push(threatTemp);
							}
						}
						
						if (groupFoundTemp > -1) {
							groupResult += lines[line].replace("Detected", "Infected") + "\n"; //we just change the word to Infected
						}
					}	
					
					//threatsResult += "\n\nThreat name" + new Array(longestNameLength + 1 + 5).join(' ') + "Number of times\n\n"; //5 is just an extra manual number of spaces to make it look pretty
					for (var i = 0; i < threats.length; i++) {
						threatsResult = threatsResult.concat(threats[i].name, " ", threats[i].count.toString(), "\n");
						//threatsResult = threatsResult.concat(threats[i].name, new Array(longestNameLength + 1 + 5 + 18 - threats[i].name.length).join(' '), threats[i].count.toString(), "\n");
						// 18 is (the length of "Threat name" + the length of "Number ") 
					}
					
					groupDisplayArea.innerText = groupResult;
					headerDisplayArea.innerText = "\n\nThreat name" + new Array(5).join(' ') + "Number of times\n\n"; //5 is just an extra manual number of spaces to make it look pretty
					threatsDisplayArea.innerText = threatsResult;
				}

				reader.readAsText(file);				
			} else {
				groupDisplayArea.innerText = "File not supported!"
			}
		});
}
function selectArea(n) {
	var text = document.getElementById(n), range, selection;    
    if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}