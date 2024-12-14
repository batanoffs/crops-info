// attribute.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'transformAttr',
	standalone: true,
})
export class TransformAttr implements PipeTransform {
	transform(value: string): string {
		let result = '';
		for (let i = 0; i < value.length; i++) {
			const char = value[i];
			if (char === char.toUpperCase() && i !== 0) {
				result += ' ';
			}
			result += i === 0 ? char.toUpperCase() : char.toLowerCase();
		}
		return result.trim();
	}
}

