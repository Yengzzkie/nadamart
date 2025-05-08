import * as React from "react";
import { red } from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tooltip from "@mui/material/Tooltip";

export default function PostCard({ data }) {
  if (!data) {
    return null;
  }

  return (
    <Card
      sx={{
        height: "100%",
        border: "0.1px solid rgba(0, 0, 0, 0.1)",
        maxWidth: 345,
        boxShadow: "none",
        ":hover": { boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" },
        cursor: "pointer",
        padding: "1px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], width: {xs: "25px", sm: "50px"}, height: {xs: "25px", sm: "50px"}, fontSize: {xs: "12px", sm: "16px"} }} aria-label="recipe">
            {data.user[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.user}
        subheader="3 days ago"
        className="truncate"
      />
      <CardMedia
        sx={{ height: { xs: '150px', md: '300px' }, padding: "5px", borderRadius: "15px", objectFit: "cover" }}
        component="img"
        // height="190"
        image={data.images?.[0]?.url || ""}
        alt="Paella dish"
      />
      <CardContent className="hidden lg:block">
        <Typography variant="body2" sx={{ color: "text.secondary" }} className="line-clamp-2">
          {data.description}
        </Typography>

        <div className="flex items-center mt-2 gap-2">
          <Typography sx={{ color: "text.secondary", fontSize: "14px" }}>
            Tags:
          </Typography>
          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap">
              {data.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardActions disableSpacing>
        <Tooltip title="Cast interest">
          <IconButton aria-label="add to favorites">
            <CrisisAlertIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share">
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
