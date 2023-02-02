import * as echarts from 'echarts/core';
import {BarChart, RadarChart, PieChart, LineChart} from 'echarts/charts';
import {TitleComponent, LegendComponent} from 'echarts/components';

echarts.use(
    [BarChart, RadarChart, PieChart, LineChart, TitleComponent, LegendComponent]
)
require('echarts/theme/macarons')
export default echarts