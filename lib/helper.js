export class Helpers {

    formDate(d) {
        const dateObj = new Date(d);
        let year = dateObj.getUTCFullYear();
        let month = dateObj.getUTCMonth();
        let day = dateObj.getUTCDate();
        let hours = dateObj.getUTCHours();
        let min = dateObj.getUTCMinutes();
        let sec = dateObj.getUTCSeconds();

        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = ((hours + 11) % 12 + 1);

        let str = day + "-" + month + "-" + year + " " + hours + ":" + min + ":" + sec + " " + ampm;
        return str;
    }

    CMtime(obj) {
        if (!obj) {
            return null;
        }
        obj.ctime = this.formDate(obj.ctime);
        obj.mtime = this.formDate(obj.mtime);
        // console.log('obj', obj)
        return obj;
    }

    FormatCMTime(arr) {
        if (!arr) {
            return [];
        }
        const newArr = arr.map(el => this.CMtime(el));
        return newArr;
    }
}