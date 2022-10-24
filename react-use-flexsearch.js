import { useState, useEffect, useMemo } from 'react'
import { Index } from 'flexsearch'

export const useFlexSearch = (query, providedIndex, store, searchOptions) => {
  const [index, setIndex] = useState(null)

  useEffect(() => {
    if (!providedIndex && !store)
      console.warn(
        'A FlexSearch index and store was not provided. Your search results will be empty.',
      )
    else if (!providedIndex)
      console.warn(
        'A FlexSearch index was not provided. Your search results will be empty.',
      )
    else if (!store)
      console.warn(
        'A FlexSearch store was not provided. Your search results will be empty.',
      )
  }, [providedIndex, store])

  useEffect(() => {
    if (!providedIndex) {
      setIndex(null)
      return
    }

    if (providedIndex instanceof Index) {
      setIndex(providedIndex)
      return
    }

    const importedIndex = Index.create()
    importedIndex.import(providedIndex)

    setIndex(importedIndex)
  }, [providedIndex])

  return useMemo(() => {
    if (!query || !index || !store) return []

    const rawResults = index.search(query, searchOptions)

    return rawResults.map(id => store[id])
  }, [query, index, store])
}