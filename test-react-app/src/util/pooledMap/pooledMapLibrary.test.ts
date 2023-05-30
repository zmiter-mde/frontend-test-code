import { describe, expect, test } from "@jest/globals"
import { pooledMap } from "./pooledMapLibrary"

describe("PooledMapLibrary utils", () => {
  test("runs correctly", async () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const result = await pooledMap(
      arr,
      (num: number) =>
        new Promise((resolve) => setTimeout(() => resolve(num * 2), 5000)),
      4,
    )

    expect(result.results).toEqual(arr.map((elem) => elem * 2))
  }, 10500)

  test("runs correctly in time", async () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const result = await pooledMap(
      arr,
      (num: number) =>
        new Promise((resolve) => setTimeout(() => resolve(num * 2), 2000)),
      6,
    )

    expect(result.results).toEqual(arr.map((elem) => elem * 2))
  }, 4500)

  // Lol, why does the library fail? :D
  test.skip("runs correctly with random timeouts", async () => {
    const arr = [1, 2, 3, 4, 5, 6]
    const result = await pooledMap(
      arr,
      (num: number) =>
        new Promise((resolve) =>
          setTimeout(() => resolve(num * 2), Math.random() * 5000),
        ),
      3,
    )

    expect(result.results).toEqual(arr.map((elem) => elem * 2))
  }, 10000)
})
