import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function Tag({ data }) {
  return (
    <Stack direction="row" spacing={.75} sx={{ flexWrap: "wrap", rowGap: "1px" }}>
      {data.map((tag, index) => (
        <Chip key={index} label={tag} color="primary" size="small" sx={{ fontSize: "10px", p: "0px !important" }} />
      ))}
    </Stack>
  );
}
