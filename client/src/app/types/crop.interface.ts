type Attributes = {
	spacing: string;
	plantingDepth: string;
	sun: 'Full Sun' | 'Partial Sun' | 'Shade';
	water: string;
	frost: 'Not tolerant' | 'Tolerant' | 'Very tolerant';
	soil: 'Acidic' | 'Neutral' | 'Alkaline';
	sproutToHarvest: string;
	germination: string;
	sowingTime:
		| 'Very Early Spring'
		| 'Early Spring'
		| 'Spring'
		| 'Late Spring'
		| 'Very Early Summer'
		| 'Early Summer'
		| 'Summer'
		| 'Late Summer'
		| 'Very Early Autumn'
		| 'Early Autumn'
		| 'Autumn'
		| 'Late Autumn'
		| 'Very Early Winter'
		| 'Early Winter'
		| 'Winter'
		| 'Late Winter';
};

type Nutrition = {
	vitamins: string[];
	nutrients: string[];
};

type CompanionPlants = {
	plant: Crop;
	reasons: string[];
};

type CombatPlants = {
	plant: Crop;
	reasons: string[];
};

export interface Crop {
	_id: string;
	name: string;
	picture: string;
	description: string;
	attributes: Attributes;
	nutrition: Nutrition;
	pests?: string[];
	diseases?: string[];
	companionPlants?: CompanionPlants[];
	combativePlants?: CombatPlants[];
	createdAt?: Date;
}
