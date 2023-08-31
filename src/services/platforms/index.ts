import { platformsDb } from "../../data";

import { buildGetPlatform } from "./get-platform";
import { buildCreatePlatforms } from "./insert-platform";

export const getPlatform = buildGetPlatform({ platformsDb });
export const createPlatform = buildCreatePlatforms({ platformsDb });