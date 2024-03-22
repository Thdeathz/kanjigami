import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      minHeight: {
        content: 'calc(100vh - 3.75rem - 2.5rem)'
      },
      backgroundColor: {
        logo: 'rgb(var(--rgb-gray-0))'
      },
      backgroundImage: {
        'auth-blur-r': 'linear-gradient(to left,var(--clr-bg),transparent)',
        'auth-blur-l': 'linear-gradient(to right,var(--clr-bg),transparent)',
        'auth-bottom': 'url(/images/auth-bottom.png)',
        navbar: 'linear-gradient(to right,rgb(var(--rgb-gray-0)) 50%,transparent)',
        sidebar: 'linear-gradient(175deg,rgb(var(--rgb-gray-1)) 0,rgba(var(--rgb-gray-0),.7) 85%)',
        'side-link':
          'linear-gradient(95.67deg,rgb(var(--rgb-sidebar-highlight)) 0,rgba(var(--rgb-sidebar-highlight),0) 92.54%)',
        panel: 'var(--panel-bg)'
      },
      borderWidth: {
        'app-icon': '1.5px'
      },
      boxShadow: {
        btn: 'inset 1px 1px 2px rgba(var(--rgb-white), 0.1)',
        'app-icon': '4px 4px 0px rgba(0, 0, 0, 0.8)',
        'app-icon-hover': '-4px -4px 0px rgba(0, 0, 0, 0.8)',
        panel: 'var(--panel-shadow)'
      },
      dropShadow: {
        'plus-badge': '0 0 14px yellow'
      },
      colors: {
        default: {
          bg: 'var(--clr-bg)',
          btn: 'var(--clr-btn)',
          'btn-hover': 'var(--clr-btn-hover)',
          'btn-text': 'var(--clr-btn-text)',
          text: 'var(--clr-text)',
          'text-light': 'var(--clr-text-lightest-final)',
          link: 'var(--clr-link)',
          heading: 'var(--clr-heading)'
        },
        danger: {
          text: 'var(--clr-red)',
          btn: 'var(--clr-btn-danger)',
          'btn-hover': 'var(--clr-btn-danger-hover)'
        },
        border: 'hsl(var(--border))',
        'border-bright': 'var(--clr-border-brighter)',
        'border-1': 'var(--clr-border-1)',
        input: 'var(--clr-input)',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        footer: 'rgba(var(--rgb-gray-0),.75)',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          btn: 'var(--clr-btn-primary)',
          'btn-hover': 'var(--clr-btn-primary-hover)'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          'btn-text': 'var(--clr-btn-secondary-text)'
        },
        'section-heading': 'var(--clr-section-heading)',
        sidebar: {
          link: 'var(--clr-sidebar-link)',
          'link-hover': 'var(--clr-sidebar-link-hover)',
          icon: 'var(--clr-sidebar-icon)',
          'icon-hover': 'var(--clr-sidebar-icon-hover)'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
