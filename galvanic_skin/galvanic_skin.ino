int ledPin = 12;

int dataPin =11 ;
int dataPin2= 10;

const int analogInPin = A3 ;
int sensorValue = 0;        // value read from the pot
int prevsensorValue = 0;
int outputValue =0;

int GSRPin = A0;

   
int LEDvalue; 

int GSRValue;
int GSRVal2;
int prevGSRVal;

int ledState = LOW; 
int dataState =LOW;
unsigned long previousMillis = 0; 
unsigned long previousMillis2 = 0; 
long interval1 = 0; 
long interval2=0;
 
//int i=5;

void setup(){
  
  
  pinMode(dataPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop(){
  
   input();
  selector();
//  receiver();
 
}

void selector(){
   sensorValue = analogRead(analogInPin);
  outputValue = map(sensorValue, 0, 1023, 0, 20);
  
  if (prevsensorValue != outputValue) {
    // print the results to the serial monitor:
   Serial.print("A"); // Print the letter A to signal the beginning of an Input
    Serial.print(outputValue); // Send the sensor Value (this is an integer)
   Serial.print("B"); // Print the letter B to signal the end of an Input
    prevsensorValue = outputValue; // Change the previous sensor value
  }
  delay(100);
  // wait 100 milliseconds before the next loop
  // for the analog-to-digital converter to settle
  // after the last reading. If you are sending too fast
  // there is also a tendency to flood the communication line.
  
  
}
void input(){
  
   GSRValue = analogRead(GSRPin);
  int GSRVal2 =GSRValue;
  if(prevGSRVal !=GSRVal2){
  Serial.print("Y"); // Print the letter A to signal the beginning of an Input
   Serial.print(GSRVal2); // Send the sensor Value (this is an integer)
   Serial.print("Z"); // Print the letter B to signal the end of an Input
   prevGSRVal = GSRVal2; 
  }
  
   
 interval1 =GSRVal2 *5;
   unsigned long currentMillis = millis();
 
  if(currentMillis - previousMillis > interval1) {
    // save the last time you blinked the LED 
    previousMillis = currentMillis;   

    // if the LED is off turn it on and vice-versa:
    if (ledState == LOW){
      ledState = HIGH;
    }
    else{
      ledState = LOW;
  }
  
      
 

    digitalWrite(ledPin, ledState);
}
  
  else{
    digitalWrite(ledPin,LOW);
  
    
}
 
  


//     if (Serial.available() > 0) {
//    // read the incoming byte:
//    char inputData= Serial.read();
//    Serial.println("i: "+inputData);
//    if (inputData<0){
//     inputData= 22;
//    }
//   
//   
//  interval2 =200;
// unsigned long currentMillis2 = millis();
// 
//  if(currentMillis2 - previousMillis2 > interval2) {
//    // save the last time you blinked the LED 
//    previousMillis2 = currentMillis2;   
//
//    // if the LED is off turn it on and vice-versa:
//    if (dataState == LOW)
//      dataState = HIGH;
//    else
//      dataState = LOW;
//
//    // set the LED with the ledState of the variable:
//    digitalWrite(dataPin, dataState);
//    digitalWrite(dataPin2, dataState);
//  }
//   
//
//    }
//   

}
   
    
  







