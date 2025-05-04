"use client";
import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Button from '@mui/material/Button';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex items-center gap-2 border-y-[1px] border-zinc-300 w-full px-4">
      <div className="relative flex bg-[#f0f1f1] w-full px-4 rounded-sm my-4">
        <MagnifyingGlassIcon className="w-6 bg-[var(--primary-light)] pl-2" />
        <input
          type="text"
          className="w-full py-2 px-2 bg-[var(--primary-light)] outline-none"
          placeholder="Search for items, keywords, category..."
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <XMarkIcon
          className={`${
            searchValue === "" ? "invisible" : "block"
          } absolute w-5 right-1 top-1/2 -translate-y-1/2 cursor-pointer`}
          onClick={() => setSearchValue("")}
        />
      </div>
      <Button variant="contained">Search</Button>
    </div>
  );
};

export default SearchBar;
