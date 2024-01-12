'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const dropDownSection = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
  
export default function Dropdown(){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const onSelect = (event) => {
        const current = new URLSearchParams(searchParams);
    
        const value = event.target.value.trim();
    
        if (!value) {
          current.delete("timeRange");
        } else {
          current.set("timeRange", event.target.value);
        }
    
        const search = current.toString();
        const query = search ? `?${search}` : "";
    
        router.push(`${pathname}${query}`);
    };

    return(
        <section style={dropDownSection}>
        <text>Time Range:</text>
        <select onChange={onSelect}>
            <option value="short_term">4 Weeks</option>
            <option value="medium_term">6 Months</option>
            <option value="long_term">Lifetime</option>
        </select>
    </section>
    )
}