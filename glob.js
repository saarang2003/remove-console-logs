const glob = require("glob");

glob.glob("*", { dot: true, nodir: true }, (e, files) => {
    if (e) {
        console.log(e);
    } else {
        console.log(files);
    }
});