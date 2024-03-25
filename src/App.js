import Index from "./components/Index";
import DocsIndex from "./components/docs/Content/Index";
import DocsCodeRecovery from "./components/docs/Content/getting-started/code-recovery";
import DocsInstallingNodeJsModules from "./components/docs/Content/getting-started/installing-node-js-modules";
import DocsConfigJson from "./components/docs/Content/getting-started/config-json";
import DocsLaunch from "./components/docs/Content/getting-started/launch";

import { Route, Routes } from "react-router-dom";

function App() {

    return (
        <Routes>
            <Route index element={<Index />} />
            <Route path="/docs" exact element={<DocsIndex/>} />
            <Route path="/docs/gettings-started/get-code" element={<DocsCodeRecovery/>} />
            <Route path="/docs/gettings-started/download-modules" element={<DocsInstallingNodeJsModules/>} />
            <Route path="/docs/gettings-started/config.json" element={<DocsConfigJson/>} />
            <Route path="/docs/gettings-started/launch" element={<DocsLaunch/>} />
        </Routes>
    );
}

export default App;