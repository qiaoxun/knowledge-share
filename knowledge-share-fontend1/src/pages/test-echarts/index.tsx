import React, { FC, useEffect } from 'react'
import { Card, Row, Col } from 'antd'
import ReactEcharts from 'echarts-for-react'
import * as echarts from 'echarts'

const TestEcharts: FC = () => {
  console.log('TestEcharts Rendered')
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
  let relationCom: RefType

  const getPieSeries = () => {
    return scatterData.map((item, index) => {
      const center = calendarCom
        .getEchartsInstance()
        .convertToPixel('calendar', item)
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

  useEffect(() => {
    // Update the document title using the browser API
    document.title = 'You clicked 1 times'
  })

  const getOption1 = () => {
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
              return echarts.time.format(params.value[0], '{dd}', false)
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

  const URL =
    'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/les-miserables.json'

  interface nodeProps {
    category: Number;
    id: String;
    name: String;
    symbolSize: Number;
    value: Number;
    x: Number;
    y: Number;
  }

  interface graphDataProps {
    nodes: nodeProps[];
    links: any[];
    categories: any[];
  }

  fetch(URL)
    .then((res: any) => {
      return res.json()
    })
    .then((graph: graphDataProps) => {
      for (let i = 0; i < graph.nodes.length; i += 1) {
        graph.nodes[i].symbolSize = 5
      }
      // graph.nodes.forEach((node: nodeProps) => {
      //   node.symbolSize = 5
      // })
      const option = {
        title: {
          text: 'Les Miserables',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [
          {
            // selectedMode: 'single',
            data: graph.categories.map((a) => {
              return a.name
            })
          }
        ],
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            roam: true,
            edgeSymbol: ['circle', 'arrow'],
            label: {
              show: true,
              position: 'right'
            },
            force: {
              repulsion: 200
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 10
              }
            }
          }
        ]
      }
      if (relationCom) {
        relationCom.getEchartsInstance().setOption(option)
      }
    })

  const getOption2 = () => {
    return {
      title: {
        text: 'Les Miserables',
        subtext: 'Default layout',
        top: 'bottom',
        left: 'right'
      },
      tooltip: {},
      series: [
        {
          name: 'Les Miserables',
          type: 'graph',
          layout: 'force',
          roam: true,
          label: {
            position: 'right'
          },
          force: {
            repulsion: 100
          }
        }
      ]
    }
  }

  return (
    <div className="home" style={{ height: '100vh', padding: 20 }}>
      <Row gutter={16}>
        <Col span={12} style={{ marginTop: 20 }}>
          <Card>
            <ReactEcharts
              ref={(e) => {
                calendarCom = e
              }}
              option={getOption1()}
              style={{ width: '100%', height: '500px' }}
            />
          </Card>
        </Col>
        <Col span={12} style={{ marginTop: 20 }}>
          <Card>
            <ReactEcharts
              ref={(e) => {
                relationCom = e
              }}
              option={getOption2()}
              style={{ width: '100%', height: '500px' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default TestEcharts
