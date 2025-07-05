# Regex Sandbox

A real-time regex testing tool that allows you to experiment with regular expressions and see live highlighting of matches in sample text.

![regex-sandbox](https://github.com/user-attachments/assets/2dab5b3e-6f7b-45f4-833d-028849a3a659)

## Features

- **Real-time pattern matching** - See matches highlighted instantly as you type
- **Common pattern library** - Dropdown with pre-built regex patterns for common use cases
- **Regex flags support** - Test with global, case-insensitive, multiline, and other flags
- **Match count display** - Shows the number of matches found
- **Error handling** - Clear error messages for invalid regex patterns
- **Interactive tooltips** - Helpful explanations for regex patterns and flags
- **Responsive design** - Works on desktop and mobile devices

## How to Use

1. **Enter a regex pattern** in the "Regex Pattern" field
   - Use the question mark tooltip for help with regex syntax
   - Or select from common patterns in the dropdown

2. **Add flags** (optional) in the "Flags" field
   - `g` for global (find all matches)
   - `i` for case-insensitive matching
   - `m` for multiline mode
   - `s` for dotall mode

3. **Edit the sample text** or use the provided examples

4. **View results** in real-time with highlighted matches

## Common Patterns Included

- **Words** - Match individual words
- **Numbers** - Match sequences of digits
- **Email addresses** - Validate email format
- **Phone numbers** - Match XXX-XXX-XXXX format
- **URLs** - Match http/https links
- **Word pairs** - Capture two consecutive words
- **Capitalized words** - Match words starting with capital letters
- **Acronyms** - Match all-caps abbreviations
- **Currency** - Match dollar amounts
- **Dates** - Match MM/DD/YYYY format
- **Hex colors** - Match #ffffff format
- **Empty lines** - Match blank lines

## Technical Details

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **No dependencies** - Runs entirely in the browser
- **Real-time processing** - Uses JavaScript's built-in RegExp engine
- **Responsive layout** - CSS Flexbox for adaptive design

## Files

- `index.html` - Main application interface
- `script.js` - Core regex testing functionality
- `style.css` - Application styling and layout

## Browser Support

Works in all modern browsers that support:
- ES6 JavaScript features
- CSS Flexbox
- HTML5 form elements

## License

MIT License - Feel free to use and modify for your own projects.

## Contributing

This is part of a larger arcade collection. Suggestions and improvements are welcome!
