# Advanced Calculator

A modern, feature-rich calculator application built with HTML, CSS, and JavaScript. This calculator provides both basic arithmetic operations and advanced scientific functions with a beautiful, responsive user interface.

![Calculator Preview](https://via.placeholder.com/600x400/667eea/ffffff?text=Advanced+Calculator)

## 🚀 Features

### Basic Operations
- ✅ Addition, Subtraction, Multiplication, Division
- ✅ Decimal point support
- ✅ Parentheses for complex expressions
- ✅ Sign toggle (positive/negative)
- ✅ Percentage calculations

### Scientific Functions
- 🔬 **Trigonometric Functions**: sin, cos, tan, asin, acos, atan
- 📊 **Logarithmic Functions**: log (base 10), ln (natural log)
- 🔢 **Power Functions**: x², x^y, e^x, √x, ∛x
- 🧮 **Special Functions**: factorial (x!), reciprocal (1/x)
- 📐 **Mathematical Constants**: π (pi), e (Euler's number)

### Memory Operations
- 💾 **MS** - Memory Store
- 📥 **MR** - Memory Recall
- 🗑️ **MC** - Memory Clear
- ➕ **M+** - Memory Add
- ➖ **M-** - Memory Subtract
- 🔆 Visual indicator when memory contains a value

### Advanced Features
- 📚 **Calculation History**: Stores last 20 calculations with timestamps
- ⌨️ **Keyboard Support**: Full keyboard navigation and input
- 🎨 **Modern UI**: Glassmorphism design with smooth animations
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ⚡ **Error Handling**: Graceful error handling with visual feedback
- 🔄 **Real-time Updates**: Instant calculation results

## 🎮 Usage

### Mouse/Touch Controls
1. Click any number button to input numbers
2. Click operator buttons (+, -, ×, /) for basic operations
3. Click scientific function buttons for advanced calculations
4. Use memory buttons (MS, MR, MC, M+, M-) for memory operations
5. Click history items to reuse previous results

### Keyboard Shortcuts
| Key | Function |
|-----|----------|
| `0-9` | Number input |
| `+`, `-`, `*`, `/` | Basic operators |
| `.` | Decimal point |
| `Enter` or `=` | Calculate result |
| `Escape` or `C` | Clear all |
| `Backspace` | Delete last digit |
| `(`, `)` | Parentheses |

### Scientific Functions Usage
1. **Trigonometric**: Input angle in degrees, then click sin/cos/tan
2. **Inverse Trig**: Input value, click asin/acos/atan for result in degrees
3. **Logarithms**: Input number, click log (base 10) or ln (natural)
4. **Powers**: Input base number, click x² for square or x^y for custom power
5. **Roots**: Input number, click √ for square root or ∛ for cube root
6. **Factorial**: Input integer, click x! for factorial
7. **Constants**: Click π or e to insert mathematical constants

## 📁 File Structure

```
calculator/
├── calculator.html    # Main HTML structure
├── calculator.css     # Styling and animations
├── calculator.js      # Calculator logic and functionality
└── README.md         # Documentation (this file)
```

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with flexbox/grid, animations, and responsive design
- **JavaScript ES6+**: Object-oriented programming with classes

### Key Features Implementation
- **Calculator Engine**: Object-oriented design with proper state management
- **Memory System**: Persistent memory storage with visual indicators
- **History Tracking**: Array-based history with timestamp tracking
- **Error Handling**: Try-catch blocks with user-friendly error display
- **Responsive Design**: CSS Grid and Flexbox for adaptive layouts
- **Animations**: CSS transitions and keyframe animations for smooth UX

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🚀 Getting Started

### Option 1: Direct File Opening
1. Download all files to a folder
2. Open `calculator.html` in your web browser
3. Start calculating!

### Option 2: Local Server (Recommended)
1. Clone or download the repository
2. Navigate to the project directory
3. Start a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   ```
4. Open `http://localhost:8000/calculator.html` in your browser

## 🎨 Customization

### Themes
The calculator uses CSS custom properties for easy theming. You can modify colors in `calculator.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --button-number: rgba(255, 255, 255, 0.9);
  --button-operator: linear-gradient(135deg, #ff6b6b, #ee5a52);
  --button-function: linear-gradient(135deg, #4ecdc4, #44a08d);
}
```

### Adding New Functions
To add new scientific functions, modify the `scientificFunction` method in `calculator.js`:

```javascript
case 'newFunction':
    result = Math.newFunction(current);
    break;
```

## 🐛 Error Handling

The calculator includes comprehensive error handling for:
- Division by zero
- Invalid mathematical operations
- Out-of-range calculations
- Invalid inputs
- Memory overflow

Errors are displayed with visual feedback including:
- Red error text
- Shake animation
- Automatic error clearing

## 📱 Mobile Responsiveness

The calculator is fully responsive with:
- **Desktop**: Full 5-column layout with all features
- **Tablet**: 4-column layout with optimized button sizes
- **Mobile**: 3-column layout with touch-friendly buttons

## 🔧 Performance Optimizations

- Efficient DOM manipulation
- Event delegation for better performance
- Optimized CSS animations
- Minimal memory footprint
- Fast calculation algorithms

## 📈 Future Enhancements

Potential features for future versions:
- [ ] Graph plotting capabilities
- [ ] Unit conversions
- [ ] Equation solver
- [ ] Export calculation history
- [ ] Custom function definitions
- [ ] Dark/Light theme toggle
- [ ] Voice input support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ by AI Assistant

---

**Enjoy calculating with style! 🧮✨**