const TimeToString = (seconds) => {
    let param = parseInt(seconds);
    let hh = "",
        mm = "",
        ss = "";
    if (param >= 0 && param < 60) {
        param < 10 ? (ss = "0" + param) : (ss = param);
        return "00:" + ss;
    } else if (param >= 60 && param < 3600) {
        mm = parseInt(param / 60);
        mm < 10 ? (mm = "0" + mm) : mm;
        param - parseInt(mm * 60) < 10
            ? (ss = "0" + String(param - parseInt(mm * 60)))
            : (ss = param - parseInt(mm * 60));
        return mm + ":" + ss;
    }
};

const TimeToSeconds = (time) => {
    // 格式化歌词的时间 转换成 sss:ms
    const regMin = /.*:/;
    const regSec = /:.*\./;
    const regMs = /\./;

    const min = parseInt(time.match(regMin)[0].slice(0, 2));
    let sec = parseInt(time.match(regSec)[0].slice(1, 3));
    const ms = time.slice(
      time.match(regMs).index + 1,
      time.match(regMs).index + 3
    );
    if (min !== 0) {
      sec += min * 60;
    }
    return Number(sec + "." + ms);
};

export { TimeToString, TimeToSeconds }
