jQuery(document).ready(function($) {

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

	var chart_1 = AmCharts.makeChart("graph-1", {
		"type": "serial",
		"theme": "light",
		"marginRight": 0,
		"dataProvider": chartData,
		"valueAxes": [{
			"axisAlpha": 0,
			"position": "left",
			"title": "Кол-во билетов",
			"fontSize": 10,
			"titleBold": false,
		}],
		"startDuration": 0.3,
		"graphs": [{
			"fillAlphas": 0.9,
			"lineAlpha": 0.2,
			"type": "column",
			"valueField": "qty",
			"fillColors" : ["#000", "#d31f26"]
		}],
		"chartCursor": {
			"categoryBalloonEnabled": false,
			"cursorAlpha": 0,
			"zoomable": false
		},
		"categoryField": "price",
		"categoryAxis": {
			"gridPosition": "start",
			"title": "Цена",
			"titleBold": false,
			"fontSize": 10
		},
		"export": {
			"enabled": true
		}
	});

	var chart_2 = AmCharts.makeChart("graph-2", {
		"type": "serial",
		"theme": "light",
		"marginRight": 0,
		"dataProvider": chartData,
		"valueAxes": [{
			"axisAlpha": 0,
			"position": "left",
			"title": "Кол-во билетов",
			"fontSize": 10,
			"titleBold": false,
		}],
		"startDuration": 0.3,
		"graphs": [{
			"fillAlphas": 0.9,
			"lineAlpha": 0.2,
			"type": "column",
			"valueField": "qty",
			"fillColors" : ["#000", "#d31f26"]
		}],
		"chartCursor": {
			"categoryBalloonEnabled": false,
			"cursorAlpha": 0,
			"zoomable": false
		},
		"categoryField": "price",
		"categoryAxis": {
			"gridPosition": "start",
			"title": "Цена",
			"titleBold": false,
			"fontSize": 10
		},
		"export": {
			"enabled": true
		}
	});


});