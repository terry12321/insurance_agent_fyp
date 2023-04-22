import { BulletinDocumentPage } from "src/components/bulletin/BulletinDocument";
import BulletinTab from "src/components/bulletin/BulletinTab";

export default function Document() {
    return (
        <div className="w-5/6 flex flex-col gap-10">
            <BulletinTab />
            <BulletinDocumentPage />;
        </div>
    );
}
