import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import classes from "./TabList.module.css";

const TabList: React.FC = () => {
    const [active, setActive] = useState<number>(0);

    return (
        <Tabs value={active} onChange={(e, v) => setActive(v)}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
        </Tabs>
    );
};

export default TabList;
