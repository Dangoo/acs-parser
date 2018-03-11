const VALUEINDENT = 40;
const TABLENGTH = 4;

module.exports = generate;

const kuidToValue = (kuidObj) => {
    const kuid = ['kuid', kuidObj.userID, kuidObj.contentID];
    
    if (kuidObj.version) {
        kuid[0] = 'kuid2';
        kuid.push(kuidObj.version);
    }
    
    return `<${kuid.join(':')}>`;
};

const numericArrayToValue = (numericArray) => numericArray.join(',');

const numberToValue = (value) => `${value}`;
const stringToValue = (value) => `"${value}"`;

const nullToValue = () => '';

function containerToValue (containerObj, level) {
    const newLevel = level + 1;
    const mapWithLevel = entry => keyValueToEntry(entry, newLevel);
    const bracketsIndent = generateIndent(level, true);

    return `${bracketsIndent}{\n${Object.entries(containerObj).map(mapWithLevel).join('\n')}\n${bracketsIndent}}`;
};

function toValue(data) {
    switch(data.type) {
        case 'null':
            return nullToValue(data.value);
        case 'number':
            return numberToValue(data.value);
        case 'string':
            return stringToValue(data.value);
        case 'numeric-array':
            return numericArrayToValue(data.value);
        case 'kuid':
        case 'kuid2':
            return kuidToValue(data.value);
        case 'container':
            return containerToValue(data.value, data.level);
        default:
            return data.value.toString();
    }
};

function calcIndentAmount(offsetLength, level) {
    return VALUEINDENT - offsetLength - level * TABLENGTH;
}

function generateIndent(amount, unitTab = false) {
    const spacesCount = unitTab ? amount * TABLENGTH : amount;

    return new Array(spacesCount).fill(' ').join('');
}

function keyValueToEntry(keyValuePair, nestingLevel = 0) {
    const key = keyValuePair[0];
    const valueData = Object.assign(keyValuePair[1], {level: nestingLevel});
    const type = valueData.type;
    const stringValue = toValue(valueData);

    const keyIndent = generateIndent(nestingLevel, true);
    const valueIndentLength = calcIndentAmount(key.length, nestingLevel);
    const valueIndent = generateIndent(valueIndentLength);

    return `${keyIndent}${key}${type === 'container' ? '\n' : valueIndent}${stringValue}`;
}

function generate(data) {
    return Object.entries(data)
        .map(entry => keyValueToEntry(entry))
        .join('\n')
        .concat('\n');
}
