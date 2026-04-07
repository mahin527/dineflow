import { Search } from "lucide-react";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface SearchInputProps {
    initialValue?: string;
}

function SearchInputBlock({ initialValue = "" }: SearchInputProps) {
    const [searchText, setSearchText] = useState<string>(initialValue);
    const navigate = useNavigate();

    // If the URL changes (as someone presses the browser's back button), the input box will update
    useEffect(() => {
        setSearchText(initialValue);
    }, [initialValue]);

    const searchHandler = () => {
        if (searchText.trim()) {
            navigate(`/search/${searchText}`);
        }
    };

    return (
        <div className="flex w-full max-w-2xl items-center gap-2">
            <div className="relative flex-1">
                <InputWithIcon
                    name="search"
                    leftIcon={Search}
                    type="search"
                    placeholder="Search restaurant by name, city or country..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
                    className="w-full shadow-sm"
                />
            </div>
            <div>
                <Button type="submit" onClick={searchHandler} className="w-full px-5 py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                    Search
                </Button>
            </div>
        </div>
    );
}

export default SearchInputBlock;