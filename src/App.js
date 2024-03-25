import Index from "./components/Index";
import DocsIndex from "./components/docs/Content/Index";
import CodeRecovery from "./components/docs/Content/getting-started/code-recovery";
import InstallingNodeJsModules from "./components/docs/Content/getting-started/installing-node-js-modules";
import ConfigJson from "./components/docs/Content/getting-started/config-json";
import Launch from "./components/docs/Content/getting-started/launch";

import { Route, Routes } from "react-router-dom";

function App() {

    return (
        <Routes>
            <Route index element={<Index />} />
            <Route path="/docs" exact element={<DocsIndex/>} />
            <Route path="/docs/gettings-started/get-code" element={<CodeRecovery/>} />
            <Route path="/docs/gettings-started/download-modules" element={<InstallingNodeJsModules/>} />
            <Route path="/docs/gettings-started/config.json" element={<ConfigJson/>} />
            <Route path="/docs/gettings-started/launch" element={<Launch/>} />
        </Routes>
    );
}

export default App;