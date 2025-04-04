class EndbossBar extends AllBars {

    percentage = 100;

    constructor() {
        super();
        this.setPercentage(3);
    }

     setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

     resolveImageIndex() {
        if (this.percentage > 100) {
            return 5;
        } else if (this.percentage > 80){
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }  

}