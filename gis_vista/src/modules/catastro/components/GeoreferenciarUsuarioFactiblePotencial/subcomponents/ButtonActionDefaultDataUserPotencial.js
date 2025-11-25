import React from "react";

export default ({ selection, ...restProps }) => {
  const btnStyle = selection ? "btn-success" : "btn-primary";
  const btnClassName = `far fa-list-alt btn btn-sm ${btnStyle}`;

  return (
    <div className="input-group">
      <div className="input-group-append">
        <button type="button" className={btnClassName} {...restProps} />
      </div>
    </div>
  );
};
