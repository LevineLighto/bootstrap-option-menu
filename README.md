# Bootstrap Option List
Create interactable lists to select options.  
Press the plus (+) button in the options on the left to select it, and press the minus (-) button
in the options on the right to deselect it.
![Sample List from Kazhier.com](https://github.com/LevineLighto/bootstrap-option-menu/blob/0808ca9e8c2c5589e53fdfaa6ed84c6240f45991/demo/screenshot/Kz-sample.png)

## Usage
* Make sure to include Bootstrap's CSS and Font Awesome to make sure it works properly
``` HTML
...
<head>
    ...
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    ...
</head>
<body>
    ...
    <!-- Font Awesome Kit -->
    <script src="https://kit.fontawesome.com/Your-Kit-Name.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@levinelito/bootstrap-option-menu"></script>
    ...
</body>
...
```

### Using input to contain the data
``` javascript
const OptionMenu = new OptionMenu.List({
    target: 'input',
    data: {added: ['Option A', 'Option B', 'Option C'], available: ['Option D', 'Option E', 'Option F', 'Option G']},
});
```