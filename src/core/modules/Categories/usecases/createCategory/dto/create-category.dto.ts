/* eslint-disable prettier/prettier */
import { Uuid } from "src/core/@shared/ValueObjects/uuid.vo"

export type InputCreateCategoryDTO = {
  uuid: Uuid
  name: string
  description: string | null
}

export type OutputCreateCategoryDTO = {
  uuid: string
  name: string
  description: string | null
  created_at: string
}