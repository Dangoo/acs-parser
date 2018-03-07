const acsParser = require('../index');

it('Parses null-values correctly', () => {
    const nullValues = [
        'key1 ',
        'key2 '
    ].concat('\n').join('\n');

    const parsed = acsParser.parse(nullValues);

    expect(parsed).toMatchSnapshot();
});

it('Parses string-values correctly', () => {
    const stringValues = [
        'key1 "value"',
        'key2 "bar"'
    ].concat('\n').join('\n');

    const parsed = acsParser.parse(stringValues);

    expect(parsed).toMatchSnapshot();
});

it('Parses numeric-values correctly', () => {
    const numericValues = [
        'key1 1',
        'key2 2',
        'key3 2.5',
        'key4 20',
        'key5 12345.123456'
    ].concat('\n').join('\n');

    const parsed = acsParser.parse(numericValues);

    expect(parsed).toMatchSnapshot();
});

it('Parses numeric-array-values correctly', () => {
    const numericArrayValues = [
        'key1 1,2',
        'key2 2, 4',
        'key3 10, 20, 30, 40'
    ].concat('\n').join('\n');

    const parsed = acsParser.parse(numericArrayValues);

    expect(parsed).toMatchSnapshot();
});

it('Parses kuid-values correctly', () => {
    const numericArrayValues = [
        'kuid <kuid:123456:123456>',
        'kuid-uppercase <KUID:123456:123456>',
        'kuid2 <kuid2:123456:123456:1>',
        'kuid2-uppercase <KUID2:123456:123456:1>',
    ].concat('\n').join('\n');

    const parsed = acsParser.parse(numericArrayValues);

    expect(parsed).toMatchSnapshot();
});

it('Parses container-values correctly', () => {
    const containerValues = [
        'container-value ',
        '{',
        '  nested-container-value ',
        '  {',
        '    nested-string "Nested"',
        '  }',
        '}'
    ].concat('\n').join('\n');

    const parsed = acsParser.parse(containerValues);

    expect(parsed).toMatchSnapshot();
});

it('Parses key-value-pairs correctly', () => {
    const numericArrayValues = [
        'kuid <kuid:123456:123456>',
        'string "Test"',
        'number 2',
        'container-value ',
        '{',
        '  nested-string "Nested"',
        '}'
    ].concat('\n').join('\n');

    const parsed = acsParser.parse(numericArrayValues);

    expect(parsed).toMatchSnapshot();
});