import { z } from 'zod'
import { objUtil } from '../utils/objectUtil'
import type { ModelBase } from '~/utils/type'
import { isUndefined } from '~/utils/booleanUtil'
import { throwErr } from '~/utils/errorUtil'
import { ModelBasic } from './basicModel'

enum EnumRole {
  ADMIN = 'ADMIN',
}

export const SchemaModelUser = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.nativeEnum(EnumRole),
})

export class ModelUser extends ModelBasic {
  email = ''
  password = ''
  role = EnumRole.ADMIN

  protected constructor(obj?: ModelBase<ModelUser>) {
    if (isUndefined(obj)) {
      super()
      return
    } else if (!objUtil.isObject(obj)) {
      throwErr('obj is not an object')
    } else {
      super(obj)
      objUtil.hydrate(this, SchemaModelUser.parse(obj))
    }
  }
}
