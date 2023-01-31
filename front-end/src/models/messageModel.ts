import { z } from 'zod'
import { objUtil } from '../utils/objectUtil'
import type { ModelBase } from '~/utils/type'
import { isUndefined } from '~/utils/booleanUtil'
import { throwErr } from '~/utils/errorUtil'
import { ModelBasic } from './basicModel'
import { ModelUser } from './userModel'

export const SchemaModelMessage = z.object({
  content: z.string(),
  fkSender: z.string(),
  fkSenderId: z.number(),
  fkRoom: z.string(),
  fkRoomId: z.number(),
})

export class ModelMessage extends ModelBasic {
  content = ''
  fkSender!: ModelUser
  fkSenderId = 0
  fkRoom!: ModelUser
  fkRoomId = 0

  protected constructor(obj?: ModelBase<ModelMessage>) {
    if (isUndefined(obj)) {
      super()
    } else if (!objUtil.isObject(obj)) {
      throwErr('obj is not an object')
    } else {
      super(obj)
      objUtil.hydrate(this, SchemaModelMessage.parse(obj))
    }
  }
}
