import styled from "@emotion/styled";
import {useForm} from "react-hook-form";
import {Alert, Button, Card, MenuItem, Select, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";


const NewKissLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 2em 5em;
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
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    {toastMessage}
                </Alert>
            </Snackbar>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>

                <CardStyled>
                    <>מנשק ראשון</>
                    <Select  {...methods.register("kisser1")}>
                        {kissers.map(kisser => {
                            return (
                                <MenuItem key={kisser.id} value={[kisser.id]}>{kisser.name}</MenuItem>
                            )
                        })}
                    </Select>

                    <>מנשק שני</>
                    <Select  {...methods.register("kisser2")}>
                        {kissers.map(kisser => {
                            return (
                                <MenuItem key={kisser.id} value={[kisser.id]}>{kisser.name}</MenuItem>
                            )
                        })}
                    </Select>
                    <Button type={"submit"}>הוסף</Button>
                </CardStyled>
            </form>

        </NewKissLayout>
    )
}