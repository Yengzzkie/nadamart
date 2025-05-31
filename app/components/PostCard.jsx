"use client";

import * as React from "react";
import { getTimeAgo } from "../utils/getTimeAgo";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardVerticalMenu from "./ui/CardVerticalMenu";
import DeleteModal from "./DeleteModal";
import FormDialog from "./FormDialog";

export default function PostCard({ data, fetchPosts }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openSendMessage, setOpenSendMessage] = React.useState(false);

  if (!data) {
    return null;
  }

  return (
    <Card
      sx={{
        backgroundColor: "var(--color-base-100)",
        height: "100%",
        border: {  xs: ".5px solid var(--color-base-300)", sm: "1px solid var(--color-base-300)" },
        borderRadius: { xs: 0, md: 3 },
        boxShadow: "0",
        ":hover": { boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" },
        padding: "1px",
      }}
    >
      <CardHeader
        sx={{ padding: { xs: "10px", lg: "16px" }}}
        avatar={
          <Avatar src={data.author.avatar} sx={{ width: {xs: "30px", sm: "50px"}, height: {xs: "30px", sm: "50px"}, fontSize: {xs: "12px", sm: "16px"}, mr: "0px !important" }} aria-label="avatar" />
        }
        action={<CardVerticalMenu data={data} isOpen={isOpen} setIsOpen={setIsOpen} setOpenSendMessage={setOpenSendMessage} />}
        title={data.author.name}
        subheader={`${getTimeAgo(data.createdAt)} ago`}
        className="truncate"
      />
      <Link href={`/item-details/${data.id}`}>
        <CardMedia
          sx={{ height: { xs: '250px', md: '300px' }, padding: "5px", borderRadius: "15px", objectFit: "cover" }}
          component="img"
          image={data.image[0] || ""}
          alt={data.title}
        />
      </Link>

      {/* DESCRIPTION SECTION */}
      <CardContent className="lg:block">
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.primary" }} className="line-clamp-1">
          {data.title}
        </Typography>

        <div className="flex items-start gap-.5 my-1 lg:my-2 ml-[-5px]">
          <LocationOnIcon sx={{ fontSize: "18px", color: "var(--color-primary-content)" }} />
          <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: "bold", color: "var(--color-base-content) !important" }}>{data.location.city}, {data.location.country}</Typography>
        </div>

        <Typography variant="body2" sx={{ color: "text.secondary" }} className="whitespace-pre-wrap line-clamp-2">{data.content}</Typography>
      </CardContent>

      <DeleteModal data={data} isOpen={isOpen} setIsOpen={setIsOpen} onDelete={fetchPosts} />

      {/* MODAL WITH FORM */}
      <FormDialog data={data} openSendMessage={openSendMessage} setOpenSendMessage={setOpenSendMessage} />
    </Card>
  );
}
