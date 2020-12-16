        var mqtt;
        var reconnectTimeout = 5000;
        var host="194.63.218.8"; //change this
        var port=61614;
        var lastMsg;

        function onFailure(message) {
            console.log("Connection Attempt to Host "+host+" Failed");
			host="194.63.218.8";
            setTimeout(MQTTconnect, reconnectTimeout);
        }
        function onMessageArrived(msg){
            out_msg="Message received "+msg.payloadString+"<br>";
            out_msg=out_msg+"Message received Topic "+msg.destinationName;
            console.log(out_msg);
            //document.write(msg.payloadString);
			check(msg.destinationName, msg.payloadString);
        }

        function onConnect() {
      // Once a connection has been made, make a subscription and send a message.

        console.log("Connected ");
        //document.write("connected to "+ host);
        mqtt.subscribe("/pps/+");
        message = new Paho.MQTT.Message("Client Connected Sucessfully");
        message.destinationName = "/pps/logs";
        mqtt.send(message);
      }

      function MQTTconnect() {
        console.log("connecting to "+ host +" "+ port);
		var client = "client"+Math.random();
        mqtt = new Paho.MQTT.Client(host,port,client);
        //document.write("connecting to "+ host);
        var options = {
            timeout: 3,
            userName : "user1",
            password : "password",
            onSuccess: onConnect,
            onFailure: onFailure,
             };
        mqtt.onMessageArrived = onMessageArrived;
        mqtt.connect(options); //connect
        }
		
	  function toast(txt) {
		var x = document.getElementById("msg");
		x.className = "show";
		x.innerHTML = txt;
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		}

	  function check(topic, msg) {
		if (topic == "/pps/button") {
			if (msg == "left") {
				console.log("left");
				$("#leftPanel").show().delay(500).fadeOut();
			} 
			if (msg == "right") {
				console.log("right");
				$("#rightPanel").show().delay(500).fadeOut();;
			} 
			if (msg == "select") {
				console.log("select");
				$("#selectPanel").show().delay(500).fadeOut();
			} 
		}
		
		var cardID = "88 04 52 15 90 00";
		var ID = 1;
		if (topic == "/pps/cardID") {
			if (msg == cardID) {
				toast("Αποσύνδεση...");
				setTimeout(function(){ window.location.href = "login.html"; },2000);
			} 
		}
      }
