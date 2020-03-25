var path = require('path');
 
var webpackShimConfig = {
  // Remember: Only use shim config for incompatible libraries
  // the libraries below are just examples, regardless whether they are compatible or not
  shim: {
    'Blockly.Arduino': {
      exports: 'Blockly_Arduino' // Once loaded, use the global 'Blockly_Arduino' as the module value.
    }/*,
    'Blockly.Blocks': {
      exports: 'Blockly_Blocks' // Once loaded, use the global 'Blockly_Blocks' as the module value.
    },
	'goog': {
      exports: 'compiler_goog' // Once loaded, use the global 'compiler_goog' as the module value.
    },
	'Blockly': {
      exports: 'Blockly' // Once loaded, use the global 'Blockly' as the module value.
    }*/,
    
   },
  'masonry': {
      amd: false, // disable AMD module style
      commonjs: true // and use CommonJS module style instead
  }
};
 
module.exports = {
 // entry: ['./compressed/arduino_compressed.js','./compressed/blocks_compressed.js','./compressed/blockly_compressed.js'],
entry: ['./compressed/arduino_compressed.js'],
  output: {
    path: path.resolve('dist'),
    filename: 'blocks-compiler.js',
  },
  resolve: {
    alias: {
      'Blockly.Arduino': path.join(__dirname, './compressed/arduino_compressed.js'),
    //  'Blockly.Blocks': path.join(__dirname, './compressed/blocks_compressed.js'),
	//  'goog': path.join(__dirname, './compressed/blockly_compressed.js'), 	
    //  'Blockly': path.join(__dirname, './compressed/blockly_compressed.js'), 	
      
  },
},
  module: {
   rules: [
      {
        // apply the loader to setup module shimming
        test: /\.js/,
        loader: 'shim-loader',
        query: webpackShimConfig,
        // pass a list of directories or files to improve performance
        include:  path.join(__dirname, 'compressed'),
      }
    ]
  },
};
