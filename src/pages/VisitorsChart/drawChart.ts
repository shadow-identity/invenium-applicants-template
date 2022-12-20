import {Chart} from 'chart.js/auto'
import {VisitorsArray} from '../../types'

export const drawChart = (container: HTMLCanvasElement, visitors: VisitorsArray) => {
	return new Chart(
		container,
		{
			type: 'line',
			options: {
				plugins: {
					legend: {
						display: false
					}
				},
			},
			data: {
				labels: visitors.map(row => row.time),
				datasets: [
					{
						label: 'Avg',
						data: visitors.map(row => row.visitors.avg),
					}
				]
			}
		}
	)
}
