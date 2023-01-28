import * as R from 'ramda'
import type { AnyObject } from './type'

export const cD = <T>(val: T): T => R.clone(val)

export namespace objUtil {
  export const isObject = (obj: unknown): obj is Object => obj?.constructor.name === 'Object'

  export const hydrate = (sourceToHydrate: AnyObject, objForHydrating: AnyObject): void => {
    for (const [key] of Object.entries(sourceToHydrate)) sourceToHydrate[key] = objForHydrating[key]
  }
}
