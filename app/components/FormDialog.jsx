import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ data, openSendMessage, setOpenSendMessage }) {
  const [message, setMessage] = React.useState("");

  const handleClose = () => {
    setOpenSendMessage(false);
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message.trim()) {
      return;
    }

    console.log("Message sent to:", data?.author?.name);
    console.log("Message:", message);

    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog open={openSendMessage} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Send Message</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              You're about to send a message to <strong>{data?.author?.name}</strong>. Please type your message below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="message"
              label="Your Message"
              type="text"
              fullWidth
              multiline
              minRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! Is this item still available?"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ background: "var(--color-primary-content)", "&:hover": { background: "var(--color-primary)", color: "var(--color-primary-content)" } }}>
              Send
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
