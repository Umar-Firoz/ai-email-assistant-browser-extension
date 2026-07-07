
import {FormControl, Select, MenuItem, InputLabel} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

interface ToneSelectorProps {
    tone: string;
    setTone: React.Dispatch<React.SetStateAction<string>>;
}

export function ToneSelector({ tone, setTone }: ToneSelectorProps) {

    const handleChange = (event: SelectChangeEvent) => {
        setTone(event.target.value);
    };

    return (
        <FormControl sx={{ width: 220, mt: 2,bgcolor:"#ffffff" }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
                value={tone}
                label="Tone"
                onChange={handleChange}
            >
                <MenuItem value="Professional">Professional</MenuItem>
                <MenuItem value="Friendly">Friendly</MenuItem>
                <MenuItem value="Formal">Formal</MenuItem>
                <MenuItem value="Casual">Casual</MenuItem>
                <MenuItem value="Confident">Confident</MenuItem>

            </Select>
        </FormControl>
    );
}

