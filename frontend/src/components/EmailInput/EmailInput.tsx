import {Box,  TextField} from "@mui/material";
import * as React from "react";

export interface EmailInputProps{
    emailContent:string;
    setEmailContent:React.Dispatch<React.SetStateAction<string>>;
}

export function EmailInput({emailContent,setEmailContent}: EmailInputProps){
    return (<>
        <Box sx={{color:"#312c85",bgcolor:"#ffffff",mt:4,width:"50%",borderRadius:2, "& .MuiOutlinedInput-root": {borderRadius: 2
            }}}>
            <TextField
                fullWidth
                multiline
                rows={8}
                variant="outlined"
                label="Original Email Content"
                value={emailContent || ''}
                onChange={(e) => setEmailContent(e.target.value)}
            />
        </Box>
        </>)
}