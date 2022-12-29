import List from "@mui/material/List";
import Item from "./Item";
import { Reorder } from "framer-motion";
import { guid, IItem } from "../../../custom2";

interface IProps {
    items: IItem[];
    experienceId: guid;
    sectionId: guid;
    updateItemContent: (
        sectionId: guid,
        experienceId: guid,
        itemId: guid,
        content: string
    ) => void;
    updateItemOrder: (
        sectionId: guid,
        experienceId: guid,
        order: guid[]
    ) => void;
    deleteItem: (sectionId: guid, experienceId: guid, itemId: guid) => void;
}

const ExperienceList: React.FC<IProps> = (props) => {
    return (
        <List sx={{ p: "1rem" }}>
            <Reorder.Group
                axis="y"
                values={props.items}
                style={{ padding: 0 }}
                onReorder={(list: IItem[]) => {
                    const order: guid[] = list.map((item) => item.id);
                    props.updateItemOrder(props.sectionId, props.experienceId, order);
                }}
            >
                {props.items.map((item) => (
                    <Reorder.Item
                        key={item.id}
                        value={item}
                        style={{ listStyle: "none" }}
                    >
                        <Item
                            key={item.id}
                            item={item}
                            sectionId={props.sectionId}
                            experienceId={props.experienceId}
                            updateItemContent={props.updateItemContent}
                            deleteItem={props.deleteItem}
                        />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </List>
    );
};

export default ExperienceList;
