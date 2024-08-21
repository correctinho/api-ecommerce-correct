/* eslint-disable prettier/prettier */
import { Uuid } from "src/core/@shared/ValueObjects/uuid.vo"

export type InputCreateCategoryDTO = {
  uuid: Uuid
  name: string
  description: string | null
  correct_admin_uuid: string
}

export type OutputCreateCategoryDTO = {
  uuid: string
  name: string
  description: string | null
  created_at: string
}
