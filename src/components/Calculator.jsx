const keys = [
  { label: 'C', action: 'clear', kind: 'utility' },
  { label: '(', value: '(', kind: 'utility' },
  { label: ')', value: ')', kind: 'utility' },
  { label: '÷', value: '÷', kind: 'operator' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '×', value: '×', kind: 'operator' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '−', value: '-', kind: 'operator' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '+', value: '+', kind: 'operator' },
  { label: '0', value: '0', className: 'key--zero' },
  { label: '.', value: '.' },
]

export default function Calculator({
  expression,
  result,
  error,
  isCalculating,
  onExpressionChange,
  onAppend,
  onClear,
  onCalculate,
}) {
  function handleSubmit(event) {
    event.preventDefault()
    onCalculate()
  }

  return (
    <section className="calculator-card" aria-labelledby="calculator-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Calculator</p>
          <h2 id="calculator-title">Enter an expression</h2>
        </div>
        <span className="server-badge">Calculated by backend</span>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="display-label" htmlFor="expression">
          Expression
        </label>
        <input
          id="expression"
          className="expression-display"
          type="text"
          inputMode="decimal"
          value={expression}
          onChange={(event) => onExpressionChange(event.target.value)}
          placeholder="(1 + 2) × 3"
          autoComplete="off"
          spellCheck="false"
          aria-describedby="calculation-error"
        />

        <div className="result-panel" aria-live="polite">
          <span>Result</span>
          <output>{result || '—'}</output>
        </div>

        <p
          id="calculation-error"
          className={`error-message${error ? ' error-message--visible' : ''}`}
          role={error ? 'alert' : undefined}
        >
          {error || '\u00a0'}
        </p>

        <div className="keypad" aria-label="Calculator keypad">
          {keys.map((key) => (
            <button
              key={key.label}
              type="button"
              className={[
                'key',
                key.kind ? `key--${key.kind}` : '',
                key.className || '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={key.action === 'clear' ? onClear : () => onAppend(key.value)}
              aria-label={key.action === 'clear' ? 'Clear expression' : key.label}
            >
              {key.label}
            </button>
          ))}
          <button
            type="submit"
            className="key key--equals"
            disabled={isCalculating}
          >
            {isCalculating ? 'Working…' : '='}
          </button>
        </div>
      </form>
    </section>
  )
}
