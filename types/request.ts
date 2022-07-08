export type TCreateGameProgressRequest = {
  gameId: number;
  userId: number;
  progress: number;
  wpm: number;
};

export type TGetGameProgressesRequest = {
  gameId: number;
  playerId?: number;
  all?: boolean;
};
