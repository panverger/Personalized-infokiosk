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
            //console.log(out_msg);
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
		var ind = -1;

		for (var i = 0; i < ids.length; i++) {
			if (ids[i][1] == msg) { ind = i }
		}
		try {
			if (topic == "/pps/button" && loginState) {
				if (msg == "left") {
				  if (ind_page>0) { 
					ind_page--;
					console.log(ind_page);
					show_page(ind_page); 
					}	
		          $("#leftPanel").animate(
					{opacity:.2},
				  500, function() {
				  $("#leftPanel").animate({
                    opacity:1
				  }, 200)
                  });
				} 
				if (msg == "right") {
				  if (ind_page<pages.length-1) { 
  					ind_page++;
					console.log(ind_page);
					show_page(ind_page); 
					}
		          $("#rightPanel").animate(
					{opacity:.2},
				  500, function() {
				  $("#rightPanel").animate({
                    opacity:1
				  }, 200)
                  });			
				}
				if (msg == "select") {
				  show_page(0);
		          $("#selectPanel").animate(
					{opacity:.2},
				  500, function() {
				  $("#selectPanel").animate({
                    opacity:1
				  }, 200)
                  });			
				} 				
			}
			
			if (topic == "/pps/cardID") {
				if (ids[ind][0]>0) {
					if (!loginState) {
						window.location.href = "main.php?ID="+ids[ind][0]+"&name="+ids[ind][2]; }
					else {
						toast("Αποσύνδεση...");
						setTimeout(function(){ window.location.href = "index.php"; },1200);
					}
				} else {
					toast("Δοκιμάστε ξανά. Η κάρτα σας δεν έγινε αποδεκτή ...");
				}
			}
		}
		catch(err) {
			toast("Δοκιμάστε ξανά. Η κάρτα σας δεν έγινε αποδεκτή ...");
		}
      }
	  
	  function show_page(index){
		 $("#main").html('<object id="slides" style="min-height:87vh; width:100%" data="https://docs.google.com/presentation/d/1J9bhYd7Liicw_xZADMJNHxMldPvTmfFFH1It--PxtSA/embed#slide='+pages[index]+'"/>'); 
		  
	  }
