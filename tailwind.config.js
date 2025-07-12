/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        phantom: {
          violet: '#7F5AF0',
          'violet-light': '#A992F5',
          'violet-dark': '#6B4AE0',
          teal: '#2CBFAE',
          'teal-light': '#44D5C0',
          'teal-dark': '#1A9F8E',
          danger: '#F87171',
          'danger-light': '#FCA5A5',
        },
        // Background hierarchy
        bg: {
          page: '#0E0E10',
          section: '#121214',
          card: '#1B1B1D',
          hover: '#1C1C1F',
          input: '#1F1F21',
          modal: '#1A1A1C',
        },
        // Text hierarchy
        text: {
          primary: '#FFFFFF',
          secondary: '#F4F4F5',
          body: '#D4D4D8',
          muted: '#A1A1AA',
          meta: '#71717A',
          danger: '#F87171',
        },
        // Border colors
        border: {
          card: '#2C2C2E',
          input: '#3F3F46',
          button: '#3F3F46',
          focus: '#7F5AF0',
        },
        // Legacy colors for backward compatibility
        'phantom-purple': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7F5AF0',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        'wave-teal': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2CBFAE',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'orbitron': ['Orbitron', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'wave': 'wave 1.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'button-press': 'button-press 0.1s ease-out',
        'card-hover': 'card-hover 0.3s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { boxShadow: '0 0 5px rgba(127, 90, 240, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(127, 90, 240, 0.8), 0 0 30px rgba(127, 90, 240, 0.4)' },
        },
        'wave': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'button-press': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.97)' },
          '100%': { transform: 'scale(1)' },
        },
        'card-hover': {
          '0%': { transform: 'scale(1)', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)' },
          '100%': { transform: 'scale(1.02)', boxShadow: '0 12px 28px rgba(127, 90, 240, 0.3)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'card': '0 8px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 12px 28px rgba(127, 90, 240, 0.3)',
        'button-hover': '0 4px 16px rgba(127, 90, 240, 0.4)',
        'modal': '0 16px 48px rgba(0, 0, 0, 0.6)',
        'input-focus': '0 0 0 2px rgba(127, 90, 240, 0.3)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        // Glass effects
        '.glass': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },

        // Card styling
        '.card-primary': {
          background: 'linear-gradient(135deg, #1B1B1D 0%, #121214 100%)',
          border: '1px solid #2C2C2E',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          padding: '24px',
        },
        '.card-hover': {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 12px 28px rgba(127, 90, 240, 0.3)',
          },
        },

        // Button styling
        '.btn-primary': {
          background: 'linear-gradient(90deg, #7F5AF0 0%, #2CBFAE 100%)',
          color: '#FFFFFF',
          fontWeight: '600',
          padding: '0.75rem 1.5rem',
          borderRadius: '12px',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: 'linear-gradient(90deg, #9D79FF 0%, #44D5C0 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 16px rgba(127, 90, 240, 0.4)',
          },
          '&:active': {
            transform: 'scale(0.97)',
            background: '#6B4AE0',
            boxShadow: 'inset 0 0 4px rgba(0,0,0,0.4)',
          },
          '&:disabled': {
            background: '#3A3A3D',
            color: '#A1A1AA',
            cursor: 'not-allowed',
            transform: 'none',
            boxShadow: 'none',
          },
        },
        '.btn-secondary': {
          background: 'transparent',
          border: '1px solid #3F3F46',
          color: '#E4E4E7',
          padding: '0.75rem 1.5rem',
          borderRadius: '12px',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: '#1F1F21',
            color: '#FFFFFF',
            borderColor: '#4F4F56',
          },
        },

        // Input styling
        '.input-primary': {
          background: '#1F1F21',
          border: '1px solid #3F3F46',
          color: '#E4E4E7',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          transition: 'all 0.2s ease',
          '&::placeholder': {
            color: '#71717A',
          },
          '&:focus': {
            outline: 'none',
            borderColor: '#7F5AF0',
            boxShadow: '0 0 0 2px rgba(127, 90, 240, 0.3)',
          },
          '&:error': {
            borderColor: '#F87171',
            color: '#F87171',
          },
        },

        // Text gradients
        '.text-gradient': {
          background: 'linear-gradient(135deg, #7F5AF0 0%, #2CBFAE 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-hero': {
          background: 'linear-gradient(160deg, #7F5AF0 0%, #2CBFAE 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },

        // Shimmer effects
        '.shimmer-bg': {
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
        },

        // Icon styling
        '.icon-primary': {
          color: '#7F5AF0',
          transition: 'color 0.2s ease',
          '&:hover': {
            color: '#A992F5',
          },
        },
        '.icon-action': {
          color: '#2CBFAE',
          transition: 'color 0.2s ease',
          '&:hover': {
            color: '#44D5C0',
          },
        },
        '.icon-muted': {
          color: '#A1A1AA',
          transition: 'color 0.2s ease',
          '&:hover': {
            color: '#D4D4D8',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 