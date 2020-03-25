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
 * @fileoverview Generating Arduino for logic blocks.
 * @author gasolin@gmail.com  (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.logic');

goog.require('Blockly.Arduino');

Blockly.Arduino.math_whole_number = function() {//+
  // Boolean values HIGH and LOW.
  var code = this.getFieldValue('NUM') ;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.math_positive_number = function() {//+
  // Boolean values HIGH and LOW.
  var code = this.getFieldValue('NUM') ;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.control_if = function() {
  // If/elseif/else condition.
  var argument = Blockly.Arduino.valueToCode(this, 'CONDITION',
  Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  var code = 'if (' + argument + ') {\n' + branch + '\n}';
  return code + '\n';
};

Blockly.Arduino.control_if_else = function() {
  // If/elseif/else condition.
  var argument = Blockly.Arduino.valueToCode(this, 'CONDITION',
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  var code = 'if (' + argument + ') {\n' + branch + '\n}';
  //if (this.elseCount_) {
    branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK2');
    code += ' else {\n' + branch + '\n}';
//  }
  return code + '\n';
};

Blockly.Arduino.control_repeat = function() {
  // If/elseif/else condition.
  var argument = Blockly.Arduino.valueToCode(this, 'TIMES',
      Blockly.Arduino.ORDER_ATOMIC);
  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  var code = 'repeat( ' + argument + ') {\n' + branch + '\n}';
//  }
  return code + '\n';
};

Blockly.Arduino.control_forever = function() {
  // If/elseif/else condition.
  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  var code = 'while( true ) {\n' + branch + '\n}';
//  }
  return code + '\n';
};
/*
Blockly.Arduino.control_while = function() {
  // If/elseif/else condition.
  var argument = Blockly.Arduino.valueToCode(this, 'CONDITION',
  Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  var code = 'while (' + argument + ') {\n' + branch + '\n}';
  return code + '\n';
};*/
Blockly.Arduino.control_wait = function() {
  // If/elseif/else condition.
  var branch = Blockly.Arduino.valueToCode(this, 'DURATION',
  Blockly.Arduino.ORDER_ATOMIC);
  var code = 'delay(' + branch*1000 + ');\n';
  return code + '\n';
};

Blockly.Arduino.control_wait_until = function() {
  // If/elseif/else condition.
  var argument = Blockly.Arduino.valueToCode(this, 'CONDITION',
  Blockly.Arduino.ORDER_NONE)|| 'false' ;
  var code = 'while (!(' + argument + ')) {}';
  return code + '\n';
};

Blockly.Arduino.control_repeat_until = function() {
  // If/elseif/else condition.
  var argument = Blockly.Arduino.valueToCode(this, 'CONDITION',
  Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  var code = 'while (' + argument + ') {\n' + branch + '\n}';
  return code + '\n';
};

Blockly.Arduino.control_stop = function() {
  var code = 'stopmotors();\nwhile ( true ) {}';
  return code + '\n';
};









Blockly.Arduino.logic_compare = function() {
  // Comparison operator.
  var mode = this.getFieldValue('OP');
  var operator = Blockly.Arduino.logic_compare.OPERATORS[mode];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
  var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};


Blockly.Arduino.logic_compare.OPERATORS = {
  EQ: '==',
  NEQ: '!=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>='
};

Blockly.Arduino.logic_operation = function() {
  // Operations 'and', 'or'.
  var operator = (this.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.Arduino.ORDER_LOGICAL_AND :
      Blockly.Arduino.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || 'false';
  var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || 'false';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Arduino.logic_negate = function() {
  // Negation.
  var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
  var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL', order) || 'false';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.Arduino.logic_boolean = function() {
  // Boolean values true and false.
  var code = (this.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.logic_null = function() {
  var code = 'NULL';
  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};
