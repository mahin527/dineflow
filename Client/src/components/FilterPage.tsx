import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "./ui/button"


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
            id: 'thali',
            label: 'Thali'
        }, {
            id: 'biryani',
            label: 'Biryani'
        },
        {
            id: 'momos',
            label: 'Momos'
        }
    ]


    const appliedFilderHandler = (value:string) => {
        console.log(value)
    }

    return (
        <div className="md:w-70">
            <div className="flex items-center justify-between">
                <h2>
                    Filter by cuisins
                </h2>
                <Button variant="link">Reset</Button>
            </div>
            {
                filterOptions.map((option) => (
                    <div key={option.id} className="flex items-center gap-2 py-1">
                            <Checkbox id={option.id} onClick={() => appliedFilderHandler(option.label)} />
                            <label htmlFor={option.id}>{option.label}</label>
                    </div>
                ))
            }
        </div>
    )
}

export default FilterPage