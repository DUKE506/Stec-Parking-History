import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  columns,
  ParkingHistory,
} from "./_components/custom-data-table/columns";
import CustomDataTable from "./_components/custom-data-table/custom-data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="flex flex-col w-full gap-10">
      <div className="container max-w-full mx-10">
        <Card>
          <CardHeader>
            <CardTitle>검색 조건</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div className="flex flex-col gap-2">
              <CardDescription>입출유형</CardDescription>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <CardDescription>입출유형</CardDescription>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <CardDescription>입출유형</CardDescription>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <CustomDataTable columns={columns} data={data} />
    </div>
  );
}
