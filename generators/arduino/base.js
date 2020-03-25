/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.base');

goog.require('Blockly.Arduino');
/*
Blockly.Arduino.robot_motors_on_for_seconds = function() {//+
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000'
  var code = 'delay(' + delay_time + ');\n';
  return code;
};*/
/*
Blockly.Arduino.base_delay = function() {//+
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000'
  var code = 'delay(' + delay_time + ');\n';
  return code;
};



Blockly.Arduino.inout_buildin_led = function() {//+
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_output_13'] = 'pinMode(13, OUTPUT);';
  var code = 'digitalWrite(13, ' + dropdown_stat + ');\n'
  return code;
};
*/
var USELESS =0; var OUTP= 1;var INP = 2; var VLAGA=3;var SONIC =4;
var newcat_pins = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

Blockly.Arduino.restart = function(){
newcat_pins = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
dir_l=1;
dir_r=1;
power_l=63;
power_r=63;
};

Blockly.Arduino.math_angle = function() {//+
  // Boolean values HIGH and LOW.
  var code = this.getFieldValue('NUM') ;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_positions = function() {//+
  // Boolean values HIGH and LOW.
  var code = this.getFieldValue('ROBOT_POSITION') ;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.high_low = function() {//+
  // Boolean values HIGH and LOW.
  var code = (this.getFieldValue('HIGHLOW') == '1') ? 'HIGH' : 'LOW';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.pin_anal = function() {
    var code = this.getFieldValue('PIN_ANAL');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.pwm_pins = function() {
    var code = this.getFieldValue('PWM_PINS');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.otto_dura = function() {
    var code = this.getFieldValue('LED_NUMS');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_sensors = function() {
    var code = this.getFieldValue('ROBOT_SENSORS');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_directions = function() {
    var code = this.getFieldValue('ROBOT_DIRECTION');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_one_motor_directions = function() {
    var code = this.getFieldValue('ROBOT_ONE_MOTOR_DIRECTION');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.rgb_values = function() {
    var code = this.getFieldValue('RGB_VALUES');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_sensors_for_rgb = function() {
    var code = this.getFieldValue('ROBOT_SENSORS_FOR_RGB');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
Blockly.Arduino.lab_sensors = function() {
    var code = this.getFieldValue('LAB_SENSORS');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.button_numbers = function() {
    var code = this.getFieldValue('BUTTON_NUMBERS');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.lab_external_sensors = function() {
    var code = this.getFieldValue('EXTERNAL_SENSORS');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.led_nums = function() {
    var code = this.getFieldValue('LED_NUMS');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.led_colors = function() {
    var code = this.getFieldValue('LED_COLORS');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
*/
/*
Blockly.Arduino.newcat_set_dig = function() {//+
  var dropdown_pin =Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');\n';
  return code;
};*/

Blockly.Arduino.newcat_set_dig = function() {//+
  var code;
  var dropdown_pin =Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = Blockly.Arduino.valueToCode(this, 'HIGHLOW');
  Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  code = 'digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');\n';
  return code;
};

Blockly.Arduino.newcat_set_ana = function() {//+
  var dropdown_pin = Blockly.Arduino.valueToCode(this,'PWM_PINS', Blockly.Arduino.ORDER_ATOMIC);;
  //var dropdown_stat = this.getFieldValue('STAT');
  var code;
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  code = 'analogWrite(' + dropdown_pin + ', ' + value_num + ');\n';
  return code;
};

Blockly.Arduino.newcat_read_dig = function() {//+
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var code;
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.newcat_read_ana = function() {//+
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var code;
  if(newcat_pins[dropdown_pin]==7)
  {
    newcat_pins.forEach(function(item, i, newcat_pins) {
      if(item==8)
      dropdown_pin=i;
    });
    code = 'sensor.read('+dropdown_pin + ');\n'+'sensor.temperature';
  }
  else if(newcat_pins[dropdown_pin]==8)
  {
    code = 'sensor.read('+dropdown_pin + ');\n'+'sensor.humidity';
  }
  else
  {
   Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
   code = 'analogRead(' + dropdown_pin + ')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];

  /*  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';
    var code = 'sensor.read(dropdown_pin' + ');\n';*/  // only 1 datchik
    /*  Serial.println(sensor.humidity);
  Serial.println(sensor.temperature);*/

};

Blockly.Arduino.newcat_servo = function() {//+
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var value_degree = Blockly.Arduino.valueToCode(this, 'ANGLE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';\n';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';
  var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');\n';
  return code;
};

Blockly.Arduino.newcat_set_hum = function() {//+
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var pin = Blockly.Arduino.valueToCode(this, 'NUM2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_dht'] = '#include "dht11.h"\n';
  Blockly.Arduino.definitions_['define_dht2'] = 'dht11 sensor;\n';
  newcat_pins[dropdown_pin]=7;
  newcat_pins[dropdown_pin]=8;
//  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';
//  var code = 'sensor.read(dropdown_pin' + ');\n';
//  return code;
};

Blockly.Arduino.newcat_set_pult = function() {//+ // гужна своя либа!
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['pult'] = '#include <IRremote.h>"\n';
  Blockly.Arduino.definitions_['define_pult'] = 'IRrecv irrecv('+dropdown_pin+');\n';
  Blockly.Arduino.setups_['setup_pult'] = 'irrecv.enableIRIn();\ndecode_results results;\n';
  newcat_pins[dropdown_pin]=5;
//irrecv.decode(&results)
};

Blockly.Arduino.newcat_play_sound = function() {//+
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var type = Blockly.Arduino.valueToCode(this, 'NOTE_TYPE', Blockly.Arduino.ORDER_ATOMIC);
  var dyra = Blockly.Arduino.valueToCode(this, 'NOTE_DURA', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'tone(' + dropdown_pin + ',' + type*60 + ','+ dyra + ');\n';
  return code;
};
var dir_l=1;
var dir_r=1;
var power_l=63;
var power_r=63;
var dl_pin = 10;
var sl_pin = 9;
var dr_pin = 6;
var sr_pin = 5;
Blockly.Arduino.robots_start = function() {
  Blockly.Arduino.definitions_['right_forward']  = 'const byte RFPIN = 6;';
  Blockly.Arduino.definitions_['left_forward'] = 'const byte LFPIN = 10;';
  Blockly.Arduino.definitions_['right_backward']  = 'const byte RBPIN = 5;';
  Blockly.Arduino.definitions_['left_backward'] = 'const byte LBPIN = 9;';
  Blockly.Arduino.definitions_['sensor1'] = 'const byte SENSOR1PIN = 4;';
  Blockly.Arduino.definitions_['sensor2'] = 'const byte SENSOR2PIN = 7;';
  Blockly.Arduino.definitions_['sensor3'] = 'const byte SENSOR3PIN = 8;';
  Blockly.Arduino.definitions_['sensor4'] = 'const byte SENSOR4PIN = 11;';
  Blockly.Arduino.definitions_['sensor5'] = 'const byte SENSOR5PIN = 12;';
  Blockly.Arduino.definitions_['power_l'] = 'byte power_l = 75;';
  Blockly.Arduino.definitions_['power_r'] = 'byte power_r = 75;';
  Blockly.Arduino.definitions_['dir_l'] =   'bool dir_l = 1;';
  Blockly.Arduino.definitions_['dir_r'] =   'bool dir_r = 1;';
  Blockly.Arduino.definitions_['step_l'] =   'volatile unsigned int lmsteps = 0;';
  Blockly.Arduino.definitions_['step_r'] =   'volatile unsigned int rmsteps = 0;';;
  Blockly.Arduino.definitions_['step_l_lim'] =   'volatile unsigned int lstepslimit = 99999;';
  Blockly.Arduino.definitions_['step_r_lim'] =   'volatile unsigned int rstepslimit = 99999;';
  Blockly.Arduino.definitions_['mutex'] =   'volatile bool mutex = 0;';
  Blockly.Arduino.definitions_['lmstep'] =   'void onLeftMotorStep() \n{\nlmsteps++;\nif(lmsteps >= lstepslimit)\n{\nlstepslimit=99999;\nrstepslimit=99999;\nmutex=1;\nanalogWrite( LBPIN , 0 );\nanalogWrite( RFPIN , 0 );\nanalogWrite( RBPIN , 0 );\nanalogWrite( LFPIN , 0 );\n}\n }';
  Blockly.Arduino.definitions_['rmstep'] =   'void onRightMotorStep() \n{\nrmsteps++;\nif(rmsteps >= rstepslimit)\n{\nlstepslimit=99999;\nrstepslimit=99999;\nmutex=1;\nanalogWrite( LBPIN , 0 );\nanalogWrite( RFPIN , 0 );\nanalogWrite( RBPIN , 0 );\nanalogWrite( LFPIN , 0 );\n}\n}';
  Blockly.Arduino.definitions_['start_motors'] =   'void startmotors()\n{\nif(dir_l)\nanalogWrite( LBPIN , power_l );\nelse \nanalogWrite( LFPIN , power_l );\n if(dir_r)\nanalogWrite( RBPIN , power_r );\nelse\nanalogWrite( RFPIN , power_r );\n}';
  Blockly.Arduino.definitions_['stop_motors'] =   'void stopmotors()\n{\nanalogWrite( LBPIN , 0 );\nanalogWrite( RFPIN , 0 );\nanalogWrite( RBPIN , 0 );\nanalogWrite( LFPIN , 0 );\n}';
  Blockly.Arduino.definitions_['start_motors_on_secs'] =   'void startmotors_onsecs(int secs)\n{\nif(dir_l)\nanalogWrite( LBPIN , power_l );\nelse \nanalogWrite( LFPIN , power_l );\n if(dir_r)\nanalogWrite( RBPIN , power_r );\nelse\nanalogWrite( RFPIN , power_r );\ndelay(secs*1000);\nstopmotors();\n}';

  /*
  Blockly.Arduino.setups_['setup_output_' + sl_pin] = 'pinMode(LBPIN, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + dl_pin] = 'pinMode(RBPIN, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + dr_pin] = 'pinMode(LFPIN, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + sr_pin] = 'pinMode(RFPIN, OUTPUT);';*/
  Blockly.Arduino.setups_['setup_output_' + sl_pin] = 'pinMode(LBPIN, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + dl_pin] = 'pinMode(RBPIN, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + dr_pin] = 'pinMode(LFPIN, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + sr_pin] = 'pinMode(RFPIN, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_sensor1'] = 'pinMode(SENSOR1PIN, INPUT);';
  Blockly.Arduino.setups_['setup_output_sensor2'] = 'pinMode(SENSOR2PIN, INPUT);';
  Blockly.Arduino.setups_['setup_output_sensor3'] = 'pinMode(SENSOR3PIN, INPUT);';
  Blockly.Arduino.setups_['setup_output_sensor4'] = 'pinMode(SENSOR4PIN, INPUT);';
  Blockly.Arduino.setups_['setup_output_sensor5'] = 'pinMode(SENSOR5PIN, INPUT);';
  Blockly.Arduino.setups_['setup_output_interapt0'] = 'attachInterrupt(1, onLeftMotorStep,  CHANGE);';
  Blockly.Arduino.setups_['setup_output_interapt1'] = 'attachInterrupt(0, onRightMotorStep, CHANGE);';
  return '';
}

Blockly.Arduino.robot_motors_on_for_seconds = function() {
  Blockly.Arduino.robots_start();
  var sex = Blockly.Arduino.valueToCode(this, 'SECONDS', Blockly.Arduino.ORDER_ATOMIC);
  var code;
    code = 'startmotors_onsecs('+sex+');\n\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_motors_on = function() {
  Blockly.Arduino.robots_start();
  var code;
  if(dir_l)
    code = 'startmotors();\n\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_motors_off = function() {
  Blockly.Arduino.robots_start();
  var code;
    code = 'stopmotors();\n\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_set_direction_to = function() {
  Blockly.Arduino.robots_start();
  var dir = Blockly.Arduino.valueToCode(this, 'ROBOT_DIRECTION', Blockly.Arduino.ORDER_ATOMIC);
  var code;
  if (dir == 'direction_forward')
  {
    dir_r=1;
    dir_l=1;
    code = 'dir_r = 1;\ndir_l = 1;\n\n';
  }
  else if (dir == 'direction_backward')
  {
    dir_r=0;
    dir_l=0;
    code = 'dir_r = 0;\ndir_l = 0;\n\n';
  }
  else if (dir == 'direction_left')
  {
    dir_r=1;
    dir_l=0;
    code = 'dir_r = 1;\ndir_l = 0;\n\n';
  }
  else if (dir == 'direction_right')
  {
    dir_r=0;
    dir_l=1;
    code = 'dir_r = 0;\ndir_l = 1;\n\n';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_set_motors_power = function() {
  Blockly.Arduino.robots_start();
  var power= Blockly.Arduino.valueToCode(this, 'POWER', Blockly.Arduino.ORDER_ATOMIC);
  var code;
    power_r=Math.ceil(power*2.55);
    power_l=Math.ceil(power*2.55);
    code = 'power_r = ceil( ' + power + ' * 2.55 );\npower_l = ceil( ' + power + ' * 2.55 );\n\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_set_motors_power_left_right_separately = function() {
  Blockly.Arduino.robots_start();
  var power_left= Blockly.Arduino.valueToCode(this, 'POWER_LEFT', Blockly.Arduino.ORDER_ATOMIC);
  var power_right= Blockly.Arduino.valueToCode(this, 'POWER_RIGHT', Blockly.Arduino.ORDER_ATOMIC);
  var code;
    power_r=Math.ceil(power_left*2.55);
    power_l=Math.ceil(power_right*2.55);
    code = 'power_r = ceil( ' + power_left + ' * 2.55 );\npower_l = ceil( ' + power_right + ' * 2.55 );\n\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_set_motors_left_right_power_and_direction_separately = function() {
  Blockly.Arduino.robots_start();
  var ld= Blockly.Arduino.valueToCode(this, 'ROBOT_LEFT_MOTOR_DIRECTION', Blockly.Arduino.ORDER_ATOMIC);
  var rd= Blockly.Arduino.valueToCode(this, 'ROBOT_RIGHT_MOTOR_DIRECTION', Blockly.Arduino.ORDER_ATOMIC);
  var power_left= Blockly.Arduino.valueToCode(this, 'POWER_LEFT', Blockly.Arduino.ORDER_ATOMIC);
  var power_right= Blockly.Arduino.valueToCode(this, 'POWER_RIGHT', Blockly.Arduino.ORDER_ATOMIC);
  var code;
    power_r=Math.ceil(power_left*2.55);
    power_l=Math.ceil(power_right*2.55);
    if(rd="direction_forward")
    {
      dir_r=1;
      code = 'power_r = ceil( ' + power_left + ' * 2.55 );\npower_l = ceil( ' + power_right + ' * 2.55 );\ndir_r=1;\n';
    }
    else {
      dir_r=0;
      code = 'power_r = ceil( ' + power_left + ' * 2.55 );\npower_l = ceil( ' + power_right + ' * 2.55 );\ndir_r=0;\n';
    }
    if(ld="direction_forward")
    {
      dir_l=1;
      code += 'dir_l=1;\n\n';
    }
    else {
      dir_l=0;
      code += 'dir_l=0;\n\n';
    }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_get_sensor_data  = function() {
  Blockly.Arduino.robots_start();
  var sen= Blockly.Arduino.valueToCode(this, 'ROBOT_SENSORS', Blockly.Arduino.ORDER_ATOMIC);
  var code;
  if (sen=='sonic'){
      Blockly.Arduino.definitions_['define_servo'] = '#include <SONIC.h>\n';
      code= 'get_Sonic('+'sen'+')';//TODO
  }
  if(sen == 'sensor1')
      code = 'analogRead(SENSOR1PIN)';
  if(sen == 'sensor2')
      code = 'analogRead(SENSOR2PIN)';
  if(sen == 'sensor3')
      code = 'analogRead(SENSOR3PIN)';
  if(sen == 'sensor4')
      code = 'analogRead(SENSOR4PIN)';
  if(sen == 'sensor5')
      code = 'analogRead(SENSOR5PIN)';
  if(sen == 'sensor_trip_meter_left')
      code = 'lmsteps';
  if(sen == 'sensor_trip_meter_right')
      code = 'rmsteps';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_reset_trip_meters = function() {
  Blockly.Arduino.robots_start();
  var code;
      code = 'lmsteps = 0;\nrmsteps = 0;\n\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_motors_on_for_steps = function() {
  Blockly.Arduino.robots_start();
    var ste= Blockly.Arduino.valueToCode(this, 'STEPS', Blockly.Arduino.ORDER_ATOMIC);
  var code;
      code = 'lstepslimit = lmsteps + ' + ste + ';\nrstepslimit = rmsteps + ' + ste + ';\nmutex=0;\nstartmotors();\nwhile(!mutex){}\n\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_turnright = function() {
  Blockly.Arduino.robots_start();
  var deg= Blockly.Arduino.valueToCode(this, 'DEGREES', Blockly.Arduino.ORDER_ATOMIC);
  var code;
  dir_r=1;
  dir_l=0;
      code = 'dir_r = 1;\ndir_l = 0;\nlstepslimit = lmsteps + ceil( ' + deg + ' * 69 / 360);\nrstepslimit = rmsteps + ceil( ' + deg + ' * 69 / 360);\nmutex=0;\nstartmotors();\nwhile(!mutex){}\n\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_turnleft = function() {
  Blockly.Arduino.robots_start();
  var deg= Blockly.Arduino.valueToCode(this, 'DEGREES', Blockly.Arduino.ORDER_ATOMIC);
  var code;
  dir_r=0;
  dir_l=1;
      code = 'dir_r = 0;\ndir_l = 1;\nlstepslimit = lmsteps + ceil( ' + deg + ' * 69 / 360);\nrstepslimit = rmsteps + ceil( ' + deg + ' * 69 / 360);\nmutex=0;\nstartmotors();\nwhile(!mutex){}\n\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.robot_start_button_pressed = function() {
  Blockly.Arduino.robots_start();
  var code;
  code = 'digitalRead(A0)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];};

  Blockly.Arduino.robot_turn_led_on = function() {
    Blockly.Arduino.robots_start();
    var deg= Blockly.Arduino.valueToCode(this, 'ROBOT_POSITION', Blockly.Arduino.ORDER_ATOMIC);
    var code;
    if (deg== "position1")
    code = 'digitalWrite( 4,HIGH );\n';
    if (deg== "position2")
    code = 'digitalWrite( 7,HIGH );\n';
    if (deg== "position3")
    code = 'digitalWrite( 8,HIGH );\n';
    if (deg== "position4")
    code = 'digitalWrite( 11,HIGH );\n';
    if (deg== "position5")
    code = 'digitalWrite( 12,HIGH );\n';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.robot_turn_led_off = function() {
    Blockly.Arduino.robots_start();
    var deg= Blockly.Arduino.valueToCode(this, 'ROBOT_POSITION', Blockly.Arduino.ORDER_ATOMIC);
    var code;
    if (deg== "position1")
    code = 'digitalWrite( 4,LOW );\n';
    if (deg== "position2")
    code = 'digitalWrite( 7,LOW );\n';
    if (deg== "position3")
    code = 'digitalWrite( 8,LOW );\n';
    if (deg== "position4")
    code = 'digitalWrite( 11,LOW );\n';
    if (deg== "position5")
    code = 'digitalWrite( 12,LOW );\n';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

Blockly.Arduino.robot_get_rgb_sensor_data  = function() {
    Blockly.Arduino.robots_start();
    var sen= Blockly.Arduino.valueToCode(this, 'ROBOT_SENSORS_FOR_RGB', Blockly.Arduino.ORDER_ATOMIC);
    var color = Blockly.Arduino.valueToCode(this, 'RGB_VALUES', Blockly.Arduino.ORDER_ATOMIC);
    if(color=='red')
    color = 1;
    else if(color=='blue')
    color = 3;
    else if(color=='green')
    color = 2;
    sen= +sen.substring(7, 7);
    var code= 'getColor('+sen+')['+color+']';
}

 //   robot_claw_closed
/*
robot_turn_led_on
robot_turn_led_off
*/
/*
Blockly.Arduino.lab_led_turn_on
Blockly.Arduino.lab_led_turn_off
Blockly.Arduino.lab_color_led_turn_on = function() {//+
  var code;
  var dropdown_pin =Blockly.Arduino.valueToCode(this, 'LED_COLORS', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  code = 'digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');\n';
  return code;
};
Blockly.Arduino.lab_color_led_turn_off
Blockly.Arduino.lab_button_pressed
Blockly.Arduino.lab_play_note
Blockly.Arduino.lab_external_sensor
Blockly.Arduino.lab_sensor*/
/*
pinMode(directionPin, OUTPUT);
pinMode(speedPin, OUTPUT);
*//*
Blockly.Arduino.grove_ultrasonic_ranger = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_unit = this.getFieldValue('UNIT');
  Blockly.Arduino.definitions_['define_ultrasonic'] = '#include <Ultrasonic.h>\n';
  Blockly.Arduino.definitions_['var_ultrasonic'+dropdown_pin] = 'Ultrasonic ultrasonic_'+dropdown_pin+'('+dropdown_pin+');';
  var code;
  if(dropdown_unit==="cm"){
    code = 'ultrasonic_'+dropdown_pin+'.MeasureInCentimeters()';
  } else {
    code = 'ultrasonic_'+dropdown_pin+'.MeasureInInches()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};*/
/*
Blockly.Arduino.inout_digital_read = function() {//+
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.inout_analog_write = function() {//+
  var dropdown_pin = this.getFieldValue('PIN');
  //var dropdown_stat = this.getFieldValue('STAT');
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  //Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'analogWrite(' + dropdown_pin + ', ' + value_num + ');\n';
  return code;
};

Blockly.Arduino.inout_analog_read = function() {//+
  var dropdown_pin = this.getFieldValue('PIN');
  //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.inout_tone = function() {//+
  var dropdown_pin = this.getFieldValue("PIN");
  var value_num = Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = "tone(" + dropdown_pin + ", " + value_num + ");\n";
  return code;
};

Blockly.Arduino.inout_notone = function() {//+
  var dropdown_pin = this.getFieldValue("PIN");
  Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = "noTone(" + dropdown_pin + ");\n";
  return code;
};

Blockly.Arduino.inout_highlow = function() {//+
  // Boolean values HIGH and LOW.
  var code = (this.getFieldValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
*/
/*
//servo
#include <Servo.h>

Servo servo_11;

void setup() {
  servo_11.attach(11);
}

void loop() {
servo_11.write(0);

servo_11.write(150); //0~180
}
*/
/*Blockly.Arduino.servo_move = function() {//+
  var dropdown_pin = this.getFieldValue('PIN');
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';\n';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';

  var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');\n';
  return code;
};

Blockly.Arduino.servo_read_degrees = function() {//-
  var dropdown_pin = this.getFieldValue('PIN');

  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';

  var code = 'servo_' + dropdown_pin + '.read()';
  return code;
};

Blockly.Arduino.serial_print = function() {//-
  var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0'
  //content = content.replace('(','').replace(')','');

  Blockly.Arduino.setups_['setup_serial_' + profile.default.serial] = 'Serial.begin(' + profile.default.serial + ');\n';

  var code = 'Serial.println(' + content + ');\n';
  return code;
};
*/
