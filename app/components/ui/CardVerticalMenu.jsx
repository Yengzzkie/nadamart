"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { ChatBubble } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from "@mui/icons-material/MoreVert";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function CardVerticalMenu({ data, isOpen, setIsOpen }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const session = useSession();
  const isAuthor = session?.data?.user?.id === data.authorId;
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {isAuthor && (
          <MenuItem onClick={handleClose} disableRipple>
            <EditIcon className="!text-[var(--color-primary-content)]" />
            Edit
          </MenuItem>
        )}
        <MenuItem onClick={handleClose} disableRipple>
          <ChatBubble className="!text-[var(--color-primary-content)]" />
          Message Owner
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <FavoriteIcon className="!text-[var(--color-primary-content)]" />
          Save to Favorites
        </MenuItem>
        {isAuthor && (
          <div>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={openModal} disableRipple>
              <DeleteIcon className="!text-[var(--color-primary-content)]" />
              Delete Post
            </MenuItem>
          </div>
        )}
      </StyledMenu>
    </div>
  );
}
