import { describe, expect, test } from "@jest/globals"
import { PromisePool } from "./promise.pool"
import { ResultProcessor } from "./result.processor"

describe("PromisePool class", () => {
  test("finds initial free indexes correctly", async () => {
    const promisePool = new PromisePool<number>(5)
    const freeIndexes = promisePool.findFreePoolIndexes()
    expect(freeIndexes).toEqual([0, 1, 2, 3, 4])
  })

  test("handles pool portions correctly", async () => {
    const arr = [1, 2, 3, 4, 5]
    const promisePool = new PromisePool<number>(3)
    const resultProcessor = new ResultProcessor<number>(arr.length)
    const callback = (num: number) =>
      new Promise<number>((resolve) => setTimeout(() => resolve(num * 2), 2000))
    let nextCur = 0

    nextCur = promisePool.addNextPortion(
      nextCur,
      arr,
      callback,
      resultProcessor,
    )

    expect(nextCur).toEqual(3)

    await promisePool.waitCurrentPortion()

    expect(resultProcessor.finalResult).toEqual([2, 4, 6, undefined, undefined])

    nextCur = promisePool.addNextPortion(
      nextCur,
      arr,
      callback,
      resultProcessor,
    )

    expect(nextCur).toEqual(5)

    await promisePool.waitCurrentPortion()

    expect(resultProcessor.finalResult).toEqual([2, 4, 6, 8, 10])
  })
})
