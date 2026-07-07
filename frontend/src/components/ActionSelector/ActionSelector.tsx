import {FormControl, Select, MenuItem, InputLabel} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

interface ActionSelectorProps {
    action:string;
    setAction:React.Dispatch<React.SetStateAction<string>>;
}

export function ActionSelector({action,setAction}: ActionSelectorProps){
    const handleChange=(event:SelectChangeEvent)=>{
        setAction(event.target.value);
    }
    return(
        <>
            <FormControl sx={{ width: 220, mt: 2,bgcolor:"#ffffff" }}>
                <InputLabel>Action</InputLabel>
                <Select value={action} label="Action" onChange={handleChange}>
                    <MenuItem value="REPLY">Generate Reply</MenuItem>
                    <MenuItem value="SUMMARIZE">Summarize</MenuItem>
                    <MenuItem value="GRAMMAR">Grammar Correction</MenuItem>
                    <MenuItem value="TRANSLATE">Translate</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}
