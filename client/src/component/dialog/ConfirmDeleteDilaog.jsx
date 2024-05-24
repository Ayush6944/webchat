import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

import React from 'react'

const ConfirmDeleteDilaog = ({open,handleClose,deleteHandler}) => {
  return (
    <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Confirm Delete ?</DialogTitle>
        <DialogContent>
            <DialogContentText>
              <p>Are you sure you want to delete this item?</p>
            </DialogContentText>
               </DialogContent>
               <DialogActions>
                <Button onClick={handleClose} sx={{
                    marginRight:1,
                    color:'red',
                    // backgroundColor:'red', 
                     border:'3px solid red',

                }} >Cancel</Button>
                <Button onClick={deleteHandler} color='primary'
                
                sx={{
                  border:'3px solid green',
                }}>
                  YES</Button>
               </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDilaog