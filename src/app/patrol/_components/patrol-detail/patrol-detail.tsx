import { ImageArea } from '@/app/_components/history-info-area/history-info-area'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Patrol } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

export const PatrolDetail = ({ data }: { data: Patrol }) => {
    return (
        <Card className='fixed bottom-10 w-[inherit] max-w-[inherit] h-[350px]'>
            <CardHeader>
                <CardTitle>
                    {data.carNumber} 순찰 정보
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <CardDescription>
                            이미지
                        </CardDescription>
                        <span className='text-sm'>{data.time}</span>
                    </div>
                    {data.img ?
                        <div className='relative rounded-sm overflow-hidden w-full h-full max-h-[150px] min-h-[150px]'>
                            <Image src={data.img} alt='이미지' fill />
                        </div>

                        : null}
                </div>
                <div className='flex flex-col gap-2'>
                    <CardDescription>
                        비고
                    </CardDescription>
                    <div className='text-sm'>
                        {data.note}
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}


export const I = () => {
    return (
        <div>patrol-detail</div>
    )
}

