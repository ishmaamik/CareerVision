# CareerVision Theme System 🎨

A comprehensive light/dark mode theme system for the CareerVision React application with beautiful visual design.

## 🌟 Features

- **Automatic Theme Detection**: Respects user's system preference
- **Persistent Theme Choice**: Saves preference to localStorage
- **Smooth Transitions**: All elements transition smoothly between themes
- **CSS Custom Properties**: Efficient theme switching with CSS variables
- **Component Library**: Pre-built themed components
- **Material-UI Integration**: Seamless integration with Material-UI components

## 🚀 Quick Start

### 1. Wrap Your App with ThemeProvider

```jsx
import AppThemeProvider from "./components/providers/AppThemeProvider";

function App() {
  return <AppThemeProvider>{/* Your app content */}</AppThemeProvider>;
}
```

### 2. Use the Theme Hook

```jsx
import { useTheme } from "./hooks/useTheme";

const MyComponent = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <div style={{ backgroundColor: theme.colors.bg.primary }}>
      <button onClick={toggleTheme}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};
```

### 3. Apply Theme Classes

```jsx
<div className="theme-bg-primary theme-text-primary">
  <div className="theme-card">
    <h2 className="theme-text-primary">Themed Content</h2>
    <p className="theme-text-secondary">Secondary text</p>
  </div>
</div>
```

## 🎨 Theme Colors

### Light Theme

- **Primary Background**: `#ffffff`
- **Secondary Background**: `#f8fafc`
- **Card Background**: `#ffffff`
- **Primary Text**: `#0f172a`
- **Secondary Text**: `#334155`
- **Accent Primary**: `#3b82f6`

### Dark Theme

- **Primary Background**: `#0f172a`
- **Secondary Background**: `#1e293b`
- **Card Background**: `#1e293b`
- **Primary Text**: `#f8fafc`
- **Secondary Text**: `#cbd5e1`
- **Accent Primary**: `#3b82f6`

## 🛠️ CSS Classes

### Background Classes

```css
.theme-bg-primary     /* Main background */
/* Main background */
.theme-bg-secondary   /* Secondary background */
.theme-bg-card        /* Card background with shadow */
.theme-bg-hover; /* Hover background */
```

### Text Classes

```css
.theme-text-primary   /* Primary text color */
/* Primary text color */
.theme-text-secondary /* Secondary text color */
.theme-text-muted; /* Muted text color */
```

### Component Classes

```css
.theme-card           /* Enhanced card with hover effects */
/* Enhanced card with hover effects */
.theme-job-card       /* Specialized job card styling */
.theme-profile-card   /* Profile card with gradient */
.theme-button-primary /* Primary button styling */
.theme-button-secondary /* Secondary button styling */
.theme-input; /* Themed input fields */
```

### Status Classes

```css
.theme-status-success /* Success indicator */
/* Success indicator */
.theme-status-warning /* Warning indicator */
.theme-status-error; /* Error indicator */
```

### Utility Classes

```css
.theme-shadow-sm      /* Small shadow */
/* Small shadow */
.theme-shadow-md      /* Medium shadow */
.theme-shadow-lg      /* Large shadow */
.theme-shadow-xl      /* Extra large shadow */
.theme-loading        /* Loading animation */
.theme-gradient-primary; /* Primary gradient */
```

## 🎯 Component Examples

### Themed Card

```jsx
<Card className="theme-card">
  <CardContent>
    <Typography variant="h6" className="theme-text-primary">
      Card Title
    </Typography>
    <Typography variant="body2" className="theme-text-secondary">
      Card description with themed colors
    </Typography>
  </CardContent>
</Card>
```

### Themed Button

```jsx
<Button className="theme-button-primary" onClick={handleClick}>
  Primary Action
</Button>
```

### Using Theme Object

```jsx
const { theme } = useTheme();

<Box
  sx={{
    backgroundColor: theme.colors.bg.card,
    color: theme.colors.text.primary,
    boxShadow: theme.shadows.md,
    background: theme.gradients.primary,
  }}
>
  Content with theme object
</Box>;
```

## 🔧 Customization

### Adding New Colors

Update the theme context in `src/context/ThemeContext.jsx`:

```jsx
// Add to the theme object
colors: {
  // existing colors...
  custom: {
    myColor: isDarkMode ? '#darkValue' : '#lightValue',
  }
}
```

### Creating Custom CSS Classes

Add to `src/styles/theme.css`:

```css
.theme-my-component {
  background-color: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  transition: all var(--transition-normal);
}

.theme-my-component:hover {
  background-color: var(--bg-hover);
  border-color: var(--accent-primary);
}
```

## 📱 Responsive Design

The theme system works seamlessly with responsive design:

```jsx
<Box
  sx={{
    backgroundColor: theme.colors.bg.card,
    p: { xs: 2, md: 4 }, // Responsive padding
    borderRadius: { xs: 2, md: 3 }, // Responsive border radius
  }}
>
  Responsive themed content
</Box>
```

## 🎪 Animation & Transitions

All theme transitions are smooth and customizable:

```css
:root {
  --transition-fast: 0.15s ease-in-out;
  --transition-normal: 0.3s ease-in-out;
  --transition-slow: 0.5s ease-in-out;
}
```

## 🔍 Testing the Theme

Visit the `/theme-showcase` route to see all theme components in action:

```jsx
// Add to your routes
<Route path="/theme-showcase" element={<ThemeShowcase />} />
```

## 🎨 Design Principles

1. **Consistency**: All components follow the same color scheme
2. **Accessibility**: High contrast ratios for readability
3. **Performance**: Efficient CSS custom properties
4. **Flexibility**: Easy to customize and extend
5. **Modern**: Beautiful gradients and smooth animations

## 🚨 Best Practices

1. **Always use theme colors** instead of hardcoded values
2. **Apply theme classes** for consistent styling
3. **Test both themes** when developing new components
4. **Use transitions** for smooth user experience
5. **Follow the established patterns** for new components

## 📦 File Structure

```
src/
├── context/
│   └── ThemeContext.jsx        # Theme context and provider
├── hooks/
│   └── useTheme.js            # Theme hook
├── styles/
│   └── theme.css              # Theme CSS variables and classes
├── components/
│   ├── providers/
│   │   └── AppThemeProvider.jsx # Theme provider wrapper
│   └── pages/
│       ├── ThemedHome.jsx     # Example themed page
│       └── ThemeShowcase.jsx  # Theme testing component
```

## 🎯 Integration with Existing Components

To migrate existing components to the theme system:

1. **Replace hardcoded colors** with theme variables
2. **Add theme classes** to elements
3. **Use the theme object** for dynamic styling
4. **Test in both light and dark modes**

Example migration:

```jsx
// Before
<div style={{ backgroundColor: '#ffffff', color: '#000000' }}>

// After
<div className="theme-bg-primary theme-text-primary">
// or
<div style={{
  backgroundColor: theme.colors.bg.primary,
  color: theme.colors.text.primary
}}>
```

---

**Happy Theming! 🎨✨**
