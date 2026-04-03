# AI DSA Debugger Frontend

A modern, responsive React frontend for the AI DSA Debugger application built with Vite and TailwindCSS.

## 🚀 Features

- **Modern Dark Theme UI** - Sleek, professional dark interface
- **Multi-Language Support** - Python, C++, Java, JavaScript
- **Real-time API Integration** - Connected to AI backend for code analysis
- **Enhanced UX** - Loading spinners, error handling, copy functionality
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Copy to Clipboard** - One-click copying of AI analysis results

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **TailwindCSS 4** - Utility-first CSS framework
- **Native Fetch API** - For API communications
- **Heroicons** - Beautiful SVG icons via inline SVG

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Usage

1. **Select Language**: Choose from Python, C++, Java, or JavaScript
2. **Enter Code**: Paste your failing solution in the code textarea
3. **Describe Error**: Add error message or failing test case details
4. **Debug**: Click "Debug My Code" to get AI analysis
5. **Copy Results**: Use the copy button to save the AI response

## 🔧 API Configuration

The frontend connects to:

```
POST https://dsa-debugger-ai-backend.onrender.com/debug
```

Request format:

```json
{
  "code": "your code here",
  "error": "error message or failing test",
  "language": "python"
}
```

Response format:

```json
{
  "result": "AI analysis and debugging suggestions"
}
```

## 🎨 UI Components

### Input Section

- **Language Dropdown**: Select programming language
- **Code Editor**: Large textarea with syntax highlighting colors
- **Error Input**: Textarea for error descriptions or test cases
- **Submit Button**: Gradient button with loading states

### Results Section

- **Analysis Card**: Styled container for AI response
- **Copy Button**: Quick copy functionality with visual feedback
- **Empty State**: Helpful placeholder when no results

## 🔄 State Management

The app uses React hooks for state management:

- `code` - User's code input
- `error` - Error message or test case
- `language` - Selected programming language
- `result` - AI analysis response
- `loading` - Loading state for API calls
- `apiError` - Error handling for API failures
- `copied` - Copy button feedback state

## 🎯 Error Handling

- **Input Validation**: Ensures both code and error are provided
- **Network Errors**: Handles connection issues gracefully
- **API Errors**: Shows specific error messages
- **User Feedback**: Visual indicators for all states

## 📱 Responsive Design

The UI adapts to different screen sizes:

- **Desktop**: Two-column layout with inputs on left, results on right
- **Mobile**: Single-column stacked layout
- **Tablet**: Responsive grid that adjusts based on screen width

## 🎨 Styling Features

- **Gradient Headers**: Eye-catching title with color gradients
- **Card-based Layout**: Modern card design with subtle borders
- **Hover Effects**: Interactive elements with smooth transitions
- **Loading Animations**: Smooth spinning loader
- **Color Coding**: Different colors for different input types

## 🧪 Development

```bash
# Start development with hot reload
npm run dev

# Run linting
npm run lint

# Type checking (if using TypeScript)
npm run type-check
```

## 📝 File Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # Application entry point
├── index.css        # TailwindCSS imports
└── assets/          # Static assets
```

## 🔮 Future Enhancements

- Syntax highlighting for code blocks
- Code formatting capabilities
- File upload for code input
- History of previous analyses
- Export results to various formats
- Dark/light theme toggle
- Keyboard shortcuts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the AI DSA Debugger application.
