import * as R from 'ramda'

export namespace objUtil {}

export const cD = <T>(val: T): T => R.clone(val)
