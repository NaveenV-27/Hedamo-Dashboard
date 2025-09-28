import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const RadialChart = ({ score }: { score: number }) => {
  const color = score > 70 ? "#16a34a" : score > 40 ? "#facc15" : "#dc2626"
  return (
    <div className="w-32 h-32">
      <CircularProgressbar
        value={score}
        text={`${score}%`}
        styles={buildStyles({
          textColor: "#F1F1F1",
          pathColor: color,
          trailColor: "#e5e7eb",
        })}
      />
    </div>
  )
}
export default RadialChart;
