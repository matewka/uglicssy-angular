'use strict';

const parser = require('recast');

export default function angularHtmlConverter(node, classes, minifyFn) {
  function convertNode(node, stringValue) {
    if (node.type === 'Literal') {
      node.value = minifyFn(node.value, classes);
    } else if (node.type === 'ObjectExpression') {
      node.properties = node.properties.map((property) => {
        if (property.key.type === 'Literal') {
          property.key.value = minifyFn(property.key.value, classes);
        }

        return property;
      });
    } else if (node.type === 'ArrayExpression') {
      node.elements = node.elements.map((element) => {
        element.value = minifyFn(element.value, classes);
        return element;
      });
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
        attr.value = convertedString.substr(1, convertedString.length - 2);
      }

      return attr;
    });
  }

  return node;
}