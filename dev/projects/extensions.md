# Extensions

## `extension.json`

```json
{
  "id": "my-extension",
  "name": "My Extension",
  "version": "1.0.0",
  "description": "My Extension Description",
  "author": "Me",
  "requires": {
    "version": "^1.0.0",
    "modules": {
      "module1": "^1.0.0",
      "module2": "^1.0.0"
    },
    "extensions": [
      "other-extension"
    ]
  },
  "permissions": [
    "db@core/NOTEBOOK:{LIST,DELETE}"
  ]
}
```