'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const dropDownSection = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
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

const inStyle1 = {
  appearance: "none",
  height: "0px",
  margin: "0px",
}

const inStyle2 = {
  appearance: "none",
  borderRadius: "0px 0px 0px 0px",
  color: "black",
  height: "1em",
  width: "2em",
  margin: "0px",

}

const inStyle3 = {
  appearance: "none",
  borderRadius: "0px 5px 5px 0px",
  color: "black",
  height: "1em",
  width: "2em",
  margin: "0px",
}
export default function Dropdown({time}) {
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
      <label htmlFor="short_term" className="cb cb1">4 Weeks
      <input  checked={time=="short_term"} type="checkbox" onChange={onSelect} id="short_term" value="short_term" style={inStyle1} className="i1" />
      </label>
      <label htmlFor="medium_term" className="cb cb2">6 Months
      <input checked={time=="medium_term"} type="checkbox" onChange={onSelect} id="medium_term" value="medium_term" style={inStyle1} className="i2"/>
      </label>
      <label htmlFor="long_term" className="cb cb3">Lifetime
      <input checked={time=="long_term"} type="checkbox" onChange={onSelect} id="long_term" value="long_term" style={inStyle1} className="i3" />
      </label>

      <style jsx>{`
      .cb{
        margin: 0px;
        font-family: Archivo Black;
        font-weight: normal;
        font-size: 13px;
        width: 75px;
        display: grid;
        grid-template-rows: 100%;
        align-items: center;
        justify-content: center;
      }
      .cb:hover {
        cursor: pointer;
        scale: 1.05;
      }
      .cb1 {
        background-color: ${time=="short_term" ? "white" : "black"};
        color: ${time=="short_term" ? "black" : "white"};
        border-radius: 5px 0px 0px 5px;
        border: 1px solid ${time=="short_term" ? "white" : "black"};
        border-width: 1px 0px 1px 1px;
        height: ${time=="short_term" ? "45px" : "40px"};
      }
      .cb2  {
        background-color: ${time=="medium_term" ? "white" : "black"};
        color: ${time=="medium_term" ? "black" : "white"};
        border-radius: 0px 0px 0px 0px;
        border: 1px solid ${time=="medium_term" ? "white" : "black"};
        border-width: 1px 0px 1px 0px;
        height: ${time=="medium_term" ? "45px" : "40px"};
      }
      .cb3 {
        background-color: ${time=="long_term" ? "white" : "black"};
        color: ${time=="long_term" ? "black" : "white"};
        border-radius: 0px 5px 5px 0px;
        border: 1px solid ${time=="long_term" ? "white" : "black"};
        border-width: 1px 1px 1px 0px;
        height: ${time=="long_term" ? "45px" : "40px"};
      }
      
      `}</style>
  
    </section>
  )
}