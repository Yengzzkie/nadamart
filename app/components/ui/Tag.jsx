import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function Tag({ data }) {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
      {data.map((tag, index) => (
        <Chip key={index} label={tag} size="small" />
      ))}
    </Stack>
  );
}
