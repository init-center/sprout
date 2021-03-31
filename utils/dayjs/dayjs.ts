import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Shanghai");
dayjs.locale("zh-cn");

export default dayjs;
