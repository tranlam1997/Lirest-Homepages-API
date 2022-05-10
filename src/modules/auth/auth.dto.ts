export interface CreateBookDto {
  title?: string;
  author?: string;
  description?: Date;
  ISBN?: string;
  price?: string;
}

export type UpdateBookDto = Required<CreateBookDto>;
