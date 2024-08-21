/* eslint-disable prettier/prettier */
import { Uuid } from "src/core/@shared/ValueObjects/uuid.vo"

export type InputFindCategoryDTO = {
  uuid: Uuid
}

export type OutputFindCategoryDTO = {
  uuid: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}