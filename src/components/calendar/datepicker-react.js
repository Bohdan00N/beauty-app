import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

import React, { useEffect, useRef } from "react";

function AirDatepickerReact(props) {
  let $input = useRef();
  let dp = useRef();

  useEffect(() => {
    dp.current = new AirDatepicker($input.current, { ...props });
  }, [props]);

  useEffect(() => {
    dp.current.update({ ...props });
  }, [props]);

  return <input ref={$input} />;
}

export default AirDatepickerReact;
