'use strict';

const main = require('../src/main');

describe('Uglicssy-angular', function () {
  const classesMock = {};
  const htmlConverter = main.converters.html;
  const verbose = {
    printConverted: () => {}
  };

  function minifyFn() {
    return 'a';
  }

  it('should convert ng-class object', () => {
    const node = {
      attrs: [
        {name: 'ng-class', value: '{"my-class": isFocused()}'}
      ]
    };

    const convertedNode = htmlConverter(node, classesMock, minifyFn, verbose);

    expect(convertedNode.attrs[0].value).toBe('{"a": isFocused()}');
  });

  it('should convert ng-class array', () => {
    const node = {
      attrs: [
        {name: 'ng-class', value: '["col-sm-6", {"my-class": isFocused()}]'}
      ]
    };

    const convertedNode = htmlConverter(node, classesMock, minifyFn, verbose);

    expect(convertedNode.attrs[0].value).toBe('["a", {"a": isFocused()}]');
  });

  it('should convert ng-class literal', () => {
    const node = {
      attrs: [
        {name: 'ng-class', value: `'col-sm-6'`}
      ]
    };

    const convertedNode = htmlConverter(node, classesMock, minifyFn, verbose);

    expect(convertedNode.attrs[0].value).toBe('"a"');
  });
});