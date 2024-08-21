export type InputCreateProductDTO = {
  category_uuid: string;
  business_user_uuid: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  file: FileDTO;
  imageUrl: string[];
  create_at: string;
  updated_at: string;
};

export type FileDTO = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};
