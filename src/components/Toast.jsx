import { useEffect } from 'react'
import { toast } from '../utils/mixins.js'

export function Toast({ message }) {

  useEffect(() => {
    if (message) toast.fire({ title: message })
  }, [message])

  return null
}