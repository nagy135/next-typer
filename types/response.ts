import { Progress } from "@prisma/client";
import { TPlayerProgress } from "@services/internal/api/get-game-progresses";

export type TGameProgressStatsResponse = TPlayerProgress;

export type TGameAllProgresses = Progress[]
