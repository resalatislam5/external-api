import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// This modal  only use Home page
const Modal = ({ open, handleClose, handleSubmit, children, title, css }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={css} id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              handleSubmit(), handleClose();
            }}
            autoFocus
          >
            Add Playlist
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modal;
