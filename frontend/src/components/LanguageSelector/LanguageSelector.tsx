import * as React from "react";
import {FormControl, InputLabel, MenuItem, Select,} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { languages } from "../constants/Languages";

export interface LanguageSelectorProps {
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export function LanguageSelector({language, setLanguage,}: LanguageSelectorProps) {

    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value);
    };

    return (
        <FormControl sx={{ width: 220, mt: 2,bgcolor:"#ffffff" }}>
            <InputLabel>Language</InputLabel>
            <Select
                value={language}
                label="Language"
                onChange={handleChange}
            >
                {languages.map((lang) => (
                    <MenuItem key={lang} value={lang}>
                        {lang}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}