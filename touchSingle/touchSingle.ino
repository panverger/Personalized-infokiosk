// constants won't change. They're used here to set pin numbers:
const int SENSOR_PINA = 5; // the Arduino's input pin that connects to the sensor's SIGNAL pin 
const int SENSOR_PINB = 6;
const int SENSOR_PINC = 7;

// Variables will change:
int lastStateA = LOW;      // the previous state from the input pin
int currentStateA;         // the current reading from the input pin
int lastStateB = LOW;      // the previous state from the input pin
int currentStateB;         // the current reading from the input pin
int lastStateC = LOW;      // the previous state from the input pin
int currentStateC;         // the current reading from the input pin


void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  // initialize the Arduino's pin as aninput
  pinMode(SENSOR_PINA, INPUT);  
  pinMode(SENSOR_PINB, INPUT);
  pinMode(SENSOR_PINC, INPUT);
}

void loop() {
  // read the state of the the input pin:
  currentStateA = digitalRead(SENSOR_PINA);

  if(lastStateA == LOW && currentStateA == HIGH)
    Serial.println("The sensor A is touched");

  // save the the last state
  lastStateA = currentStateA;

    // read the state of the the input pin:
  currentStateB = digitalRead(SENSOR_PINB);

  if(lastStateB == LOW && currentStateB == HIGH)
    Serial.println("The sensor B is touched");

  // save the the last state
  lastStateB = currentStateB;

    // read the state of the the input pin:
  currentStateC = digitalRead(SENSOR_PINC);

  if(lastStateC == LOW && currentStateC == HIGH)
    Serial.println("The sensor C is touched");

  // save the the last state
  lastStateC = currentStateC;
}
