export class Person {
    constructor(
        public name: string,
        public lastName: string,
        public age: number,
        public weight: number,
        public height: number
    ){}

    calcIMC(): string {
        const res = Math.round(this.weight / (this.height ^ 2));
        if(res < 0) {
            return 'Not found';
        } else if(res > 0 && res < 20) {
            return 'Down';
        } else if(res >= 20 && res < 26) {
            return 'Normal';
        } else if(res >= 26 && res < 28) {
            return 'Overweight';
        } else if(res >= 28 && res < 31) {
            return 'Overweight level 1';
        } else if(res >= 31 && res < 41) {
            return 'Overweight level 2';
        } else if(res >= 41) {
            return 'Overweight level 3';
        } else {
            return '';
        }
    }
}