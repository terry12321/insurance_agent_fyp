import React, { DOMAttributes, FC } from "react";

export const MyInput: FC<DOMAttributes<HTMLDivElement>> = (
    DOMAttributes: DOMAttributes<HTMLDivElement>
) => {
    return (
        <div {...DOMAttributes} className="text-black">
            fk bro
        </div>
    );
};
