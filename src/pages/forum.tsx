export default function Forum() {
    const forumArr = [
        {
            title: "Title 1",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
        {
            title: "Title 2",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
        {
            title: "Title 3",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
        {
            title: "Title 4",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
        {
            title: "Title 5",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
        {
            title: "Title 6",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
    ];
    return (
        <div className="bg-white text-gray-100 h-5/6 w-5/6 grid grid-cols-3 rounded-[24px] gap-6 p-10 overflow-auto">
            {forumArr.map((value, index) => {
                return (
                    <div
                        className={`${index%2 === 0 ? "bg-[#457b9d]":"bg-[#1d3557]"} rounded-lg flex flex-col gap-4`}
                        key={index}
                    >
                        <div className="text-5xl bg-gray-600 rounded-t-md py-6 text-center">
                            {value.title}
                        </div>

                        <div className="text-center px-10">
                            {value.description}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
