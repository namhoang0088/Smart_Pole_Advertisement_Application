import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import AdManage from "./scenes/ad_manage";
import SmartPoleManage from "./scenes/smart_pole_manage";
import LiveAd from "./scenes/live";
import VideoManage from "./scenes/video_manage";
import LogManage from "./scenes/log";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AirQuality from "./scenes/air_quality";
import ReactDOM from "react-dom";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ad_manage" element={<AdManage />} />
              <Route path="/smart_pole_manage" element={<SmartPoleManage />} />
              <Route path="/live_ad" element={<LiveAd />} />
              <Route path="/video" element={<VideoManage />} />
              <Route path="/log" element={<LogManage/>}/>
              <Route path="/air" element={<AirQuality/>}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
