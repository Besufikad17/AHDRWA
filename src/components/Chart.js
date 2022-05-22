import { PolarArea } from "react-chartjs-2";

const Chart = ({ chartData }) => {
    return(
        <div>
            <PolarArea 
                data={chartData}
                options={{
                    title: {
                        display: true,
                        text: "Recognition result"
                    }
                }}
            />
        </div>
    )
}

export default Chart;
