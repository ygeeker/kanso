import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				// E-ink paper colors
				eink: {
					paper: "var(--eink-paper)",
					"paper-warm": "var(--eink-paper-warm)",
					"paper-highlight": "var(--eink-paper-highlight)",
					ink: "var(--eink-ink)",
					"ink-secondary": "var(--eink-ink-secondary)",
					"ink-tertiary": "var(--eink-ink-tertiary)",
					"ink-muted": "var(--eink-ink-muted)",
					divider: "var(--eink-divider)",
					border: "var(--eink-border)",
				},
				// Kindle bezel colors
				bezel: {
					outer: "var(--bezel-outer)",
					inner: "var(--bezel-inner)",
					accent: "var(--bezel-accent)",
					highlight: "var(--bezel-highlight)",
					shadow: "var(--bezel-shadow)",
				},
				// Device background
				device: {
					bg: "var(--device-bg)",
					"bg-start": "var(--device-bg-gradient-start)",
					"bg-end": "var(--device-bg-gradient-end)",
				},
			},
			fontFamily: {
				serif: ["var(--font-serif)"],
				sans: ["var(--font-sans)"],
			},
			boxShadow: {
				"kindle-bezel": "0 20px 60px -10px var(--bezel-shadow), 0 10px 20px -5px var(--bezel-shadow), inset 0 1px 0 var(--bezel-highlight)",
				"kindle-screen": "inset 0 2px 8px rgba(0, 0, 0, 0.1)",
				"eink-subtle": "0 1px 3px var(--eink-shadow)",
			},
			borderRadius: {
				"kindle": "2rem",
				"kindle-screen": "0.375rem",
			},
		},
	},
	plugins: [],
};

export default config;

