import React, { useState } from "react";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import classes from "./Section.module.css";
import AddListItem from "./AddListItem";
import Input from "@mui/material/Input";
import MyInput from "../UI/Input";

interface IProps {
    id: number;
    title: string;
    items: string[];
    addItem: (idx: number) => void;
}

const Section: React.FC<IProps> = (props) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Card
            className={classes.Card}
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <h1 className={classes.title}>{props.title}</h1>
            {props.items.length > 0 && (
                <Card elevation={2}>
                    <List className={classes.List}>
                        {props.items.map((text, idx) => (
                            <ListItem key={idx} disablePadding>
                                <Input disableUnderline />
                            </ListItem>
                        ))}
                    </List>
                </Card>
            )}

            <div className={classes.hover_for_content}></div>
            <AddListItem
                addItem={() => props.addItem(props.id)}
                isHovering={isHovering}
            />

            <MyInput />
        </Card>
    );
};

export default Section;
