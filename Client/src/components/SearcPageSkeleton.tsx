import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function SkeletonCard() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <Skeleton className="aspect-video w-full" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className=" h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
            </CardContent>
        </Card>
    )
}

export default SkeletonCard