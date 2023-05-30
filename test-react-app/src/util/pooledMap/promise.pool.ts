import { Callback, Pool, PooledResponse } from "../types"
import { ResultProcessor } from "./result.processor"

export class PromisePool<T> {
  private pool: Pool<T>
  private responses: (PooledResponse<T> | null | undefined)[]

  constructor(public limit: number) {
    this.pool = Array<Promise<T>>(limit)
    this.responses = Array<PooledResponse<T>>(limit)

    for (let i = 0; i < limit; ++i) {
      // Only null response means the request is pending
      this.responses[i] = undefined
      this.pool[i] = null
    }
  }

  findFreePoolIndexes(): number[] {
    const result: number[] = []

    this.responses.forEach((response, poolIndex) => {
      // Response is not from pending request
      if (response !== null) {
        result.push(poolIndex)
      }
    })

    return result
  }

  protected async runPooledCallback(
    arr: T[],
    arrIndex: number,
    poolIndex: number,
    callback: Callback<T>,
    resultProcessor: ResultProcessor<T>,
  ): Promise<T> {
    const response = await callback(arr[arrIndex])

    // properly placing the response into indexed pool
    const pooledResponse = {
      response,
      promiseIndex: arrIndex,
    }

    this.responses[poolIndex] = pooledResponse

    // calling the outside handler, not to make it wait
    resultProcessor.processResult(pooledResponse)

    // This goes essentially nowhere,
    // leaving "response" just in case for testing
    return response
  }

  addNextPortion(
    currentArrayItem: number,
    arr: T[],
    callback: Callback<T>,
    resultProcessor: ResultProcessor<T>,
  ): number {
    const freePoolIndexes: number[] = this.findFreePoolIndexes()

    for (let i = 0; i < freePoolIndexes.length; ++i) {
      const poolIndex = freePoolIndexes[i]

      this.responses[poolIndex] = null
      this.pool[poolIndex] = null

      if (currentArrayItem + i < arr.length) {
        // Not awaiting for callback, just adding to free pool indexes
        this.pool[poolIndex] = this.runPooledCallback(
          arr,
          currentArrayItem + i,
          poolIndex,
          callback,
          resultProcessor,
        )
      }
    }

    return Math.min(arr.length, currentArrayItem + freePoolIndexes.length)
  }

  async raceCurrentPortion() {
    await Promise.race(this.pool)
  }

  async waitCurrentPortion() {
    await Promise.all(this.pool)
  }
}
