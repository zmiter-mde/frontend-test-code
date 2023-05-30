import { Callback } from "../types"
import { PromisePool } from "./promise.pool"
import { ResultProcessor } from "./result.processor"

export const pooledMap = async <T>(
  arr: T[],
  callback: Callback<T>,
  limit: number,
): Promise<T[]> => {
  if (arr.length === 0) {
    return Promise.resolve([])
  }

  const itemsCount = arr.length,
    resultProcessor = new ResultProcessor<T>(itemsCount),
    promisePool = new PromisePool<T>(limit)

  let currentItemIndex = 0

  while (currentItemIndex < itemsCount) {
    const newCur = promisePool.addNextPortion(
      currentItemIndex,
      arr,
      callback,
      resultProcessor,
    )

    currentItemIndex = newCur
    await promisePool.raceCurrentPortion()
  }

  await promisePool.waitCurrentPortion()

  return resultProcessor.finalResult
}
