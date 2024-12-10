type Attributes = {
	spacing: string;
	plantingDepth: string;
	sun: 'Full Sun' | 'Partial Sun' | 'Shade';
	water: string;
	frost: 'Not tolerant' | 'Tolerant' | 'Very tolerant';
	soil: 'Acidic' | 'Neutral' | 'Alkaline';
	sproutToMature: string;
	germination: string;
	sowingTime: string;
	color: string;
	size: string;
	growthTime: string;
};

type Nutrition = {
	vitamins: string[];
	nutrients: string[];
};

type CompanionPlants = {
	plant: string;
	reasons: string[];
};

type CombatPlants = {
	plant: string;
	reasons: string[];
};

export interface Crop {
	_id: string;
	name: string;
	picture: string;
	description: string;
	attributes: Attributes;
	nutrition: Nutrition;
	pests: string[];
	diseases: string[];
	companionPlants: CompanionPlants[];
	combativePlants: CombatPlants[];
	createdAt: Date;
}
