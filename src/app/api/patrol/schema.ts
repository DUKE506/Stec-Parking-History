import { z } from "zod";

const patrolSchema = z.object({
  PARK_ID: z.string().nullable(),
  PATROL_USER_NM: z.string().nullable(),
  PATROL_DTM: z.string().nullable(),
  PATROL_CODE: z.number().nullable(),
  PATROL_NAME: z.string().nullable(),
  CAR_NUM: z.string().nullable(),
  PATROL_IMG: z.string().nullable(),
  PATROL_REMARK: z.string().nullable(),
});

export default { patrolSchema };
