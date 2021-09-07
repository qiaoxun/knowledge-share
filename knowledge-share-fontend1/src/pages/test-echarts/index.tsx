import React, { FC } from 'react'
import { Card, Row, Col } from 'antd'
import ReactEcharts from 'echarts-for-react'
import * as echarts from 'echarts'

const TestEcharts: FC = () => {
  const cellSize = [80, 80]
  const pieRadius = 30

  const getVirtulData = () => {
    const date = +echarts.number.parseDate('2021-03-01')
    const end = +echarts.number.parseDate('2021-04-01')
    const dayTime = 3600 * 24 * 1000
    const data = []
    for (let time = date; time < end; time += dayTime) {
      data.push([
        echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
        Math.floor(Math.random() * 10000)
      ])
    }
    return data
  }

  const scatterData = getVirtulData()
  let calendarCom: RefType

  const getPieSeries = () => {
    return scatterData.map((item, index) => {
      const center = calendarCom
        .getEchartsInstance()
        .convertToPixel('calendar', item)
      console.log(item)
      console.log(center)
      return {
        id: `${index}pie`,
        type: 'pie',
        center,
        label: {
          normal: {
            formatter: '{c}',
            position: 'inside'
          }
        },
        radius: pieRadius,
        data: [
          { name: '工作', value: Math.round(Math.random() * 24) },
          { name: '娱乐', value: Math.round(Math.random() * 24) },
          { name: '睡觉', value: Math.round(Math.random() * 24) }
        ]
      }
    })
  }

  const getOption3 = () => {
    return {
      tooltip: {},
      legend: {
        data: ['工作', '娱乐', '睡觉'],
        bottom: 20
      },
      calendar: {
        top: 'middle',
        left: 'center',
        orient: 'vertical',
        cellSize,
        yearLabel: {
          show: false,
          fontSize: 30
        },
        dayLabel: {
          margin: 20,
          firstDay: 0,
          nameMap: [
            '星期日',
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六'
          ]
        },
        monthLabel: {
          show: false
        },
        range: ['2021-03']
      },
      series: [
        {
          id: 'label',
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 1,
          label: {
            show: true,
            formatter(params) {
              return echarts.format.formatTime('dd', params.value[0], true)
            },
            offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
            fontSize: 14
          },
          data: scatterData
        }
      ]
    }
  }

  setTimeout(() => {
    if (calendarCom) {
      calendarCom.getEchartsInstance().setOption({
        series: getPieSeries()
      })
    }
  }, 10)

  return (
    <div className="home" style={{ height: '100vh', padding: 20 }}>
      <Row gutter={16}>
        <Col span={12} style={{ marginTop: 20 }}>
          <Card>
            <ReactEcharts
              ref={(e) => {
                calendarCom = e
              }}
              option={getOption3()}
              style={{ width: '100%', height: '500px' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default TestEcharts