/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import {Alert, Button, Card, Input, InputLabel, MenuItem, NativeSelect, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import kiss from '../assets/kiss.png';


const KissImage = styled.img`
  width: 5em;
  margin: 1em;
`;

const NewKisserStyle = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  direction: rtl;
  padding: 2.5em 0;
  font-size: 2.5em;
`;

const NewKisserCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  margin-top: 0.5em;
`;

const ButtonStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.5em;
`;

const ToastMessageStyled = styled.div`
  display: flex;
  direction: rtl;
  width: 80%;
`;


export function NewKisser() {
    const [kissers, setKissers] = useState([]);
    const methods = useForm();
    const [open, setOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleClick = () => {
        setOpen(true);
    };

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
    }, [])

    const handleSubmit = function (data, e) {
        e.target.reset();
        fetch("http://3.91.244.167/api/new_kisser", {
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
        <NewKisserStyle>
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
            מנשק חדש!😘

            <NewKisserCard>
                <form onSubmit={
                    methods.handleSubmit(handleSubmit)
                }>
                    <InputLabel>שם המנשק\ת</InputLabel>
                    <Input {...methods.register("kisser_name", {required: true})} autoComplete={"off"}/>

                    <InputLabel>מין</InputLabel>
                    <NativeSelect {...methods.register("gender", {required: true})} >
                        <option value={"male"}>גבר</option>
                        <option value={"female"}>אישה</option>

                    </NativeSelect>

                    <InputLabel>עם מי התנשק?</InputLabel>
                    <NativeSelect  {...methods.register("kiss_with", {required: true})}>
                        {kissers.map(kisser => {
                            return (
                                <option key={kisser.id} value={kisser.id}>{kisser.name}</option>
                            )
                        })}
                    </NativeSelect><br/>
                    <ButtonStyled><Button variant={"contained"} type={"submit"}>הוסף</Button></ButtonStyled>
                </form>
            </NewKisserCard>
            <KissImage src={kiss} alt={"kiss"}/>

        </NewKisserStyle>

    )
}