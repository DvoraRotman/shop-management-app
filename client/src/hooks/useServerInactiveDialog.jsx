// React
import { useState } from 'react';

// MUI components
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box, Typography } from '@mui/material';

// Redux
import { useDispatch } from 'react-redux';
import { setIsmoke } from '../store';

const useServerInactiveDialog = (onConfirm) => {
  const dispatch = useDispatch();

  const [dialogState, setDialogState] = useState({ open: false });

  const openDialog = (title = 'השרת אינו פעיל') => {
    setDialogState({ open: true, title });
  };

  const closeDialog = () => {
    setDialogState((prevState) => ({ ...prevState, open: false }));
  };
  const handleConfirm = () => {
    dispatch(setIsmoke(true));
    closeDialog();
    // When user confirms, we set ismoke to true and immediately
    //  call the callback (onConfirm) to fetch categories again, this time with ismoke enabled
    if (typeof onConfirm === 'function') {
      onConfirm(true);
    }
  };

  const dialog = (
    <Dialog
      open={dialogState.open}
      onClose={dialogState.onClose || closeDialog}
      disableEnforceFocus // Prevent focus enforcement conflicts
      disableRestoreFocus // Prevent focus restoration conflicts
    >
      <Box sx={{ minWidth: 400, minHeight: 200 }}>
        <DialogTitle>
          <Typography  sx={{ fontSize: '1.5rem' }}>
            {dialogState.title}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ fontSize: '1.3rem' }}>
            האם להמשיך להשתמש בתוכנה   ?

            <br />
            <b>שים/י לב:</b> הנתונים לא ישמרו בשרת.
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary" sx={{ fontSize: '1.1rem' }}>
            ביטול
          </Button>
          <Button onClick={handleConfirm} sx={{ fontSize: '1.1rem' }}>
            אישור
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );

  return { dialog, openDialog, closeDialog };
};

export default useServerInactiveDialog;