#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <Servo.h>
Servo servo;
const char* ssid = "White";
const char* password = "@Naughtyboy420";

ESP8266WebServer server(80);

const byte L298N_A_pin = D1;
const byte L298N_A_In1_pin = D2; 
const byte L298N_A_In2_pin = D3;
const byte L298N_B_In3_pin = D4; 
const byte L298N_B_In4_pin = D5; 
const byte L298N_B_pin = D6; 

const byte pump =  D0; 
const byte red =  D7; 
const byte yollow =  D8; 

void motorSpeed(int prmA, byte prmA1, byte prmA2, int prmB, byte prmB1, byte prmB2)
{
  analogWrite(L298N_A_pin,prmA);
  analogWrite(L298N_B_pin,prmB);
  digitalWrite(L298N_A_In1_pin,prmA1);
  digitalWrite(L298N_A_In2_pin,prmA2);
  digitalWrite(L298N_B_In3_pin,prmB1);
  digitalWrite(L298N_B_In4_pin,prmB2);
}

void handleRoot() {
  server.send(200, "text/plain", "hello from esp8266!");
 }

void handleCar() {
 String message = "";
 int BtnValue = 0;
  for (uint8_t i = 0; i < server.args(); i++) {
    if (server.argName(i)=="robo")
    {
      String s = server.arg(i);
      BtnValue = s.toInt();
    }
    Serial.println(server.argName(i) + ": " + server.arg(i) + "\n");
  }
  switch (BtnValue) {
   case 1:
      motorSpeed(1023,LOW,HIGH,1023,HIGH,LOW);
      delay(650);
      motorSpeed(0,LOW,LOW,0,LOW,LOW);
      motorSpeed(1023,HIGH,LOW,1023,HIGH,LOW);
      delay();
      motorSpeed(0,LOW,LOW,0,LOW,LOW);
      motorSpeed(1023,LOW,HIGH,1023,HIGH,LOW);
      delay(650);
      motorSpeed(0,LOW,LOW,0,LOW,LOW);
      motorSpeed(1023,HIGH,LOW,1023,HIGH,LOW);
      delay(650);
      motorSpeed(0,LOW,LOW,0,LOW,LOW);
      motorSpeed(1023,LOW,HIGH,1023,HIGH,LOW);
      delay(650);
      motorSpeed(0,LOW,LOW,0,LOW,LOW);
      motorSpeed(1023,HIGH,LOW,1023,HIGH,LOW);
      delay(650);
      motorSpeed(0,LOW,LOW,0,LOW,LOW);
      motorSpeed(1023,LOW,HIGH,1023,HIGH,LOW);
      delay(650);
      motorSpeed(0,LOW,LOW,0,LOW,LOW);
      default:
      break;
   case 2: // running right
      motorSpeed(1000,HIGH,LOW,1000,HIGH,LOW); 
     break;
  case  3:// move right
     motorSpeed(1000,HIGH,LOW,1000,HIGH,LOW);
     delay(650);
     motorSpeed(0,LOW,LOW,0,LOW,LOW); 
     break;
  case  4:// run forward
     motorSpeed(1000,LOW,HIGH,1000,HIGH,LOW); 
     break;
  case 5: // stop   
   motorSpeed(0,LOW,LOW,0,LOW,LOW); 
   break;     
  case  6:// run backward
     motorSpeed(1000,HIGH,LOW,1000,LOW,HIGH); 
    break;
  case 7:// servo right
   servo.write(60);
    delay(700);
    break;
  case 8:// running left
    motorSpeed(1000,LOW,HIGH,1000,LOW,HIGH);      
    break;
  case 10:// light off
    digitalWrite(pump,LOW);  
    break;
  case 11:// light on
    digitalWrite(pump,HIGH);  
    break;
  case 12:// light on
    servo.write(0);
    delay(700);
    break;  
  case 9:// servo left
    motorSpeed(1000,LOW,HIGH,1000,LOW,LOW); 
    break;
  }
  message += "<html> <head> <title>HAlUM FIRE</title><head>";
  message += "<body><h3>SANZI THE AI ROBOT</h1>";
  message += "<table> "; 
  message += "<tr>";
  message += "<td><p><a href=\"/car?robo=1\"><button style=\"width:100;height:100;font-size:50px;\" class=\"button\">#</button></a></p> ";
  message += "<td><p><a href=\"/car?robo=4\"><button style=\"width:100;height:100;font-size:50px;\" class=\"button\">F</button></a></p> ";
  message += "<td><p><a href=\"/#\"><button style=\"width:100;height:100;font-size:50px;\" class=\"button\">#</button></a></p> ";
  message += "<tr>";
  message += "<td><p><a href=\"/car?robo=8\"><button style=\"width:100;height:100;font-size:50px;\" class=\"button\">L</button></a></p> ";
  message += "<td><p><a href=\"/car?robo=5\"><button style=\"width:100;height:100;font-size:50px;\" class=\"button\">S</button></a></p> ";
  message += "<td><p><a href=\"/car?robo=2\"><button style=\"width:100;height:100;font-size:50px;\" class=\"button\">R</button></a></p> ";
  message += "<tr>";
  message += "<td><p><a href=\"/car?robo=10\"><button style=\"width:100;height:100;font-size:50px;\" class=\"button\">OF</button></a></p> ";
  message += "<td><p><a href=\"/car?robo=6\"><button style=\"width:100;height:100;font-size:50px;\" class=\"button\">B</button></a></p> ";
  message += "<td><p><a href=\"/car?robo=11\"><button style=\"width:100;height:100;font-size:50px;\" class=\"button\">ON</button></a></p> ";
  message += "</table> "; 
  message += "</body></html>";
  server.send(200, "text/html", message);
 }

void handleNotFound() {
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
}
 

void setup() {
  servo.attach(16); //D4

servo.write(30);
  pinMode(L298N_A_In1_pin,OUTPUT);
  pinMode(L298N_A_In2_pin,OUTPUT);
  pinMode(L298N_B_In3_pin,OUTPUT);
  pinMode(L298N_B_In4_pin,OUTPUT);

 digitalWrite(L298N_A_In1_pin,LOW);
 digitalWrite(L298N_A_In2_pin,LOW);
 digitalWrite(L298N_B_In3_pin,LOW);
 digitalWrite(L298N_B_In4_pin,LOW);

  pinMode(pump,OUTPUT);
  digitalWrite(pump,LOW);
  
  Serial.begin(115200); 

   WiFi.mode(WIFI_STA);
   WiFi.begin(ssid, password);
   Serial.println("");
   while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/car", handleCar);

  server.on("/inline", []() {
    server.send(200, "text/plain", "this works as well");
  });

  server.onNotFound(handleNotFound);

  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
}
