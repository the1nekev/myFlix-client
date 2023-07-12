import {createRoot} from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import { Container } from 'react-bootstrap';
import { store } from "./redux/store";
import { Provider } from "react-redux";

//Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import { Container } from 'react-bootstrap';

//main component (will eventually use all the others)
const MyFlixApplication = () => {
    return (
    <Provider store={store}>
        <Container>
            <MainView />
        </Container>
    </Provider>
    )
};


//Finds the root of your app 
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells react to render your app in the root DOM element
root.render(<MyFlixApplication />); 

//167OLdP5BUfLZGxP
//K39eKYhPMV9DDWhJ