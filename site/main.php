<!doctype html>
<?php 
$ID = $_GET["ID"];
$name = $_GET["name"];
?>
<html lang="gr">
<head>
  <meta charset="utf-8">
  <title>PPS</title>
  <link rel="stylesheet" type="text/css" href="main.css">
  <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"></script>
	<script>
	 	var ids = [];
		var loginState = true;
	 	<?php
		$db = new SQLite3('nfccards.sqlite');
        $IDS = $db->query("SELECT * FROM cards;");
        while ($table = $IDS->fetchArray(SQLITE3_ASSOC)) {
			echo ("ids.push(['".$table['AA']."','".$table['ID']."','".$table['NAME']."','".$table['pages']."']);");
		}
	?>
	</script>
   <script src="connect.js"></script> 	
</head>
<body onLoad=MQTTconnect();>
<div id="title">
<center>ΠΡΟΣΩΠΙΚΟΣ ΠΙΝΑΚΑΣ ΕΝΗΜΕΡΩΣΗΣ
</div>
<div class=row>
<div id="side">
<b>ΣΥΝΔΕΜΕΝΟΣ</b><br>
<script>
console.log(ids);
document.write(ids[<?=$ID-1?>][2]);
document.write("<br><img src='images/"+ids[<?=$ID-1?>][0]+".jpg' width=80%>");
var pages = ids[<?=$ID-1?>][3].split(",");
var ind_page=0;
console.log(pages);
</script>
</div>
<div id="main">
<script>
$("#main").html('<object id="slides" style="min-height:87vh; width:100%" data="https://docs.google.com/presentation/d/1J9bhYd7Liicw_xZADMJNHxMldPvTmfFFH1It--PxtSA/embed#slide='+pages[ind_page]+'"/>');
</script>
</div>
</div>

<div id="bottom-container">
<div class='right' id="rightPanel" >
<img src="images/right-arrow.png" alt="right" class=rightArrow>
</div>

<div class='select' id="selectPanel" >
<img src="images/select-arrow.png" alt="select" class=selectArrow>
</div>

<div class='left' id="leftPanel">
<img src="images/left-arrow.png" alt="left" class=leftArrow>
</div>
</div>

<div id="msg"></div> 
</body>
</html>