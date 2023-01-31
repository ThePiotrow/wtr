import * as R from 'ramda'
import type { AnyObject } from './type'

export const cD = <T>(val: T): T => R.clone(val)

export namespace objUtil {
  export const isObject = (obj: unknown): obj is Object => Object.prototype.toString.call(obj) === '[object Object]'

  export const hydrate = (sourceToHydrate: AnyObject, objForHydrating: AnyObject): void => {
    for (const [key] of Object.entries(sourceToHydrate))
      sourceToHydrate[key] = objForHydrating[key] !== undefined ? objForHydrating[key] : sourceToHydrate[key]
  }
}
