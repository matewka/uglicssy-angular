'use strict';

const parser = require('recast');

function angularHtmlConverter(node, classes, minifyFn, verbose) {
  function convertNode(node, stringValue) {
    if (node.type === 'Literal') {
      node.value = minifyFn(node.value, classes);
    } else if (node.type === 'ObjectExpression') {
      node.properties = node.properties.map((property) => convertNode(property, stringValue));
    } else if (node.type === 'ArrayExpression') {
      node.elements = node.elements.map((element) => convertNode(element, stringValue));
    } else if (node.type === 'Property') {
      node.key = convertNode(node.key, stringValue);
    } else {
      console.info('Uglicssy-angular: unrecognized ng-class expression: ' + stringValue);
    }

    return node;
  }

  if (node.attrs && node.attrs.length) {
    node.attrs = node.attrs.map((attr) => {
      if (attr.name === 'ng-class' || attr.name === 'data-ng-class') {
        const parsed = parser.parse('(' + attr.value + ')');
        parsed.program.body.expression = convertNode(parsed.program.body[0].expression, attr.value);
        const convertedString = parser.print(parsed).code;
        const value = convertedString.substr(1, convertedString.length - 2);

        verbose.printConverted(attr.value, value, angularHtmlConverter);

        attr.value = value;
      }

      return attr;
    });
  }

  return node;
}

module.exports = angularHtmlConverter;