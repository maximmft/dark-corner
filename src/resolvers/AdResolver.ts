import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";

@InputType()
class AdInput {
	@Field()
	title!: string;
	
	@Field()
	description?: string;

	@Field()
	owner!: string;

	@Field()
	price!: number;

	@Field()
	picture!: string;

	@Field()
	location!: string;
}

@Resolver(Ad)
export class AdResolver {
	@Query(() => [Ad])
	async getAds() {
		const ads = await Ad.find()
		return ads;
	}
	
	@Query(() => Ad)
	async getAdById( @Arg("adId") id: string) {
		const ad = await Ad.findOneByOrFail({id})
		return ad;
	}
	
	@Mutation(() => Ad)
	async createAd(@Arg("data") {title, location, owner, picture, price, description}: AdInput) {
		const ad = new Ad()
		ad.title=title;
		ad.location=location;
		ad.owner=owner;
		ad.picture=picture;
		ad.price=price;
		ad.description=description;
		await ad.save()
		return ad;
	}
}
