import React, {useEffect, useRef} from 'react'
import styles from './VisitorsChart.module.css'
import {visitorsOverTimeRequest} from '../../graphql/requests'
import {drawChart} from "./drawChart"
import {Chart} from "chart.js/auto"

const DATES = ['2022-01', '2022-02']
export const VisitorsChart = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const chartRef = useRef<Chart>()

	const fetchVisitors = async (date: string) => {
		const visitors = await visitorsOverTimeRequest(date)
		if (visitors) {
			chartRef.current?.destroy()
			chartRef.current = drawChart(canvasRef.current!, visitors)
		}
	}

	useEffect( () => {
		fetchVisitors(DATES[0])
		return () => chartRef.current?.destroy()
	}, [])

	return (
		<div className={styles.chart}>
			<canvas ref={canvasRef}></canvas>
		</div>
	)
}
