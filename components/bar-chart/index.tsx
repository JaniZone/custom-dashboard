import dynamic from "next/dynamic";

const Bar = dynamic(() => import("@ant-design/charts").then(mode => mode.Bar), {ssr: false})

const BarChart = () => {

    const data = [
        { Country: 'India', Population: 140, colorField: 'India'},
        { Country: 'USA', Population: 33, colorField: 'USA' },
        { Country: 'Japan', Population: 12, colorField: 'Japan' },
        { Country: 'China', Population: 141, colorField: 'China' },
        { Country: 'Australia', Population: 2.6, colorField: 'Australia' },
      ];
     const props = {
      data,
      xField: 'Country',
      yField: 'Population',
      colorField: 'colorField',
      barStyle: { fillOpacity: 0.6 },
    };

    return (
        <div> <Bar {...props} /></div>
    )
}

export default BarChart;