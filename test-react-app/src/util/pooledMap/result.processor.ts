import { PooledResponse } from "../types"

export class ResultProcessor<T> {
  public finalResult: T[]

  constructor(size: number) {
    this.finalResult = Array<T>(size)
  }

  public processResult = (result: PooledResponse<T>): void => {
    const { response, promiseIndex } = result
    this.finalResult[promiseIndex] = response
  }
}
