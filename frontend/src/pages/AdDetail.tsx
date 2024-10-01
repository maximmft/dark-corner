import { useParams } from "react-router-dom";

export default function AdDetail() {
	const { adId } = useParams();
	return <>I iz Ad #{adId}</>;
}