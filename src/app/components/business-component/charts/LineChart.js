import React, { useEffect, useState } from "react";
import BaseChart from "../../base-component/BaseChart";
import { injectIntl } from "react-intl";

const LineChart = (props) => {
  //const { data } = props;
  const [options, setOptions] = useState();
  const [series, setSeries] = useState();

  const data = [
    {
      createDate: "09.10.2021",
      customerNo: "123123123",
      requestType: "PROPOSAL",
    },
    {
      createDate: "09.10.2021",
      customerNo: "123123123",
      requestType: "POLICY",
    },
    {
      createDate: "10.10.2021",
      customerNo: "123123123",
      requestType: "PROPOSAL",
    },
    {
      createDate: "10.10.2021",
      customerNo: "123123123",
      requestType: "PROPOSAL",
    },
    {
      createDate: "10.10.2021",
      customerNo: "123123123",
      requestType: "POLICY",
    },
    {
      createDate: "10.10.2021",
      customerNo: "123123123",
      requestType: "POLICY",
    },
    {
      createDate: "11.10.2021",
      customerNo: "123123123",
      requestType: "POLICY",
    },
    {
      createDate: "11.10.2021",
      customerNo: "123123123",
      requestType: "POLICY",
    },
    {
      createDate: "12.10.2021",
      customerNo: "123123123",
      requestType: "PROPOSAL",
    },
    {
      createDate: "13.10.2021",
      customerNo: "123123123",
      requestType: "POLICY",
    }
  ];

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setOptions({
        chart: {
          id: "basic-bar",
          stacked: true,
        },
        xaxis: {
          categories: getUniqueDates(data),
        }
      });
      setSeries([
        {
          name: "Satış",
          data: groupBy(data, getUniqueDates(data), "POLICY"),
        },
        {
          name: "Teklif",
          data: groupBy(data, getUniqueDates(data), "PROPOSAL"),
        }
      ])
    }
  }, [data]);

  const getUniqueDates = (data) => {
    const unique = [...new Set(data.map(item => item.createDate))];
    return unique;
  }

  const groupBy = (data, dates, requestType) => {
    let values = [];
    dates.map(date => {
      values.push(data.filter(item => {
        return item.createDate === date && item.requestType === requestType;
      }).length);
    })
    return values;
  }

  return (
    options && series ? (
      <>
        <BaseChart
          options={options}
          series={series}
        />
      </>
    ) : (
      <>
      </>
    )
  );
}

export default injectIntl(LineChart);