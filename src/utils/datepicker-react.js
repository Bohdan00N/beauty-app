import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

import React, { useEffect, useRef } from "react";

function AirDatepickerReact({ onDateChange, value, ...props }) {
  const $input = useRef(null);
  const dp = useRef(null);

  useEffect(() => {
    if (!dp.current) {
      dp.current = new AirDatepicker($input.current, {
        ...props,
        onSelect: (fd) => {
          if (fd && fd.date) { 
            const selectedDate = fd.date; 
            if (!isNaN(selectedDate.getTime())) {
              onDateChange(selectedDate);
            } else {
              console.error("Invalid date selected:", selectedDate);
            }
          }
        },
      });
    } else {
      dp.current.update({ ...props });
      if (value === null) {
        dp.current.clear();
      }
    }
  }, [props, onDateChange, value]);
  
  return <input ref={$input} placeholder="Обрати дату" className="calendar" />;
}

export default AirDatepickerReact;
