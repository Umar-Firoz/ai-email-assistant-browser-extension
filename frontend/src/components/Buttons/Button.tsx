import {Button,CircularProgress} from "@mui/material";
interface GenerateButtonProps {
    emailContent: string;
    loading: boolean;
    onGenerate:()=>void
}
export function GenerateButton({emailContent, loading,onGenerate}: GenerateButtonProps) {
        return(
            <>
                <Button variant={'contained'} disabled={!emailContent||loading} sx={{width:220,height:56, mt:2}} onClick={onGenerate}>
                    {loading ? <CircularProgress size={24} color="inherit"/> : "Generate" }
                </Button>
            </>
        )
}