import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme";
const { withUt } = require("uploadthing/tw")
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = withUt({
	darkMode: ["class"],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: "",
	theme: {
		container: {
			center: 'true',
			padding: '2rem',
			screens: {
				'4xl': '1400px',
				'3xsm': '320px',
				'2xsm': '375px',
				xsm: '425px',
				'3xl': '2000px',
				...defaultTheme.screens,
			}
		},
		screens: {
			'4xl': '1400px',
			'3xsm': '320px',
			'2xsm': '375px',
			xsm: '425px',
			'3xl': '2000px',
			...defaultTheme.screens,
		},
		extend: {
			transitionDuration: {
				'fast': '10000ms', // Custom duration for faster animation
				'faster': '100ms', // Even faster
			},
			aspectRatio: {
				'16/9': '16 / 9', // Add your custom aspect ratio here
				'3/2': '3 / 2', // Another example
			},
			boxShadow: {
				input: '`0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`',
				'3xl': ' -4px -4px 40px 4px rgb(70, 70, 70)'
			},
			backgroundImage: {
				'banner-1': 'url("/images/sale/banner-19.webp")',
				'banner-2': 'url("/images/sale/banner-18.jpg")',
				'banner-3': 'url("/images/sale/banner-21.webp")',
				'banner-4': 'url("/images/sale/electronics1.jpe")'
			},
			colors: {
				border: 'hsl(var(--border))',
				'black-2': '#010101',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
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
				scrolls: {
					to: {
						transform: 'translate(calc(-50% - 0.5rem))',
					},
				},
				scroll: {
					'0%': {
						transform: 'translateX(100%)',
					},
					'100%': {
						transform: 'translateX(-100%)',
					},
				},
				spotlight: {
					'0%': {
						opacity: '0',
						transform: 'translate(-72%, -62%) scale(0.5)',
					},
					'100%': {
						opacity: '1',
						transform: 'translate(-50%,-40%) scale(1)',
					},
				},
				moveHorizontal: {
					'0%': {
						transform: 'translateX(-50%) translateY(-10%)',
					},
					'50%': {
						transform: 'translateX(50%) translateY(10%)',
					},
					'100%': {
						transform: 'translateX(-50%) translateY(-10%)',
					},
				},
				moveInCircle: {
					'0%': {
						transform: 'rotate(0deg)',
					},
					'50%': {
						transform: 'rotate(180deg)',
					},
					'100%': {
						transform: 'rotate(360deg)',
					},
				},
				moveVertical: {
					'0%': {
						transform: 'translateY(-50%)',
					},
					'50%': {
						transform: 'translateY(50%)',
					},
					'100%': {
						transform: 'translateY(-50%)',
					},
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				scroll:
					'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
				scrolls:
					'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
				spotlight: 'spotlight 2s ease .75s 1 forwards',
				first: 'moveVertical 30s ease infinite',
				second: 'moveInCircle 20s reverse infinite',
				third: 'moveInCircle 40s linear infinite',
				fourth: 'moveHorizontal 40s ease infinite',
				fifth: 'moveInCircle 20s ease infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate"), addVariablesForColors],
}) satisfies Config

export default config

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}
