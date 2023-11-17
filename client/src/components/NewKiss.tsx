import styled from "@emotion/styled";
import {useForm} from "react-hook-form";
import {Alert, Button, Card, InputLabel, MenuItem, NativeSelect, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";
import kiss from "../assets/kiss.png";

const KissImage = styled.img`
  width: 5em;
  margin: 1em;
`;

const NewKissLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  direction: rtl;
  padding: 2.5em 0;
  font-size: 2.5em;
`;

const CardStyled = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.5em;
  margin-top: 0.5em;
`;

const ToastMessageStyled = styled.div`
  display: flex;
  direction: rtl;
  width: 80%;
`;

export function NewKiss() {
    const [kissers, setKissers] = useState([]);
    const methods = useForm();
    const [open, setOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleClick = () => {
        setOpen(true);
    }
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const ParseKissers = function (data) {
        const kissers = data.kissers;
        let tmpKissers = [];
        kissers.map(kisser => {
            tmpKissers.push({
                name: kisser.data.label,
                id: kisser._id["$oid"]
            });
        });
        setKissers(tmpKissers);
    }

    useEffect(() => {
        fetch("http://3.91.244.167/api/get_all_kissers", {mode: 'no-cors'})
            .then((value) => value.json())
            .then(data => ParseKissers(data));
    }, []);

    const handleSubmit = function (data, e) {
        e.target.reset();
        fetch("http://3.91.244.167/api/new_kiss", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        setToastMessage(`${data.kisser_name} is added successfully!`);
        handleClick();


    }


    return (
        <NewKissLayout>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <ToastMessageStyled>
                    <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                        {toastMessage}
                    </Alert>
                </ToastMessageStyled>
            </Snackbar>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                הוסף נשיקה😘
                <CardStyled>
                    <InputLabel>מנשק ראשון</InputLabel>
                    <NativeSelect  {...methods.register("kisser1")}>
                        {kissers.map(kisser => {
                            return (
                                <option key={kisser.id} value={kisser.id}>{kisser.name}</option>
                            )
                        })}
                    </NativeSelect>

                    <InputLabel>מנשק שני</InputLabel>
                    <NativeSelect  {...methods.register("kisser2")}>
                        {kissers.map(kisser => {
                            return (
                                <option key={kisser.id} value={kisser.id}>{kisser.name}</option>
                            )
                        })}
                    </NativeSelect>
                    <Button variant={"contained"} type={"submit"}>הוסף</Button>
                </CardStyled>
            </form>
            <KissImage src={kiss} alt={"kiss"}/>

        </NewKissLayout>
    )
}