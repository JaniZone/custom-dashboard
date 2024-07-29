import dynamic from "next/dynamic";

const Line = dynamic(() => import("@ant-design/charts").then(mode => mode.Line), {ssr: false})

const LineChart = ({ data = [], height = 300, width = 300 }) => {
    // Default props for the Line chart
      
    const props = {
      data,
      xField: 'Country',
      yField: 'Population',
      colorField: 'Country',
      point: {
        size: 5,
        shape: 'diamond',
      },
      width,
      height
       };

    return (
        <div> <Line {...props} /></div>
    )
}

export default LineChart;