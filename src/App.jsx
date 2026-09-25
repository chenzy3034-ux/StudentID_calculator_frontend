import { useCallback, useEffect, useState } from 'react'

import Calculator from './components/Calculator.jsx'
import HistoryList from './components/HistoryList.jsx'
import {
  calculateExpression,
  deleteHistoryItem,
  getHistory,
} from './services/calculatorApi.js'

function toDisplayExpression(value) {
  return value.replaceAll('*', '×').replaceAll('/', '÷')
}

function toApiExpression(value) {
  return value.replaceAll('×', '*').replaceAll('÷', '/')
}

export default function App() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [isHistoryLoading, setIsHistoryLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  const loadHistory = useCallback(async () => {
    setIsHistoryLoading(true)
    try {
      const records = await getHistory()
      setHistory(records)
      setError('')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsHistoryLoading(false)
    }
  }, [])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  function handleExpressionChange(value) {
    setExpression(toDisplayExpression(value))
    setResult('')
    setError('')
  }

  function handleAppend(value) {
    setExpression((currentExpression) => `${currentExpression}${value}`)
    setResult('')
    setError('')
  }

  function handleClear() {
    setExpression('')
    setResult('')
    setError('')
  }

  async function handleCalculate() {
    if (isCalculating) {
      return
    }

    setIsCalculating(true)
    setResult('')
    setError('')
    try {
      const record = await calculateExpression(toApiExpression(expression))
      setResult(record.result)
      await loadHistory()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsCalculating(false)
    }
  }

  async function handleDelete(historyId) {
    if (deletingId !== null) {
      return
    }

    setDeletingId(historyId)
    setError('')
    try {
      await deleteHistoryItem(historyId)
      await loadHistory()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="product-label">Front-end / Back-end Separation</p>
          <h1>Calculator System</h1>
        </div>
        <div className="connection-note">
          <span aria-hidden="true" />
          Backend API
        </div>
      </header>

      <div className="workspace">
        <Calculator
          expression={expression}
          result={result}
          error={error}
          isCalculating={isCalculating}
          onExpressionChange={handleExpressionChange}
          onAppend={handleAppend}
          onClear={handleClear}
          onCalculate={handleCalculate}
        />
        <HistoryList
          history={history}
          isLoading={isHistoryLoading}
          deletingId={deletingId}
          onDelete={handleDelete}
          onRefresh={loadHistory}
        />
      </div>
    </main>
  )
}
