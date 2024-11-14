export type AdCardProps = {
	id:number
	title: string;
	picture: string;
	price: number;
};
export default function AdCard(props: AdCardProps) {
	return (
		<div className="ad-card-container">
			<a className="ad-card-link" href={`ads/${props.id}`}>
				<img className="ad-card-image" src={props.picture} alt={props.title} />
				<div className="ad-card-text">
					<div className="ad-card-title">{props.title}</div>
					<div className="ad-card-price">{props.price} €</div>
				</div>
			</a>
		</div>
	);
}