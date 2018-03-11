/**
 * Parser for ACS configuration format
 * http://online.ts2009.com/mediaWiki/index.php/ACS_Text_Format
 */
{
  function valueFormat(type, value) {
    return {
      type: type,
      value: value
    };
  }
}

start
  = acsTextFile

acsTextFile
  = bom? pairs:keyValuePair* eol {
  	return pairs.reduce(function(acc, item) {
      return Object.assign(acc, item);
    }, {});
  }

keyValuePair "key-value-pair"
  = lineStart key:key (whitespace / eol) value:value eol {
    var obj = {};
    obj[key] = value;
  	return obj;
  }
  
value "value"
  = containerValue / kuidValue / numericArrayValue / numericValue / stringValue / nullValue


/**
 * Value types
 */

// Watch out, space between key and new-line required!
containerValue "container-value"
  = eol? whitespace? '{' eol pairs:keyValuePair* lineStart '}' {
    return valueFormat(
      'container',
      pairs.reduce(function(acc, item) {
        return Object.assign(acc, item);
      }, {})
    );
  }

kuidValue "kuid-value"
  = kuid2 / kuid

// Negative IDs not supported yet
kuid2 "kuid2"
  = '<' ('kuid' / 'KUID') '2:' userID:[0-9]+ ':' contentID:[0-9]+ ':' version:[0-9]+ '>' {
    return valueFormat(
      'kuid2',
      {
    	  userID: userID.join(''),
        contentID: contentID.join(''),
        version: parseInt(version.join(''), 10)
      }
    );
  }

kuid "kuid"
  = '<' ('kuid' / 'KUID') ':' userID:[0-9]+ ':' contentID:[0-9]+ '>' {
    return valueFormat(
      'kuid',
      {
    	  userID: userID.join(''),
        contentID: contentID.join('')
      }
    );
  }

stringValue "string-value"
  = '"' stringValue:([^"\\]*) '"' whitespace? {
    return valueFormat(
      'string',
   	  stringValue.join('')
    )
  }

numericArrayValue "numeric-array-value"
  = numbers:(number arraySeparator)+ lastNumber:number whitespace? {
  	return valueFormat(
      'numeric-array',
      numbers.map(function(num){return num[0]}).concat(lastNumber)
    );
  }

arraySeparator "array-separator"
  = whitespace? "," whitespace?

numericValue "numeric-value"
  = number:number whitespace? {
  	return valueFormat(
      'number',
      number
    );
  }

/**
 * Base types
 */
number "number"
  = sign: [-]? integer:[0-9]+ decimal:'.'? fractions:[0-9]* {
  	return (sign ? -1 : 1) * parseFloat(integer.join('') + decimal + fractions.join(''));
  }
  
nullValue "null-value"
  = whitespace? { return null; }
  
key "key"
  = key:[a-z0-9\-_/]* {
    return key.join('');
  }

lineStart "line-start"
  = (whitespace / eol)*

eol "EOL"
  = ([\r][\n]) / [\r] / [\n]

eof "EOF"
  = !.

bom "BOM"
  = [\uFEFF]

whitespace "whitespace"
  = singlewhitespace+
  
singlewhitespace "singlewhitespace"
  = [ \t]
