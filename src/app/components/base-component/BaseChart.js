import React from "react";
import Chart from "react-apexcharts";
import { injectIntl } from "react-intl";


const BaseChart = (props) => {
  const { options, series } = props;

  return (
    options && (
      <>
        <Chart
          options={options}
          series={series}
          type="bar"
          width={500}
        />
        {props.error && <div className="invalid-feedback"> {props.error}</div>}
      </>
    )
  );
};

export default injectIntl(BaseChart);