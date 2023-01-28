import { z } from 'zod'
import { objUtil } from '../utils/objectUtil'
import type { ModelBase } from '~/utils/type'
import { isUndefined } from '~/utils/booleanUtil'
import { throwErr } from '~/utils/errorUtil'
import { ModelBasic } from './basicModel'
import { ModelRoom } from './roomModel'
import { ModelMessage } from './messageModel'

enum EnumRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  ADVISOR = 'ADVISOR',
}

export const SchemaModelUser = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum([EnumRole.USER, EnumRole.ADMIN, EnumRole.ADVISOR]),
  fkRooms: z.array(z.string()),
  fkMessages: z.array(z.string()),
  isConfirmed: z.boolean(),
})

export class ModelUser extends ModelBasic {
  firstname = ''
  lastname = ''
  email = ''
  password = ''
  role = EnumRole.USER
  fkRooms: ModelRoom[] = []
  fkMessages: ModelMessage[] = []
  isConfirmed = false

  protected constructor(obj?: ModelBase<ModelUser>) {
    if (isUndefined(obj)) {
      super()
    } else if (!objUtil.isObject(obj)) {
      throwErr('obj is not an object')
    } else {
      super(obj)
      objUtil.hydrate(this, SchemaModelUser.parse(obj))
    }
  }
}
