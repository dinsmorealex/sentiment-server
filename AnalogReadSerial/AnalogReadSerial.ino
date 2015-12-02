const int analogInPin = A1;  // Analog input pin that the potentiometer is attached to
const int buttonPin = 13;
int sensorValue = 0;        // value read from the pot
int prevsensorValue = 0;
int outputValue =0;
int buttonState = 0;
int bluePin=3;
int redPin=2;

const int switchPin = 15;     
int switchState;            
int lastSwitchState = LOW;  
long lastDebounceTime = 0;  
long debounceDelay = 50;
int prevR = 0, prevG = 0, prevB = 0; // all of the previous RGB values
int const Red = 23; //pin 3 
int const Blue = 22; // pin 4
int const Green = 21; // pin 5




void setup() {
  
 
   pinMode(buttonPin, INPUT);
  pinMode(switchPin, INPUT);
  pinMode(bluePin, OUTPUT);
  pinMode(redPin,OUTPUT);
  
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
   
 
}



void loop() {
  
   int reading = analogRead(analogInPin);
   int val=map(reading,0,1023,0,255);
 
  RGB(val, 255, 255); 
   delay(200);
   RGB(120,val,255);
  delay(200);
    RGB(val, 255, val);
  delay(200);
    RGB(255, val, 255);
  delay(200);
     RGB(255, val,255-val);
  delay(200);


 
 

   
   
                   
}


void decide(){
    
buttonState = digitalRead(buttonPin);

if (buttonState == HIGH){
  Serial.write("Y");
  Serial.write("on");
  Serial.write("Z");
   
}
}

void RGB(int R, int G, int B) {
  pot();
 decide();
 sentiment();
for (int i = 0; i <= 255; i++)
{
if (i >=  prevR - R && prevR < R) {
 
  analogWrite(Red, prevR + i);
}
if (i >= prevG - G && prevG < G) {
 
  analogWrite(Green, prevG + i);
 
}
if (i >= prevB - B && prevB < B) {
 
  analogWrite(Blue, prevB + i);
 
}
//delay(10);
//}
//for (int i = 0; i <= 255; i++)
//{
if (i >= R - prevR && prevR > R) {
 
  analogWrite(Red, prevR - i);
}
if (i >= G - prevG && prevG > G) {
 
  analogWrite(Green, prevG - i);
 
}
if (i >= B - prevB && prevB > B) {
 
  analogWrite(Blue, prevB - i);
 
}

}


analogWrite(Red, R);
analogWrite(Green, G);
analogWrite(Blue, B);
prevR = R;
prevG = G;
prevB = B;
}

void sentiment(){
  
  int reading = digitalRead(switchPin);

  if (reading != lastSwitchState) {
    // reset the debouncing timer
    lastDebounceTime = millis();
  } 
  
  if ((millis() - lastDebounceTime) > debounceDelay) {
    // whatever the reading is at, it's been there for longer
    // than the debounce delay, so take it as the actual current state:
   if( reading==HIGH){
     Serial.write("J");
     Serial.write("positive");
     Serial.write("K");
     digitalWrite(bluePin,HIGH);
     digitalWrite(redPin,LOW);
      
   }
   else if (reading ==LOW){
    Serial.write("Q");
   Serial.write("negative");
   Serial.write("V");
   digitalWrite(bluePin,LOW);
     digitalWrite(redPin,HIGH);
     
   
   };
  
    
  }
  
    lastSwitchState = reading;

  
}



void pot(){
  
  sensorValue = analogRead(analogInPin);
  outputValue = map(sensorValue, 0, 1023, 0, 9);
  
  if (prevsensorValue != outputValue) {
    // print the results to the serial monitor:
    Serial.print("A"); // Print the letter A to signal the beginning of an Input
    Serial.print(outputValue); // Send the sensor Value (this is an integer)
    Serial.print("B"); // Print the letter B to signal the end of an Input
    prevsensorValue = outputValue; // Change the previous sensor value
  }
  // wait 100 milliseconds before the next loop
  // for the analog-to-digital converter to settle
  // after the last reading. If you are sending too fast
  // there is also a tendency to flood the communication line.
       
  
}

