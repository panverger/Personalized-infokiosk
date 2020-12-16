<html>

   <head>
	  <meta charset="utf-8"> 
      <title>JavaScript MQTT WebSocket Example</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript">
     </script>
	 <link rel="stylesheet" type="text/css" href="login.css">
	 <script>
	    var loginState = false;
	 	var ids = [];
	 	<?php
		$db = new SQLite3('nfccards.sqlite');
        $IDS = $db->query("SELECT * FROM cards;");
        while ($table = $IDS->fetchArray(SQLITE3_ASSOC)) {
			echo ("ids.push(['".$table['AA']."','".$table['ID']."','".$table['NAME']."']);");
		}
		?>
	 </script>
	 <script src="connect.js"></script> 

   </head>
   <body onLoad=MQTTconnect();>
    <h1><center>ΠΡΟΣΩΠΟΠΟΙΗΜΕΝΟ ΣΥΣΤΗΜΑ ΕΝΗΜΕΡΩΣΗΣ <center></h1>
    <div class="cardScan" id="cardScan">
	<button class="button center" > Παρακαλώ περάστε την κάρτα σας <br> από τον αναγνώστη NFC για να εισέλθετε στο σύστημα </button>
	<p><p>
	<center><img src="images/nfc-logo.png"></center>
	</div>
	<div id="msg"></div>


   </body>  
</html>