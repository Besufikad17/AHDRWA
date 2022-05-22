import { Pie } from "react-chartjs-2";

const Chart = ({ chartData }) => {
    return(
        <div>
            <Pie 
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
