const languages = [
	{ code: "en-IN", label: "English" },
	{ code: "hi-IN", label: "हिंदी" },
	{ code: "te-IN", label: "తెలుగు" },
];

function LanguageSwitcher({ language = "en-IN", onLanguageChange }) {
	return (
		<label className="language-switcher">
			<span>Language</span>
			<select
				value={language}
				onChange={(event) => onLanguageChange?.(event.target.value)}
				aria-label="Select language"
			>
				{languages.map((option) => (
					<option key={option.code} value={option.code}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	);
}

export default LanguageSwitcher;
