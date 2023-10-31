interface ICrudService<T> {
  getAll: () => Promise<T[]>;
  getOne: (id: number) => Promise<T | null>;
  create: (data: T) => Promise<T>;
  update: (id: number, data: T) => Promise<T>;
  delete: (id: number) => Promise<T>;
}