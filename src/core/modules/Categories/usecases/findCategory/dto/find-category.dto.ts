export type InputFindCategoryDTO = {
  uuid: string;
};

export type OutputFindCategoryDTO = {
  uuid: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};
