import AirDatepickerReact from "./datepicker-react";
import "./calendar.css";
import localeUk from "air-datepicker/locale/uk";
export const Calendar = () => {
  return (
    <div>
      <AirDatepickerReact locale={localeUk} />
    </div>
  );
};
export default Calendar;

