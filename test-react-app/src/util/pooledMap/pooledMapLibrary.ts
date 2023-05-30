import { PromisePool, PromisePoolError } from "@supercharge/promise-pool"
import { Callback } from "../types"

type MapResult<T> = {
  results: T[]
  errors?: PromisePoolError<T, unknown>[]
}

/**
 * Using the solution with existing library
 * Fails a test for some reason :D
 */
export const pooledMap = async <T>(
  arr: T[],
  callback: Callback<T>,
  limit: number,
): Promise<MapResult<T>> => {
  if (arr.length === 0) {
    return Promise.resolve({ results: Array<T>(0) })
  }

  const pool = new PromisePool<T, true>()

  const { results, errors } = await pool
    .withConcurrency(limit)
    .for(arr)
    .process(callback)

  return { results, errors }
}
