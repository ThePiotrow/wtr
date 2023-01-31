import { z } from 'zod'
import { objUtil } from '../utils/objectUtil'
import type { ModelBase } from '~/utils/type'
import { isUndefined } from '~/utils/booleanUtil'
import { throwErr } from '~/utils/errorUtil'
import { ModelBasic } from './basicModel'

export const SchemaModelRoom = z.object({
  name: z.string(),
  fkUsers: z.array(z.string()),
  fkMessages: z.array(z.string()),
  nbMaxUser: z.number(),
})

export class ModelRoom extends ModelBasic {
  name = ''
  fkUsers = []
  fkMessages = []
  nbMaxUser = 0

  protected constructor(obj?: ModelBase<ModelRoom>) {
    if (isUndefined(obj)) {
      super()
      return
    } else if (!objUtil.isObject(obj)) {
      throwErr('obj is not an object')
    } else {
      super(obj)
      objUtil.hydrate(this, SchemaModelRoom.parse(obj))
    }
  }
}
