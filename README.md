# acs-parser
Parser for [ACS configuration files](http://online.ts2009.com/mediaWiki/index.php/ACS_Text_Format)

## Structure
ACS files contain a recusive key-value structure with the following value types
- `null-value`
- `numeric-value`
- `numeric-array-value`
- `string-value`
- `KUID-value`
- `container-value`

## Exampe ACS file
```
kuid                                        <kuid:123456:123456>
username                                    "Name of item"
category-region                             "DE"

mesh-table
{
    mesh                                    "main.fbx"
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