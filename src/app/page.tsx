import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  columns,
  ParkingHistory,
} from "./_components/custom-data-table/columns";
import CustomDataTable from "./_components/custom-data-table/custom-data-table";

async function getData(): Promise<ParkingHistory[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      carType: "방문차량",
      parkingType: "입차",
      carNumber: "12가1111",
      entryTime: "2023-03-10 09:01:12",
      exitTime: "2023-03-10 18:03:18",
      totalTime: "9시간 3분",
      parkingAreaName: "일동미라주",
      entryArea: "정문",
      exitArea: "정문",
      dong: "101",
      ho: "202",
      isBlack: false,
      note: null,
    },
    {
      id: "1",
      carType: "방문차량",
      parkingType: "입차",
      carNumber: "12가2222",
      entryTime: "2023-03-10 09:02:12",
      exitTime: "2023-03-10 18:02:18",
      totalTime: "9시간 1분",
      parkingAreaName: "우방아파트",
      entryArea: "정문",
      exitArea: "정문",
      dong: "101",
      ho: "202",
      isBlack: false,
      note: null,
    },
    {
      id: "1",
      carType: "방문차량",
      parkingType: "입차",
      carNumber: "12가3333",
      entryTime: "2023-03-10 09:03:12",
      exitTime: "2023-03-10 18:01:18",
      totalTime: "9시간 2분",
      parkingAreaName: "에스텍",
      entryArea: "정문",
      exitArea: "정문",
      dong: "101",
      ho: "202",
      isBlack: true,
      note: null,
    },
  ];
}

export default async function Home() {
  const data = await getData();
  return (
    <div>
      <div className="container mx-auto py-10 ">
        <Card className="p-8">
          <CardHeader className="p-0">
            <CardTitle className="text-lg">입출차 조회</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CustomDataTable columns={columns} data={data} />
          </CardContent>
          <CardFooter>
            <div className="flex-1 text-sm text-muted-foreground">
              row(s) selected.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
