"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Circle } from "lucide-react"


export type ParkingHistory = {
    id : string
    carType : string
    parkingType : string
    carNumber : string
    entryTime : string
    exitTime : string | null
    totalTime : string | null
    parkingAreaName : string | null
    entryArea : string
    exitArea : string | null
    dong : string | null
    ho : string | null
    isBlack : boolean
    note : string | null 
}

export const columns: ColumnDef<ParkingHistory>[] = [
    {
        accessorKey : 'carType',
        header : '입출유형'
    },
    {
        accessorKey: 'parkingType',
        header: '차량상태',
    },
    {
        accessorKey: 'carNumber',
        // header: '차량번호',
        header : ({column}) => {
            return (
                <Button
                variant="ghost"
                onClick={() =>{ column.toggleSorting(column.getIsSorted() === "asc")}}
                >
                    차량번호
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: 'entryTime',
        header : ({column}) => {
            return (
                <Button
                variant="ghost"
                onClick={() =>{ column.toggleSorting(column.getIsSorted() === "asc")}}
                >
                    입차일시
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: 'exitTime',
        header : ({column}) => {
            return (
                <Button
                variant="ghost"
                onClick={() =>{ column.toggleSorting(column.getIsSorted() === "asc")}}
                >
                    출차일시
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: 'totalTime',
        header : ({column}) => {
            return (
                <Button
                variant="ghost"
                onClick={() =>{ column.toggleSorting(column.getIsSorted() === "asc")}}
                >
                    주차시간
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: 'parkingAreaName',
        header: '주차장명',
    },
    {
        accessorKey: 'entryArea',
        header: '입차초소',
    },
    {
        accessorKey: 'exitArea',
        header: '출차초소',
    },
    {
        accessorKey: 'dong',
        header : ({column}) => {
            return (
                <Button
                variant="ghost"
                onClick={() =>{ column.toggleSorting(column.getIsSorted() === "asc")}}
                >
                    동
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: 'ho',
        header : ({column}) => {
            return (
                <Button
                variant="ghost"
                onClick={() =>{ column.toggleSorting(column.getIsSorted() === "asc")}}
                >
                    호
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: 'isBlack',
        header: '블랙',
        cell: ({row}) => {
            const value = row.getValue('isBlack')
            const returnValue = value ? <Circle color="red" size={20}/> : null;
            return <div>{returnValue}</div>;
        },
    },
    {
        accessorKey: 'note',
        header: '비고',
    },
    
]