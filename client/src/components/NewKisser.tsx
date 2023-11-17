/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import {Alert, Button, Card, Input, InputLabel, MenuItem, Select, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";


const NewKisserStyle = styled('div')`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  direction: rtl;
`;

const NewKisserCard = styled(Card)`
  padding: 0.5em;
  margin: 0.75em;
  display: flex;
  align-items: center;
  justify-content: center;
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
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    {toastMessage}
                </Alert>
            </Snackbar>
            הוסף מנשק\ת חדש לDNA!

            <NewKisserCard>
                <form onSubmit={
                    methods.handleSubmit(handleSubmit)
                }>
                    <InputLabel>שם המנשק\ת</InputLabel>
                    <Input {...methods.register("kisser_name", {required: true})} autoComplete={"off"}/>

                    <InputLabel>מין</InputLabel>
                    <Select {...methods.register("gender", {required: true})} >
                        <MenuItem value={"male"}>גבר</MenuItem>
                        <MenuItem value={"female"}>אישה</MenuItem>

                    </Select>

                    <InputLabel>עם מי התנשק?</InputLabel>
                    <Select  {...methods.register("kiss_with", {required: true})}>
                        {kissers.map(kisser => {
                            return (
                                <MenuItem key={kisser.id} value={[kisser.id]}>{kisser.name}</MenuItem>
                            )
                        })}
                    </Select><br/>
                    <Button type={"submit"}>הוסף</Button>
                </form>
            </NewKisserCard>

        </NewKisserStyle>

    )
}