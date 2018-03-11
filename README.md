# ACS Tools 🛠
Parser and generator for [ACS configuration files](http://online.ts2009.com/mediaWiki/index.php/ACS_Text_Format)

* [Parser](#parser)
* [Generator](#generator)
* [ACS general](#acs-general)

## Parser

### Usage (node.js)

```javascript
const fs = require('fs');
const acsParser = require('acs-acsTools').parser;

const configText = fs.readFileSync('./config.txt', 'utf8');
const configData = acsParser.parse(configText);

// Content of configData should look like that:
/*
{
    "kuid": {
        "type": "kuid",
        "value": {
            "contentID": "123456",
            "userID": "123456"
        }
    },
    "username": {
        "type": "string",
        "value": "Name of item"
    },
    "category-region": {
        "type": "string",
        "value": "DE"
    },
    "mesh-table": {
        "type": "container",
        "value": {
            "mesh": {
                "type": "string",
                "value": "main.im"
            },
            "autocreate": {
                "type": "number",
                "value": "main.im"
            },
        },
    },
    ...
}
*/
```

### Output

The ACS parser returns an object with the following structure:
| type          | value |
|---------------|-------|
| null          | `null` |
| number        | `number` |
| numeric-array | `number[]` |
| string        | `string` |
| kuid          | `{userID: string, contentID: string}` |
| kuid2         | `{userID: string, contentID: string, version: number}` |
| container     | `{}` |

## Generator

### Usage
```javascript
const fs = require('fs');
const acsTools = require('acs-tools');

const configData = {
    // Format also returned from parser
};

const configText = acsTools.generate(configData);

fs.writeFileSync('config.txt', configText);
```

## ACS general

### Structure

ACS files contain a recusive key-value structure with the following value types
- `null-value`
- `numeric-value`
- `numeric-array-value`
- `string-value`
- `KUID-value`
- `container-value`

### Example ACS file

```
kuid                                        <kuid:123456:123456>
username                                    "Name of item"
category-region                             "DE"

mesh-table
{
    mesh                                    "main.im"
    autocreate                              1
}

thumbnails
{
    default
    {
        width                               240
        height                              180
        image                               "thumbnail.jpg"
    }
}

```