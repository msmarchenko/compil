/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
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
 * @fileoverview Variable blocks for Arduino.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.variables');

goog.require('Blockly.Arduino');


Blockly.Arduino.data_variable = function() {
  // Variable getter.
  var code ;
  var mas = Blockly.Arduino.variableDB_.allVars;
  var id= this.getFieldValue('VARIABLE');
  mas.forEach(function(item, i, mas) {
  if(item.id_ == id)
  code = item.name;
});
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.variables_declare = function() {
  // Variable setter.
  var dropdown_type = this.getFieldValue('TYPE');
  //TODO: settype to variable
  var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      ScratchBlocks.Variables.NAME_TYPE);
      console.warn("NAME");
      console.warn(varName);
      console.warn("TAK");
  Blockly.Arduino.setups_['setup_var' + varName] = varName + ' = ' + argument0 + ';\n';
  return '';
};

Blockly.Arduino.data_setvariableto = function() {
  var argument0 =(Blockly.Arduino.valueToCode(this, 'VALUE',  Blockly.Arduino.ORDER_ASSIGNMENT) || '0').replace('\"','').replace('\"','');
  var varName ;
  var mas = Blockly.Arduino.variableDB_.allVars;
  var id= this.getFieldValue('VARIABLE');
  mas.forEach(function(item, i, mas) {
  if(item.id_ == id)
  varName = item.name;
});
  return varName + ' = ' + argument0;
};

Blockly.Arduino.data_changevariableby = function() {
  var argument0 =Blockly.Arduino.valueToCode(this, 'VALUE',  Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName ;
  var mas = Blockly.Arduino.variableDB_.allVars;
  var id= this.getFieldValue('VARIABLE');
  mas.forEach(function(item, i, mas) {
  if(item.id_ == id)
  varName = item.name;
});
  return varName + ' = ' + varName + " + "+ argument0/*.substring(1, argument0.length - 1)*/ + ';\n';
};
