import { describe, expect, test } from "@jest/globals"
import { isInteger } from "./numbers"

/**
 * The requirements are not set, so I chose these :)
 */
describe("Numbers utils", () => {
  test("validates positive integer correctly", () => {
    expect(isInteger("1")).toBe(true)
  })

  test("validates negative integer correctly", () => {
    expect(isInteger("-2")).toBe(true)
  })

  test("invalidates positive float number correctly", () => {
    expect(isInteger("3.0")).toBe(false)
  })

  test("invalidates negative float number correctly", () => {
    expect(isInteger("-4.0")).toBe(false)
  })

  test("validates preceeding zeros correctly", () => {
    expect(isInteger("00005")).toBe(true)
  })

  test("invalidates string correctly", () => {
    expect(isInteger("foo")).toBe(false)
  })

  test("validates negative zero correctly", () => {
    expect(isInteger("-0")).toBe(true)
  })

  test("invalidates positive zero correctly", () => {
    expect(isInteger("+0")).toBe(false)
  })

  test("invalidates 16-based number correctly", () => {
    expect(isInteger("1F")).toBe(false)
  })

  test("invalidates empty value correctly", () => {
    expect(isInteger("")).toBe(false)
  })

  test("invalidates preceeding spaces value correctly", () => {
    expect(isInteger("  1")).toBe(false)
  })

  test("invalidates trailing spaces value correctly", () => {
    expect(isInteger("1   ")).toBe(false)
  })

  test("validates overly large integer value correctly", () => {
    expect(isInteger(`${Number.MAX_SAFE_INTEGER}12351235123412`)).toBe(true)
  })
})
