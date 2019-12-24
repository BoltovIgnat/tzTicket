jQuery(document).ready(function($) {

	var chart;

	var chartData = [
		{
			"price": "1500",
			"qty": 700
		},
		{
			"price": "1800",
			"qty": 500
		},
		{
			"price": "2000",
			"qty": 200
		},
		{
			"price": "2200",
			"qty": 220
		},
		{
			"price": "2300",
			"qty": 250
		},
		{
			"price": "2400",
			"qty": 200
		},
		{
			"price": "2500",
			"qty": 150
		},
		{
			"price": "2600",
			"qty": 200
		},
		{
			"price": "2700",
			"qty": 210
		},{
			"price": "2800",
			"qty": 205
		},{
			"price": "2900",
			"qty": 275
		},
		{
			"price": "3000",
			"qty": 300
		},
		{
			"price": "3200",
			"qty": 250
		},
		{
			"price": "3300",
			"qty": 200
		},
		{
			"price": "3500",
			"qty": 300
		},
		{
			"price": "3700",
			"qty": 250
		},
		{
			"price": "4000",
			"qty": 200
		},
		{
			"price": "4300",
			"qty": 250
		},
		{
			"price": "4500",
			"qty": 300
		},
		{
			"price": "5000",
			"qty": 100
		},
		
	];

	AmCharts.ready(function () {
		// SERIAL CHART
		chart = new AmCharts.AmSerialChart();
		chart.dataProvider = chartData;
		chart.categoryField = "price";
		chart.startDuration = 0.5;
		// AXES
		// category
		var categoryAxis = chart.categoryAxis;
		categoryAxis.labelRotation = 0;
		categoryAxis.gridPosition = "start";
		categoryAxis.autoGridCount = true;
		// categoryAxis.gridCount = 5;
		// categoryAxis.equalSpacing =true;
		// categoryAxis.position = "bottom";


		// value
		// in case you don't want to change default settings of value axis,
		// you don't need to create it, as one value axis is created automatically.

		// GRAPH
		var graph = new AmCharts.AmGraph();
		graph.valueField = "qty";
		// graph.balloonText = "[[category]]: <b>[[value]]</b>";
		graph.type = "column";
		graph.lineAlpha = 0;
		graph.fillAlphas = 0.8;
		graph.fillColors = ["#000", "#d31f26"];
		chart.addGraph(graph);

		// CURSOR
		var chartCursor = new AmCharts.ChartCursor();
		chartCursor.cursorAlpha = 0;
		chartCursor.zoomable = false;
		chartCursor.categoryBalloonEnabled = false;
		chart.addChartCursor(chartCursor);

		chart.creditsPosition = "top-right";

		chart.write("graph-1");
	});
	AmCharts.ready(function () {
		// SERIAL CHART
		chart = new AmCharts.AmSerialChart();
		chart.dataProvider = chartData;
		chart.categoryField = "price";
		chart.startDuration = 0.5;

		// AXES
		// category
		var categoryAxis = chart.categoryAxis;
		categoryAxis.labelRotation = 0;
		categoryAxis.gridPosition = "start";
		categoryAxis.autoGridCount = true;

		// GRAPH
		var graph = new AmCharts.AmGraph();
		graph.valueField = "qty";
		// graph.balloonText = "[[category]]: <b>[[value]]</b>";
		graph.type = "column";
		graph.lineAlpha = 0;
		graph.fillAlphas = 0.8;
		graph.fillColors = ["#000", "#d31f26"];
		chart.addGraph(graph);

		// CURSOR
		var chartCursor = new AmCharts.ChartCursor();
		chartCursor.cursorAlpha = 0;
		chartCursor.zoomable = false;
		chartCursor.categoryBalloonEnabled = false;
		chart.addChartCursor(chartCursor);

		chart.creditsPosition = "top-right";

		chart.write("graph-2");
	});
});