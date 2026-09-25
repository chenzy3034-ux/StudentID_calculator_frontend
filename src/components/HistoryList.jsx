function displayExpression(expression) {
  return expression.replaceAll('*', '×').replaceAll('/', '÷')
}

function displayTime(createdAt) {
  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) {
    return createdAt
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export default function HistoryList({
  history,
  isLoading,
  deletingId,
  onDelete,
  onRefresh,
}) {
  return (
    <section className="history-card" aria-labelledby="history-title">
      <div className="section-heading history-heading">
        <div>
          <p className="eyebrow">Saved in SQLite</p>
          <h2 id="history-title">Calculation history</h2>
        </div>
        <button
          type="button"
          className="refresh-button"
          onClick={onRefresh}
          disabled={isLoading}
        >
          {isLoading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      {isLoading && history.length === 0 ? (
        <p className="history-state">Loading calculation history…</p>
      ) : history.length === 0 ? (
        <div className="empty-history">
          <span aria-hidden="true">∅</span>
          <p>No calculations yet.</p>
          <small>Successful results from the backend will appear here.</small>
        </div>
      ) : (
        <ol className="history-list">
          {history.map((item) => (
            <li key={item.id} className="history-item">
              <div className="history-calculation">
                <span className="history-expression">
                  {displayExpression(item.expression)}
                </span>
                <span className="history-result">= {item.result}</span>
                <time dateTime={item.created_at}>{displayTime(item.created_at)}</time>
              </div>
              <button
                type="button"
                className="delete-button"
                onClick={() => onDelete(item.id)}
                disabled={deletingId === item.id}
                aria-label={`Delete calculation ${displayExpression(item.expression)}`}
              >
                {deletingId === item.id ? 'Deleting…' : 'Delete'}
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
