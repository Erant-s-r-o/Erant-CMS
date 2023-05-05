import { writable } from 'svelte/store'
import * as api from './api'

class FetchArray extends Array {
  constructor (items, caller = () => null) {
    super()
    this.push(...items)
    this.caller = caller
  }

  setFetch (caller) {
    this.caller = caller
    return this
  }

  fetch (fetchBody = {}, then = () => null) {
    return this.caller(fetchBody, then)
  }
}

export function fetchable (path, initBody = {}) {
  const { subscribe, set } = writable(null)

  return {
    subscribe,
    fetch (fetchBody = {}, then = () => null) {
      const body = Object.assign(initBody, fetchBody)

      api.post(path, body).then((result) => {
        set(result)
        then(result)
      })

      return this
    }
  }
}

export function loadable (path, initBody = {}) {
  const fetcher = fetchable(path, initBody)
  const fetchCaller = fetcher.fetch

  const isFetching = writable(false)

  fetcher.fetch = (fetchBody = {}, then = () => null) => {
    isFetching.set(true)

    fetchCaller(fetchBody, (result) => {
      isFetching.set(false)
      then(result)
    })

    return new FetchArray([fetcher, isFetching], fetcher.fetch)
  }

  return new FetchArray([fetcher, isFetching], fetcher.fetch)
}

export function mutable (path, callback = () => null) {
  const isFetching = writable(false)
  const { subscribe, set } = writable(null)

  const mutateCall = async (fetchBody = {}) => {
    isFetching.set(true)

    const result = await api.post(path, fetchBody)
    set(result)
    isFetching.set(false)

    return result
  }

  return [
    {
      subscribe,
      mutate (fetchBody = {}) {
        callback(mutateCall, fetchBody)
        return this
      }
    },
    isFetching
  ]
}
