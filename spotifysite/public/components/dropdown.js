'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const dropDownSection = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  margin: "5px",
}

const textStyle = {
  fontSize: "15px",
  fontFamily: "Archivo Black",
  fontWeight: "normal",
  color: "white",
}

const dropdownStyle = {
  fontFamily: "Archivo Black",
  fontWeight: "lighter",
  color: "black",
}

export default function Dropdown() {
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

  return (
    <section style={dropDownSection}>
      <text style={textStyle}>Time Range:</text>
      <select style={dropdownStyle} onChange={onSelect}>
        <option style={dropdownStyle} value="short_term">4 Weeks</option>
        <option style={dropdownStyle} value="medium_term">6 Months</option>
        <option style={dropdownStyle} value="long_term">Lifetime</option>
      </select>
    </section>
  )
}