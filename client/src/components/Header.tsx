import {AppBar, Box, MenuItem, Toolbar, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {faDna} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const ToolBarStyled = styled(Toolbar)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

`;

const TabsStyled = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
`;


export function AppHeader() {

    return (
        <Box>
            <AppBar sx={{backgroundColor: "#363062"}}>
                <ToolBarStyled>
                    <Typography variant="h6" component="div"
                                onClick={() => window.location.href = "/"
                                }>
                        DNA <FontAwesomeIcon bounce icon={faDna}/> HUB
                    </Typography>
                    <TabsStyled>
                        <MenuItem key={"add_kisser"} onClick={() => window.location.href = "/new_kisser"}>
                            <Typography textAlign="center">מנשק\ת חדש\ה</Typography>
                        </MenuItem>
                        <MenuItem key={"new_kiss"} onClick={() => window.location.href = "/new_kiss"}>
                            <Typography textAlign="center">נשיקה חדשה</Typography>
                        </MenuItem>
                        <MenuItem key={"rules"} onClick={() => window.location.href = "/rules"}>
                            <Typography textAlign="center">חוקי ה-DNA</Typography>
                        </MenuItem>
                    </TabsStyled>
                </ToolBarStyled>
            </AppBar>
        </Box>
    );
}