import {AppBar, Box, Divider, Drawer, IconButton, MenuItem, Toolbar, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {faBars, faDna} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";


const ToolBarStyled = styled(Toolbar)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TabsStyled = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
  font-size: 10px;
`;

const DrawerStyled = styled.div`
  padding: 1.5em;
  background-color: #dfdfe8;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

`;

function Tabs() {
    return (
        <>
            <MenuItem key={"add_kisser"} onClick={() => window.location.href = "/new_kisser"}>
                <span>מנשק\ת חדש\ה</span>
            </MenuItem>
            <MenuItem key={"new_kiss"} onClick={() => window.location.href = "/new_kiss"}>
                <Typography textAlign="center">נשיקה חדשה</Typography>
            </MenuItem>
            <MenuItem key={"rules"} onClick={() => window.location.href = "/rules"}>
                <Typography textAlign="center">חוקי הדנ"א</Typography>
            </MenuItem>

        </>

    )
}


export function AppHeader() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <Box>
            <AppBar sx={{backgroundColor: "#363062"}}>
                <ToolBarStyled>
                    <Typography variant="h6" component="div"
                                onClick={() => window.location.href = "/"
                                }>
                        DNA <FontAwesomeIcon bounce icon={faDna}/> HUB
                    </Typography>
                    {window.mobileCheck() ? <>
                            <IconButton onClick={() => setDrawerOpen(true)}>
                                <FontAwesomeIcon icon={faBars} color={"white"}/>
                            </IconButton>
                            <Drawer
                                open={drawerOpen}
                                onClose={() => setDrawerOpen(false)}
                                variant={"temporary"}
                                anchor={"right"}
                            >
                                <DrawerStyled>
                                    <Typography variant="h6" component="div"
                                                onClick={() => window.location.href = "/"
                                                }>
                                        DNA <FontAwesomeIcon icon={faDna}/> HUB
                                    </Typography>
                                    <Divider color={"black"}/>
                                    <Tabs/>
                                </DrawerStyled>
                            </Drawer>
                        </> :
                        <>

                            <TabsStyled>

                                <Tabs/>
                            </TabsStyled>
                        </>}
                </ToolBarStyled>
            </AppBar>
        </Box>
    );
}