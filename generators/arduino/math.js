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
 * @fileoverview Generating Arduino for math blocks.
 * @author gasolin@gmail.com  (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.math');

goog.require('Blockly.Arduino');


Blockly.Arduino.math_number = function() {
  // Numeric value.
  var code = window.parseFloat(this.getFieldValue('NUM'));
  // -4.abs() returns -4 in Dart due to strange order of operation choices.
  // -4 is actually an operator and a number.  Reflect this in the order.
  var order = code < 0 ?
      Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
  return [code, order];
};

Blockly.Arduino.math_arithmetic = function() {
  // Basic arithmetic operators, and power.
  var mode = this.getFieldValue('OP');
  var tuple = Blockly.Arduino.math_arithmetic.OPERATORS[mode];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '0';
  var code;
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};


Blockly.Arduino.operator_equals = function() {
  var argument0 = Blockly.Arduino.valueToCode(this, 'OPERAND1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'OPERAND2', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code;
  code = argument0.substring(1, argument0.length - 1) + " = " + argument1.substring(1, argument1.length - 1);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.operator_add = function() {
  var argument0 = Blockly.Arduino.valueToCode(this, 'NUM1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'NUM2', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code;
  code = Number(argument0) + " + " + Number(argument1);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.operator_subtract = function() {
  var argument0 = Blockly.Arduino.valueToCode(this, 'NUM1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'NUM2', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code;
  code = Number(argument0) + " - " + Number(argument1);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.operator_multiply = function() {
  var argument0 = Blockly.Arduino.valueToCode(this, 'NUM1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'NUM2', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code;
  code = Number(argument0) + " * " + argument1;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.operator_divide = function() {
  var argument0 = Blockly.Arduino.valueToCode(this, 'NUM1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'NUM2', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code;
  code = argument0 + " / " + argument1;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.operator_gt = function() {
  var argument0 = Blockly.Arduino.valueToCode(this, 'OPERAND1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'OPERAND2', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code;/*
  console.warn("CHTO&");
  console.warn(argument0);
  console.warn(typeof(argument0));
  console.warn(+argument0);
  console.warn(Number.parseInt(argument0));
  console.warn(Number(argument0));
  console.warn(argument0);*/
  code = argument0.substring(1, argument0.length - 1) + " > " + argument1.substring(1, argument1.length - 1);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.operator_lt = function() {
  var argument0 = Blockly.Arduino.valueToCode(this, 'OPERAND1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'OPERAND2', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code;
  code = argument0.substring(1, argument0.length - 1) + " < " + argument1.substring(1, argument1.length - 1);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.operator_and = function() {
  var argument0 = Blockly.Arduino.valueToCode(this, 'OPERAND1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'OPERAND2', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code;
  code = "("+argument0 + " && " + argument1 + ")";

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.operator_or = function() {
  var argument0 = Blockly.Arduino.valueToCode(this, 'OPERAND1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'OPERAND2', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code;
  code = "("+argument0 + " || " + argument1 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.operator_not = function() {
  var argument0 = Blockly.Arduino.valueToCode(this, 'OPERAND', Blockly.Arduino.ORDER_ATOMIC) || '0';
//  var argument1 = Blockly.Arduino.valueToCode(this, 'OPERAND2', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code;
  code = "!( " + argument0 + " )";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
operator_and
operator_or
operator_not
*/
Blockly.Arduino.math_arithmetic.OPERATORS = {
  ADD: [' + ', Blockly.Arduino.ORDER_ADDITIVE],
  MINUS: [' - ', Blockly.Arduino.ORDER_ADDITIVE],
  MULTIPLY: [' * ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
  DIVIDE: [' / ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
  POWER: [null, Blockly.Arduino.ORDER_NONE]  // Handle power separately.
};
