import dynamic from "next/dynamic";

const Bar = dynamic(() => import("@ant-design/charts").then(mode => mode.Bar), {ssr: false})

const BarChart = ({ data = [], height = 300, width = 300 }) => {
    // Default props for the Bar chart
      
    const props = {
      data,
      xField: 'Country',
      yField: 'Population',
      colorField: 'Country',
      barStyle: { fillOpacity: 0.6 },
      padding: 50,
      autoFit: true,
      width,
      height
       };

    return (
        <div> <Bar {...props} /></div>
    )
}

export default BarChart;