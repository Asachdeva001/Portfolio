export const theme = {
  colors: {
    primary: {
      dark: "#0A0F0D",
      medium: "#2D4F4A",
      light: "#8DB1A4"
    },
    accent: {
      gold: "#F9D29D",
      lightGold: "#F2B880"
    },
    neutral: {
      gray100: "#f7fafc",
      gray200: "#edf2f7",
      gray300: "#e2e8f0",
      gray400: "#cbd5e0",
      gray500: "#a0aec0",
      gray600: "#718096",
      gray700: "#2d3748",
      gray800: "#1a202c",
      gray900: "#171923"
    }
  },
  gradients: {
    primary: "linear-gradient(135deg, #0A0F0D, #2D4F4A, #8DB1A4)",
    primaryReverse: "linear-gradient(135deg, #8DB1A4, #2D4F4A, #0A0F0D)",
    accent: "linear-gradient(to right, #F9D29D, #F2B880)"
  },
  animations: {
    duration: {
      fast: 0.2,
      normal: 0.3,
      slow: 0.5,
      verySlow: 0.8
    },
    easing: {
      smooth: [0.6, -0.05, 0.01, 0.99],
      bounce: [0.68, -0.55, 0.265, 1.55]
    }
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};
