import { useCallback, useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { Container } from "./components/Container"
import { Input } from "./components/Input"
import { isInteger } from "./util/numbers"
import "./App.css"

interface Validation {
  hasError: boolean
  validated: boolean
}

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [validation, setValidation] = useState<Validation>({
    hasError: false,
    validated: false,
  })

  const validate = useCallback(() => {
    const inputValue = inputRef.current?.value

    // Assumption that all numbers are 10-based
    const validInteger = isInteger(inputValue || "")

    setValidation({ hasError: !validInteger, validated: true })

    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const { hasError, validated } = validation
    !hasError && validated && alert(`Valid integer: ${inputRef.current?.value}`)
  }, [validation])

  return (
    <Container>
      <label htmlFor="input">Enter an integer number</label>
      <Input
        id="input"
        type="text"
        className={clsx({ error: validation.hasError })}
        ref={inputRef}
        autoFocus
      />
      <button type="button" onClick={validate}>
        Validate
      </button>
    </Container>
  )
}

export default App
