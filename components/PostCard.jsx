import * as React from "react";
import { red } from "@mui/material/colors";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardVerticalMenu from "./ui/CardVerticalMenu";
import Tag from "./ui/Tag";

export default function PostCard({ data }) {
  if (!data) {
    return null;
  }

  return (
    <Card
      sx={{
        backgroundColor: "var(--color-base-100)",
        height: "100%",
        border: {  xs: ".5px solid var(--color-base-300)", sm: "1.5px solid var(--color-base-300)" },
        borderRadius: { xs: 0, sm: 3 },
        boxShadow: "0",
        ":hover": { boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" },
        padding: "1px",
      }}
    >
      <CardHeader
        sx={{ padding: { xs: "10px", lg: "16px" } }}
        avatar={
          <Avatar sx={{ bgcolor: red[500], width: {xs: "25px", sm: "50px"}, height: {xs: "25px", sm: "50px"}, fontSize: {xs: "12px", sm: "16px"} }} aria-label="avatar">
            {data.user[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <CardVerticalMenu />
          </IconButton>
        }
        title={data.user}
        subheader="3 days ago"
        className="truncate"
      />
      <Link href={`/item-details/${data.id}`}>
        <CardMedia
          sx={{ height: { xs: '200px', md: '300px' }, padding: "5px", borderRadius: "15px", objectFit: "cover" }}
          component="img"
          image={data.images?.[0]?.url || ""}
          alt="Paella dish"
        />
      </Link>

      {/* DESCRIPTION SECTION */}


      <CardContent className="lg:block">
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.primary" }} className="line-clamp-1">
          {data.name}
        </Typography>

        <div className="flex items-start gap-.5 my-1 lg:my-2 ml-[-5px]">
          <LocationOnIcon sx={{ fontSize: "18px", color: "var(--color-primary-content)" }} />
          <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: "bold", color: "var(--color-base-content) !important" }}>{data.location.address}</Typography>
        </div>

        <Typography variant="body2" sx={{ color: "text.secondary" }} className="line-clamp-2">
          {data.description}
        </Typography>

        <div className="hidden lg:flex items-start mt-4 gap-2">
          <Typography sx={{ color: "text.secondary", fontSize: "14px" }}>
            Tags:
          </Typography>
          <Tag data={data.tags} />
        </div>
      </CardContent>

      <CardActions sx={{ padding: "0 8px" }} disableSpacing>
        {/* <Tooltip title="Share">
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Tooltip> */}
      </CardActions>
    </Card>
  );
}
