let count = 0;

const vewcount = (req, res, next) => {

    count++;
    console.log(count);
    //    res.send('count: ' + count);
    next();
    // return count;
}

module.exports = vewcount;