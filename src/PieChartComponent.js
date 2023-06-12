import React, { useContext, useState, useEffect } from 'react'
import API_CONTEXT from "./APIContext"
import { fetchResults } from './Fetchs';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

export default function PieChartComponent() {
  const {evaluationId, memberId} = useContext(API_CONTEXT)
  const [pieData, setPieData] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchResults(evaluationId, memberId);
        setPieData([{ name: 'Correct Answers', value: data.correct_answers }])
        setPieData(previousData => {
          previousData.push({ name: 'Incorrect Answers', value: data.wrong_answers })
          return previousData
        })
      } catch (error) {
        console.log('Error fetching question:', error);
      }
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const colors = ['#198754', '#D2222D'];

  return (
    <PieChart width={280} height={400}>
      <text x={140} y={60} textAnchor="middle" fontSize={18} textDecoration="underline">
        Results
      </text>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  )
}
