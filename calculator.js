class AdvancedCalculator {
    constructor() {
        this.display = document.getElementById('display');
        this.history = document.getElementById('history');
        this.historyList = document.getElementById('historyList');
        
        this.currentInput = '0';
        this.operator = null;
        this.previousInput = null;
        this.waitingForOperand = false;
        this.memory = 0;
        this.calculationHistory = [];
        this.lastResult = 0;
        
        this.initializeKeyboardSupport();
        this.updateDisplay();
    }

    initializeKeyboardSupport() {
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            
            // Numbers
            if (/[0-9]/.test(key)) {
                this.appendNumber(key);
            }
            // Operators
            else if (['+', '-', '*', '/'].includes(key)) {
                this.appendOperator(key === '*' ? '*' : key);
            }
            // Decimal point
            else if (key === '.') {
                this.appendNumber('.');
            }
            // Equals
            else if (key === 'Enter' || key === '=') {
                event.preventDefault();
                this.calculate();
            }
            // Clear
            else if (key === 'Escape' || key === 'c' || key === 'C') {
                this.clearAll();
            }
            // Backspace
            else if (key === 'Backspace') {
                this.backspace();
            }
            // Parentheses
            else if (key === '(') {
                this.appendOperator('(');
            }
            else if (key === ')') {
                this.appendOperator(')');
            }
        });
    }

    updateDisplay() {
        this.display.textContent = this.formatNumber(this.currentInput);
        this.updateMemoryIndicator();
    }

    formatNumber(num) {
        if (num === 'Error') return num;
        
        const number = parseFloat(num);
        if (isNaN(number)) return num;
        
        // Handle very large or very small numbers
        if (Math.abs(number) > 1e15 || (Math.abs(number) < 1e-6 && number !== 0)) {
            return number.toExponential(6);
        }
        
        // Format with appropriate decimal places
        return number.toString();
    }

    appendNumber(num) {
        if (this.waitingForOperand) {
            this.currentInput = num;
            this.waitingForOperand = false;
        } else {
            if (num === '.' && this.currentInput.includes('.')) return;
            this.currentInput = this.currentInput === '0' ? num : this.currentInput + num;
        }
        this.updateDisplay();
    }

    appendOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput === null) {
            this.previousInput = inputValue;
        } else if (this.operator) {
            const currentValue = this.previousInput || 0;
            const newValue = this.performCalculation();

            this.currentInput = String(newValue);
            this.previousInput = newValue;
        }

        this.waitingForOperand = true;
        this.operator = nextOperator;
        this.updateDisplay();
    }

    performCalculation() {
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);

        if (isNaN(prev) || isNaN(current)) return current;

        switch (this.operator) {
            case '+':
                return prev + current;
            case '-':
                return prev - current;
            case '*':
                return prev * current;
            case '/':
                return current !== 0 ? prev / current : 'Error';
            case '^':
                return Math.pow(prev, current);
            default:
                return current;
        }
    }

    calculate() {
        if (this.operator && this.previousInput !== null && !this.waitingForOperand) {
            const expression = `${this.previousInput} ${this.operator} ${this.currentInput}`;
            const result = this.performCalculation();
            
            this.addToHistory(expression, result);
            this.currentInput = String(result);
            this.lastResult = result;
            this.previousInput = null;
            this.operator = null;
            this.waitingForOperand = true;
            
            // Add animation
            this.display.classList.add('calculating');
            setTimeout(() => {
                this.display.classList.remove('calculating');
            }, 300);
        }
        this.updateDisplay();
    }

    scientificFunction(func) {
        const current = parseFloat(this.currentInput);
        let result;

        try {
            switch (func) {
                case 'sin':
                    result = Math.sin(this.toRadians(current));
                    break;
                case 'cos':
                    result = Math.cos(this.toRadians(current));
                    break;
                case 'tan':
                    result = Math.tan(this.toRadians(current));
                    break;
                case 'asin':
                    result = this.toDegrees(Math.asin(current));
                    break;
                case 'acos':
                    result = this.toDegrees(Math.acos(current));
                    break;
                case 'atan':
                    result = this.toDegrees(Math.atan(current));
                    break;
                case 'log':
                    result = Math.log10(current);
                    break;
                case 'ln':
                    result = Math.log(current);
                    break;
                case 'sqrt':
                    result = Math.sqrt(current);
                    break;
                case 'cbrt':
                    result = Math.cbrt(current);
                    break;
                case 'exp':
                    result = Math.exp(current);
                    break;
                case 'factorial':
                    result = this.factorial(current);
                    break;
                case 'reciprocal':
                    result = current !== 0 ? 1 / current : 'Error';
                    break;
                case 'percent':
                    result = current / 100;
                    break;
                default:
                    result = current;
            }

            if (isNaN(result) || !isFinite(result)) {
                result = 'Error';
            }

            const expression = `${func}(${current})`;
            this.addToHistory(expression, result);
            this.currentInput = String(result);
            this.lastResult = result;
            this.waitingForOperand = true;
            
        } catch (error) {
            this.currentInput = 'Error';
            this.showError();
        }

        this.updateDisplay();
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    factorial(n) {
        if (n < 0 || !Number.isInteger(n)) return NaN;
        if (n === 0 || n === 1) return 1;
        if (n > 170) return Infinity; // Prevent overflow
        
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    insertConstant(constant) {
        let value;
        switch (constant) {
            case 'pi':
                value = Math.PI;
                break;
            case 'e':
                value = Math.E;
                break;
            default:
                return;
        }
        
        this.currentInput = String(value);
        this.waitingForOperand = true;
        this.updateDisplay();
    }

    toggleSign() {
        if (this.currentInput !== '0') {
            this.currentInput = this.currentInput.startsWith('-') 
                ? this.currentInput.slice(1) 
                : '-' + this.currentInput;
        }
        this.updateDisplay();
    }

    clearAll() {
        this.currentInput = '0';
        this.previousInput = null;
        this.operator = null;
        this.waitingForOperand = false;
        this.history.textContent = '';
        this.updateDisplay();
    }

    clearEntry() {
        this.currentInput = '0';
        this.updateDisplay();
    }

    backspace() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }

    // Memory functions
    memoryStore() {
        this.memory = parseFloat(this.currentInput) || 0;
        this.updateMemoryIndicator();
    }

    memoryRecall() {
        this.currentInput = String(this.memory);
        this.waitingForOperand = true;
        this.updateDisplay();
    }

    memoryClear() {
        this.memory = 0;
        this.updateMemoryIndicator();
    }

    memoryAdd() {
        this.memory += parseFloat(this.currentInput) || 0;
        this.updateMemoryIndicator();
    }

    memorySubtract() {
        this.memory -= parseFloat(this.currentInput) || 0;
        this.updateMemoryIndicator();
    }

    updateMemoryIndicator() {
        const memoryButtons = document.querySelectorAll('.memory-btn');
        memoryButtons.forEach(btn => {
            if (this.memory !== 0) {
                btn.classList.add('memory-active');
            } else {
                btn.classList.remove('memory-active');
            }
        });
    }

    // History functions
    addToHistory(expression, result) {
        const historyItem = {
            expression: expression,
            result: result,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.calculationHistory.unshift(historyItem);
        
        // Keep only last 20 calculations
        if (this.calculationHistory.length > 20) {
            this.calculationHistory = this.calculationHistory.slice(0, 20);
        }
        
        this.updateHistoryDisplay();
        this.history.textContent = `${expression} = ${this.formatNumber(result)}`;
    }

    updateHistoryDisplay() {
        this.historyList.innerHTML = '';
        
        this.calculationHistory.forEach((item, index) => {
            const historyDiv = document.createElement('div');
            historyDiv.className = 'history-item';
            historyDiv.innerHTML = `
                <div>${item.expression} = ${this.formatNumber(item.result)}</div>
                <small style="opacity: 0.7;">${item.timestamp}</small>
            `;
            
            historyDiv.addEventListener('click', () => {
                this.currentInput = String(item.result);
                this.waitingForOperand = true;
                this.updateDisplay();
            });
            
            this.historyList.appendChild(historyDiv);
        });
    }

    clearHistory() {
        this.calculationHistory = [];
        this.historyList.innerHTML = '';
        this.history.textContent = '';
    }

    showError() {
        this.display.classList.add('error');
        setTimeout(() => {
            this.display.classList.remove('error');
        }, 500);
    }
}

// Global functions for HTML onclick events
let calculator;

document.addEventListener('DOMContentLoaded', function() {
    calculator = new AdvancedCalculator();
});

// Global function wrappers
function appendNumber(num) {
    calculator.appendNumber(num);
}

function appendOperator(op) {
    calculator.appendOperator(op);
}

function calculate() {
    calculator.calculate();
}

function scientificFunction(func) {
    calculator.scientificFunction(func);
}

function insertConstant(constant) {
    calculator.insertConstant(constant);
}

function toggleSign() {
    calculator.toggleSign();
}

function clearAll() {
    calculator.clearAll();
}

function clearEntry() {
    calculator.clearEntry();
}

function backspace() {
    calculator.backspace();
}

function memoryStore() {
    calculator.memoryStore();
}

function memoryRecall() {
    calculator.memoryRecall();
}

function memoryClear() {
    calculator.memoryClear();
}

function memoryAdd() {
    calculator.memoryAdd();
}

function memorySubtract() {
    calculator.memorySubtract();
}

function clearHistory() {
    calculator.clearHistory();
}