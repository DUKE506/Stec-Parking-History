import XLSX from "xlsx-js-style";
import { Patrol } from "@prisma/client";
import { ListBaseType, ListLoading, ListModel } from "@/types/list-type";
import dayjs from "dayjs";
export const onPatrolExportData = async ({
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

    const dataToExport = (datas as Patrol[]).map((data: Patrol) => {
      return {
        순찰시간: dayjs(data.time).format("YYYY-MM-DD HH:mm:ss"),
        순찰상태: data.codeName,
        차량번호: data.carNumber,
        담당자: data.userName,
        비고: data.note,
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
    const headerCells = ["A1", "B1", "C1", "D1", "E1"];
    headerCells.forEach((cellAddress) => {
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = headerStyle;
      }
    });

    // 열 너비 설정 (선택 사항)
    const columnWidths = [
      { wch: 10 }, // 순찰시간
      { wch: 10 }, // 순찰상태
      { wch: 15 }, // 차량번호
      { wch: 20 }, // 담당자
      { wch: 20 }, // 비고
    ];
    worksheet["!cols"] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, `${title}.xlsx`);
    console.log(`Exported data to ${title}.xlsx`);
  } catch (err: any) {
    console.log("#==================Export Error", err.message);
  }
};
