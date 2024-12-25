import { lazy } from "react";

// if you use app dir, don't forget this line

const ApexChart = lazy(() => import("react-apexcharts"));

export default function ExampleChart(props: any) {
  const { chartData, chartOptions } = props;
  return (
    <>
      <ApexChart
        type="bar"
        options={chartOptions}
        series={chartData}
        height="100%"
        width="100%"
      />
    </>
  );
}
