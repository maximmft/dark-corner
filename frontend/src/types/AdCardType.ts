export type AdCardType = {
	id:number
	title: string;
	picture: string;
	price: number;
	description?: string;
	owner: string;
	location: string;
	category: {
		id:number,
		name: string,
	}
	tags: {
		id:number,
		name: string,
	}

};