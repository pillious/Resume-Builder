const Section: React.FC = () => {
    const content = {
        title: "Header #1",
        items: [
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor impedit iste ",
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor impedit iste sapiente reiciendi erum corrupti recusandae placeat corporis?",
        ],
    };

    return <div>
        <h1>{content.title}</h1>
        <ul>
            <li>{content.items[0]}</li>
            <li>{content.items[1]}</li>
        </ul>
    </div>;
};

export default Section;
