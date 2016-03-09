'use strict';

const main = require('../dist/main');

describe('Uglicssy-angular', function () {
  const classesMock = {};
  const htmlConverter = main.converters.html;

  function minifyFn(className, classes) {
    return 'a';
  }

  it('should convert ng-class object', function () {
    const node = {
      attrs: [
        {name: 'ng-class', value: '{"my-class": isFocused()}'}
      ]
    };

    const convertedNode = htmlConverter(node, classesMock, minifyFn);

    expect(convertedNode.attrs[0].value).toBe('{"a": isFocused()}');
  });
});