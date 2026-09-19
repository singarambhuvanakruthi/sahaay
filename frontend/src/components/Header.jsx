import { Link } from "react-router-dom";

import LanguageSwitcher from "./LanguageSwitcher";

function Header({ language, onLanguageChange, onAccessibilityClick }) {
	return (
		<header className="site-header">
			<div className="site-header-inner">
				<Link className="sahaay-brand" to="/home" aria-label="Sahaay home">
					<span className="sahaay-mark" aria-hidden="true">S</span>
					<span>SAHAAY</span>
				</Link>

				<div className="header-controls">
					<LanguageSwitcher
						language={language}
						onLanguageChange={onLanguageChange}
					/>
					<button
						type="button"
						className="accessibility-trigger"
						onClick={onAccessibilityClick}
						aria-label="Open accessibility preferences"
					>
						Accessibility
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;
