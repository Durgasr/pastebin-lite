import {useParams} from "react-router-dom";
import PasteView from "../components/PasteView/PasteView";

const PastePage = () => {
    const {id} = useParams();
    return <PasteView pasteId={id} />;
}

export default PastePage;