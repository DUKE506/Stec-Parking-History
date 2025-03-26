import XLSX from "xlsx-js-style";
import { History } from "@/types/history/histroy";
import { ListBaseType, ListLoading } from "@/types/list-type";
import dayjs from "dayjs";
export const onHistoryExportData = async ({
  title,
  worksheetname,
  datas,
}: {
  title: string;
  worksheetname: string;
  datas: ListBaseType;
}) => {
  try {
    if (datas === ListLoading) {
      return console.log("데이터 로딩중");
    }

    const dataToExport = (datas as History[]).map((data: History) => {
      return {
        차량구분: data.ioTicketTp, // 세미콜론(;) 대신 쉼표(,) 사용
        차량상태: data.ioStatusTpNm,
        차량번호: data.carNum,
        입차일시: dayjs(data.inDtm).format("YYYY-MM-DD HH:mm:ss"),
        출차일시:
          data.outDtm == null ? "" : dayjs().format("YYYY-MM-DD HH:mm:ss"),
        주차시간: data.parkingDuration,
        주차장명: data.pId,
        입차초소: data.inGateNm,
        출차초소: data.outGateNm,
        동: data.dong,
        호: data.ho,
        블랙리스트: data.isBlacklist,
        비고: data.memo,
      };
    });

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX?.utils.json_to_sheet(dataToExport);

    // 헤더 스타일 적용
    const headerStyle = {
      font: { color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "f2f2f2" } },
      alignment: { horizontal: "center" },
    };

    // 헤더 행(첫 번째 행)에 스타일 적용
    const headerCells = [
      "A1",
      "B1",
      "C1",
      "D1",
      "E1",
      "F1",
      "G1",
      "H1",
      "I1",
      "J1",
      "K1",
      "L1",
      "M1",
    ];
    headerCells.forEach((cellAddress) => {
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = headerStyle;
      }
    });

    // 열 너비 설정 (선택 사항)
    const columnWidths = [
      { wch: 10 }, // 차량구분
      { wch: 10 }, // 차량상태
      { wch: 15 }, // 차량번호
      { wch: 20 }, // 입차일시
      { wch: 20 }, // 출차일시
      { wch: 12 }, // 주차시간
      { wch: 15 }, // 주차장명
      { wch: 15 }, // 입차초소
      { wch: 15 }, // 출차초소
      { wch: 8 }, // 동
      { wch: 8 }, // 호
      { wch: 10 }, // 블랙리스트
      { wch: 20 }, // 비고
    ];
    worksheet["!cols"] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, `${title}.xlsx`);
    // console.log(`Exported data to ${title}.xlsx`);
    return true;
  } catch (err: any) {
    return false;
    // console.log("#==================Export Error", err.message);
  }
};
