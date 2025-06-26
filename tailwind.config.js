/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			'primary-light': '#6366F1',
  			'primary-dark': '#8B5CF6',
  			'surface-light': 'rgba(255, 255, 255, 0.05)',
  			'surface-medium': 'rgba(255, 255, 255, 0.08)',
  			'surface-dark': 'rgba(255, 255, 255, 0.12)',
  			success: '#10B981',
  			warning: '#F59E0B',
  			error: '#EF4444',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: 'hsl(var(--muted))',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			brand: 'hsl(var(--brand))',
  			'brand-foreground': 'hsl(var(--brand-foreground))',
  			'muted-foreground': 'hsl(var(--muted-foreground))'
  		},
  		fontFamily: {
  			// Modern, distinctive font stack
  			sans: [
  				'Plus Jakarta Sans',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'sans-serif'
  			],
  			// Elegant font for headings
  			heading: [
  				'Plus Jakarta Sans',
  				'Playfair Display',
  				'serif'
  			],
  			// Beautiful calligraphic font for special text
  			script: [
  				'Kaushan Script',
  				'Playfair Display',
  				'cursive'
  			],
  			// Elegant serif for sophisticated text
  			serif: [
  				'Playfair Display',
  				'Georgia',
  				'serif'
  			]
  		},
  		animation: {
  			gradient: 'gradient-shift 6s ease-in-out infinite',
  			marquee: 'marquee var(--duration) linear infinite',
  			'fade-in': 'fadeIn 0.6s ease-out',
  			'slide-up': 'slideUp 0.6s ease-out'
  		},
  		keyframes: {
  			'gradient-shift': {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%',
  					filter: 'hue-rotate(0deg) brightness(1)'
  				},
  				'25%': {
  					backgroundPosition: '50% 50%',
  					filter: 'hue-rotate(15deg) brightness(1.1)'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%',
  					filter: 'hue-rotate(30deg) brightness(1.2)'
  				},
  				'75%': {
  					backgroundPosition: '50% 50%',
  					filter: 'hue-rotate(15deg) brightness(1.1)'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		maxWidth: {
  			container: '1280px'
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					fontFamily: 'Plus Jakarta Sans, sans-serif',
  					lineHeight: '1.6',
  					letterSpacing: '-0.005em'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};