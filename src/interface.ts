export type ClientConfig = {
  user?: string | undefined;
  password?: string | Function | undefined;
  host?: string | undefined;
  database?: string | undefined;
  port?: number | undefined;
};

export interface IMovie {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

export type TMovie = Omit<IMovie, "id">;
