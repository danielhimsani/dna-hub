import './App.css'
import {AppHeader} from "./components/Header";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {DnaPage} from "./components/DnaPage";
import styled from "@emotion/styled";
import {NewKisser} from "./components/NewKisser";
import {NewKiss} from "./components/NewKiss";
import {RulesPages} from "./components/RulesPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <DnaPage/>
    },
    {
        path: "/new_kisser",
        element: <NewKisser/>
    },
    {
        path: "/new_kiss",
        element: <NewKiss/>
    },
    {
        path: "/rules",
        element: <RulesPages/>
    }
])


const AppStyle = styled('div')`
  width: 100%;
  height: 100%;
  background-color: #242424;
  display: flex;
  margin: 2em 0;
`;


function App() {
    return (
        <AppStyle>
            <AppHeader router={router}/>
            <RouterProvider router={router}>

            </RouterProvider>
        </AppStyle>
    )
}

export default App
