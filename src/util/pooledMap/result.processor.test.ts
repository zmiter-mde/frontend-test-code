import { describe, expect, test } from "@jest/globals"
import { ResultProcessor } from "./result.processor"

describe("ResultProcessor class", () => {
  test("initialises correctly", async () => {
    const resultProcessor = new ResultProcessor<string>(3)
    resultProcessor.processResult({
      promiseIndex: 2,
      response: "2",
    })
    resultProcessor.processResult({
      promiseIndex: 1,
      response: "1",
    })
    expect(resultProcessor.finalResult).toEqual([undefined, "1", "2"])
  })
})
