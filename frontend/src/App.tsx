import './index.css'
import {Header} from "./components/Header/Header.tsx";
import {EmailInput} from "./components/EmailInput/EmailInput.tsx";
import {useState} from "react";
import {ToneSelector} from "./components/ToneSelector/ToneSelector.tsx";
import {ActionSelector} from "./components/ActionSelector/ActionSelector.tsx";
import {LanguageSelector} from "./components/LanguageSelector/LanguageSelector.tsx";
import {GenerateButton} from "./components/Buttons/Button.tsx";
import {Box, Button, TextField} from "@mui/material";
import { generateEmail } from "./services/api";

function App() {

    const [emailContent, setEmailContent] = useState("");
    const [tone,setTone]=useState("");
    const [loading,setLoading]=useState(false);
    const [copied,setCopied]=useState(false);
    const [error,setError]=useState("");
    const [generatedEmail,setGeneratedEmail]=useState("");
    const [language,setLanguage]=useState("");
    const [action,setAction]=useState("REPLY");

    let selector;
    if (action === "REPLY"){
        selector = (<ToneSelector tone={tone} setTone={setTone}/>);
    }
    else if (action === "TRANSLATE"){
        selector=( <LanguageSelector language={language} setLanguage={setLanguage} />);
    }

    async function handleGenerate(){
        try{
            setLoading(true);
            const  request={emailContent,action,tone,language};
            const   response =await generateEmail(request);
            setGeneratedEmail(response.generatedEmail);
            }
        catch (error)
        {
            console.error(error);
            setError("Failed to generate email");
        }finally {
            setLoading(false);
        }
    }





  return (
      <>
          <div className={"min-h-screen w-full bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 flex flex-col items-center"}>
            <Header/>
            <EmailInput   emailContent={emailContent}
                          setEmailContent={setEmailContent} />

              <div className="flex w-[50%] justify-between mt-2">
                  <ActionSelector action={action} setAction={setAction} />
                  {selector}
                  <GenerateButton emailContent={emailContent} loading={loading} setLoading={setLoading} onGenerate={handleGenerate} />
              </div>

              {generatedEmail &&(
                  <div className={"w-full flex flex-col  mt-2 items-center"}>
                      <Box sx={{mt:3 , width:'50%',bgcolor:"#ffffff"} }>
                          <TextField
                              fullWidth
                              multiline
                              rows={8}
                              variant="outlined"
                              value={generatedEmail||''}/>
                      </Box>
                      <Button sx={{mt:2}} variant={"contained"}
                        onClick={()=>{navigator.clipboard.writeText(generatedEmail);
                            setCopied(true)}}
                         >{copied ? "Copied" : "Copy"}</Button>
                  </div>

              )}

          </div>
      </>
  )
}

export default App

