export default function Forum() {
    const forumArr = [
        { title: "title1", description: "description one" },
        { title: "title1", description: "description one" },
        { title: "title1", description: "description one" },
        { title: "title1", description: "description one" },
        { title: "title1", description: "description one" },
        { title: "title1", description: "description one" },
    ];
    return (
        <div className="bg-white h-5/6 w-5/6 grid grid-cols-3 gap-2 p-10">
            {forumArr.map((value, index) => {
                return (
                    <div className="bg-cyan-600 rounded-lg flex" key={index}>
                        {value.title}
                    </div>
                );
            })}
        </div>
    );
}
