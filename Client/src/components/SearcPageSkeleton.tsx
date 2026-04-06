import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function SkeletonCard() {
    return (
        <Card className="w-full max-w-sm relative mx-auto pt-0 shadow-md rounded-xl overflow-hidden shadow-neutral-500 dark:shadow-neutral-700">
            <CardHeader>
                <Skeleton className="aspect-video w-full" />
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className=" h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
            </CardContent>
            <CardFooter>
                <Skeleton className="w-full px-5 py-5" />
            </CardFooter>
        </Card>
    )
}

export default SkeletonCard