function ProgressIndicator({ currentStep = 1, totalSteps = 5 }) {
	const safeStep = Math.min(Math.max(currentStep, 1), totalSteps);
	const progress = (safeStep / totalSteps) * 100;

	return (
		<div className="progress-indicator" aria-label={`Step ${safeStep} of ${totalSteps}`}>
			<div className="progress-summary">
				<strong>Step {safeStep} of {totalSteps}</strong>
				<span>{Math.round(progress)}% complete</span>
			</div>
			<div className="progress-track" role="progressbar" aria-valuemin="1" aria-valuemax={totalSteps} aria-valuenow={safeStep}>
				<span style={{ width: `${progress}%` }} />
			</div>
		</div>
	);
}

export default ProgressIndicator;
