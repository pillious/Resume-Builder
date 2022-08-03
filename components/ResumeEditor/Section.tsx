import React from "react";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import classes from "./Section.module.css";
import AddListItem from "./AddListItem";
import Input from "@mui/material/Input";
// import MyInput from "../UI/Input";

interface IProps {
    id: number;
    title: string;
    items: string[];
    addItem: (idx: number) => void;
}

const Section: React.FC<IProps> = (props) => {
    return (
        <Card elevation={0} className={classes.Card}>
            <div className={classes.top}>
                <h1 className={classes.title}>{props.title}</h1>
                <AddListItem addItem={() => props.addItem(props.id)} />
            </div>
            {props.items.length > 0 && (
                <Card elevation={2}>
                    <List className={classes.List}>
                        {props.items.map((text, idx) => (
                            <div
                                key={idx}
                                className={classes.list_item_wrapper}
                            >
                                <ListItemIcon
                                    sx={{ color: "#000", minWidth: "unset" }}
                                >
                                    &bull;
                                </ListItemIcon>
                                <ListItem
                                    sx={[
                                        {
                                            "&:hover": {
                                                backgroundColor: "#eee",
                                            },
                                        },
                                    ]}
                                    disablePadding
                                >
                                    <Input
                                        sx={{ width: "100%" }}
                                        placeholder="Type here. . ."
                                        multiline
                                        disableUnderline
                                    />
                                </ListItem>
                            </div>
                        ))}
                    </List>
                </Card>
            )}

            {/* <MyInput /> */}
        </Card>
    );
};

export default Section;
