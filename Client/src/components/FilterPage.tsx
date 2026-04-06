import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "./ui/button"
import { useRestaurantStore } from "@/store/useRestaurantStore"


function FilterPage() {
    interface IFilterOptionsType {
        id: string,
        label: string
    }

    const filterOptions: IFilterOptionsType[] = [
        {
            id: 'burger',
            label: 'Burger'
        },
        {
            id: 'biryani',
            label: 'Biryani'
        },
        {
            id: 'lobster',
            label: 'lobster'
        }
    ]

    const { setAppliedFilter, appliedFilter, resetAppliedFilter } = useRestaurantStore()
    const appliedFilterHandler = (value: string) => {
        setAppliedFilter(value)
    }

    return (
        <div className="md:w-70">
            <div className="flex items-center justify-between pb-1">
                <h2 className="font-bold">
                    Filter by cuisins
                </h2>
                <Button variant="link" onClick={resetAppliedFilter}>Reset</Button>
            </div>
            {
                filterOptions.map((option) => (
                    <div key={option.id} className="flex items-center gap-2 py-1">
                        <Checkbox id={option.id} checked={appliedFilter.includes(option.label)} onClick={() => appliedFilterHandler(option.label)} />
                        <label htmlFor={option.id}>{option.label}</label>
                    </div>
                ))
            }
        </div>
    )
}

export default FilterPage