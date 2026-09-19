import { useEffect, useState } from "react";

const preferenceKeys = {
	textSize: "sahaay-text-size",
	highContrast: "sahaay-high-contrast",
	dyslexiaFont: "sahaay-dyslexia-font",
	reduceMotion: "sahaay-reduce-motion",
	voiceMode: "sahaay-voice-mode",
};

const defaults = {
	textSize: "normal",
	highContrast: false,
	dyslexiaFont: false,
	reduceMotion: false,
	voiceMode: false,
};

function readPreference(key, fallback) {
	try {
		const value = localStorage.getItem(key);
		return value === null ? fallback : JSON.parse(value);
	} catch {
		return fallback;
	}
}

function AccessibilityPanel({ open, onClose }) {
	const [preferences, setPreferences] = useState(() => ({
		textSize: readPreference(preferenceKeys.textSize, defaults.textSize),
		highContrast: readPreference(preferenceKeys.highContrast, defaults.highContrast),
		dyslexiaFont: readPreference(preferenceKeys.dyslexiaFont, defaults.dyslexiaFont),
		reduceMotion: readPreference(preferenceKeys.reduceMotion, defaults.reduceMotion),
		voiceMode: readPreference(preferenceKeys.voiceMode, defaults.voiceMode),
	}));

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle("text-size-large", preferences.textSize === "large");
		root.classList.toggle("text-size-extra-large", preferences.textSize === "extra-large");
		root.classList.toggle("high-contrast", preferences.highContrast);
		root.classList.toggle("dyslexia-font", preferences.dyslexiaFont);
		root.classList.toggle("reduce-motion", preferences.reduceMotion);

		Object.entries(preferenceKeys).forEach(([name, key]) => {
			localStorage.setItem(key, JSON.stringify(preferences[name]));
		});
	}, [preferences]);

	function updatePreference(name, value) {
		setPreferences((previous) => ({ ...previous, [name]: value }));
	}

	function resetPreferences() {
		setPreferences(defaults);
	}

	if (!open) return null;

	return (
		<aside className="accessibility-panel" aria-label="Accessibility preferences">
			<div className="accessibility-panel-header">
				<div>
					<p className="panel-eyebrow">Sahaay settings</p>
					<h2>Accessibility</h2>
				</div>
				<button type="button" className="panel-close" onClick={onClose} aria-label="Close accessibility preferences">
					Close
				</button>
			</div>

			<fieldset>
				<legend>Text size</legend>
				<div className="choice-row">
					{["normal", "large", "extra-large"].map((size) => (
						<label key={size} className="choice-label">
							<input
								type="radio"
								name="text-size"
								checked={preferences.textSize === size}
								onChange={() => updatePreference("textSize", size)}
							/>
							{size === "extra-large" ? "Extra large" : size[0].toUpperCase() + size.slice(1)}
						</label>
					))}
				</div>
			</fieldset>

			{[
				["highContrast", "High contrast"],
				["dyslexiaFont", "Dyslexia-friendly font"],
				["reduceMotion", "Reduce motion"],
				["voiceMode", "Voice mode"],
			].map(([name, label]) => (
				<label className="toggle-row" key={name}>
					<span>{label}</span>
					<input
						type="checkbox"
						checked={preferences[name]}
						onChange={(event) => updatePreference(name, event.target.checked)}
					/>
				</label>
			))}

			<button type="button" className="secondary reset-preferences" onClick={resetPreferences}>
				Reset preferences
			</button>
		</aside>
	);
}

export default AccessibilityPanel;
