import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login } from "./components/Login";
import Layout from "./Layout";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                {/* <Header /> */}
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Layout>
                        <Route path="/home" component={Home} />
                    </Layout>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
