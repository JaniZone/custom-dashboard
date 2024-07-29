import dynamic from "next/dynamic";

const Area = dynamic(() => import("@ant-design/charts").then(mode => mode.Area), {ssr: false})

const AreaChart = ({ data = [], height = 300, width = 300 }) => {
    // Default props for the Area chart
      
    const props = {
         data,
         xField: 'Country',
         yField: 'Population',
         
         areaStyle: () => ({
           fill: 'l(270) 0:#CCCCFF 1:#fff', // Adjust gradient direction
         }),
         shapeField: 'smooth',
         stack: true,
         autoFit: true,
         width,
         height
       };

    return (
        <div> <Area {...props} /></div>
    )
}

export default AreaChart;