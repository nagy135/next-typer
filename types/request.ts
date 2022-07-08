export type TCreateGameProgressRequest = {
  gameId: number;
  userId: number;
  progress: number;
  wpm: number;
};

export type TGetGameProgressesRequest = {
  gameId: number;
  all: boolean;
};
