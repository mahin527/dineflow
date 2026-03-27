import { Button } from "./ui/button"


function FilterPage() {
    return (
        <div className="md:w-70">
                <div className="flex items-center justify-between">
                    <h2>
                        Filter by cuisins
                    </h2>
                    <Button variant="link">Reset</Button>
                </div>
        </div>
    )
}

export default FilterPage