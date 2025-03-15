import { z } from "zod";

const blackListInfoSchema = z.object({
    IS_BLACK_LIST: z.string().nullable(),
    BLACK_LIST_REASON: z.string().nullable(),
    REG_DTM: z.string().nullable(),
});

const inGateLogSchema = z.object({
    IO_SEQ: z.string().nullable(),
    PARK_ID: z.string().nullable(),
    CAR_NUM: z.string().nullable(),
    IO_STATUS_TP: z.string().nullable(),
    IO_STATUS_TP_NM: z.string().nullable(),
    IN_GATE_ID: z.string().nullable(),
    IN_GATE_NM: z.string().nullable(),
    IN_LINE_NUM: z.number().nullable(),
    IN_DTM: z.string().nullable(),
    IN_LPR_STATUS: z.string().nullable(),
    IN_LPR_STATUS_NM: z.string().nullable(),
    IN_TICKET_TP: z.string().nullable(),
    IN_TICKET_TP_NM: z.string().nullable(),
    //확인필요
    BLACK_LIST_INFO: blackListInfoSchema.nullable(),


    DONG: z.string().nullable(),
    HO: z.string().nullable(),
    IS_RESERVATION: z.string().nullable(),
    IS_WAIT: z.string().nullable(),
    IS_WAIT_REASON: z.string().nullable(),
    IMG_PATH: z.string().nullable(),
    ETC: z.string().nullable(),
})

const outGateLogSchema = z.object({
    IO_SEQ: z.string().nullable(),
    PARK_ID: z.string().nullable(),
    CAR_NUM: z.string().nullable(),
    IO_STATUS_TP: z.string().nullable(),
    IO_STATUS_TP_NM: z.string().nullable(),
    OUT_GATE_ID: z.string().nullable(),
    OUT_GATE_NM: z.string().nullable(),
    OUT_LINE_NUM: z.number().nullable(),
    OUT_DTM: z.string().nullable(),
    OUT_LPR_STATUS: z.string().nullable(),
    OUT_LPR_STATUS_NM: z.string().nullable(),
    OUT_TICKET_TP: z.string().nullable(),
    OUT_TICKET_TP_NM: z.string().nullable(),
    //확인필요
    BLACK_LIST_INFO: blackListInfoSchema.nullable(),

    IMG_PATH: z.string().nullable(),
    DONG: z.string().nullable(),
    HO: z.string().nullable(),
    IS_RESERVATION: z.string().nullable(),
    PARK_DURATION: z.number().nullable(),
    VISIT_TIME: z.number().nullable(),
    ETC: z.string().nullable(),
})

export default { inGateLogSchema, outGateLogSchema }