import { Component, ViewChild, OnInit, enableProdMode, AfterViewInit } from '@angular/core';
import {
	ApexAxisChartSeries,
	ApexChart,
	ApexXAxis,
	ApexTitleSubtitle
} from "ng-apexcharts";
export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	title: ApexTitleSubtitle;
};
import * as Highcharts from 'highcharts';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
declare const $: any;

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

	ChartOptions6: any;
	ChartOptions8: any;
	Highcharts: typeof Highcharts = Highcharts;
	dtOptions: any = {};	
	constructor(public loader: AfterLoginComponent) {

	}

	ngOnInit() {
		
	

		this.ChartOptions6 = {
			chart: {
				type: 'area',
				height: 420,
				styledMode: true,
				toolbar: {
					show: true
				},
			},
			credits: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			accessibility: {
				description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
			},
			title: {
				text: 'Sales and Traffic Annual Report',
				align: 'left'
			},
			tooltip: {
				pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
			},
			plotOptions: {
				area: {
					pointStart: 1940,
					marker: {
						enabled: false,
						symbol: 'circle',
						radius: 2,
						states: {
							hover: {
								enabled: true
							}
						}
					}
				}
			},

			series: [{
				name: 'Sales',
				data: [
					null, null, null, null, null, 6, 11, 32, 110, 235,
					369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
					20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
					26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
					24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
					21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
					10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
					5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
				]
			},
			{
				name: 'Traffic',
				data: [null, null, null, null, null, null, null, null, null, null,
					5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
					1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
					11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
					30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
					37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
					21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
					12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
				]
			}],
		};

		this.ChartOptions8 = {
			chart: {
				type: 'pie',
				height: 330,
				styledMode: true,
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: true,
				toolbar: {
					show: true
				},
			},
			credits: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			title: {
				text: 'Total Traffic by Source',
				align: 'left'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			accessibility: {
				point: {
					valueSuffix: '%'
				}
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %'
					}
				}
			},
			series: [{
				minPointSize: 10,
				innerSize: '65%',
				zMin: 0,
				name: 'Traffic',
				data: [{
					name: 'Organic',
					y: 505370,
					z: 92.9,
					sliced: true,
					selected: true
				}, {
					name: 'Paid',
					y: 551500,
					z: 118.7
				}, {
					name: 'Email',
					y: 312685,
					z: 124.6
				}, {
					name: 'Google',
					y: 78867,
					z: 137.5
				}, {
					name: 'Direct',
					y: 301340,
					z: 201.8
				}, {
					name: 'Bing',
					y: 357022,
					z: 235.6
				}]
			}]
		}
		
	}



	ngAfterViewInit(): void {	
		$('#example').DataTable({			
			//dom: 'Bfrtip',			
			buttons: ['copy', 'excel', 'csv' , 'pdf', 'print']			
		});	
		 this.loader.isLoading=false;		
	}

	// chart 1
	chartOptions1: any = {
		series: [{
			name: 'Total Orders',
			data: [240, 160, 671, 414, 555, 257, 901, 613, 727, 414, 555, 257]
		}],
		chart: {
			type: 'area',
			height: 65,
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			},
			dropShadow: {
				enabled: true,
				top: 3,
				left: 14,
				blur: 4,
				opacity: 0.12,
				color: '#f41127',
			},
			sparkline: {
				enabled: true
			}
		},
		markers: {
			size: 0,
			colors: ["#f41127"],
			strokeColors: "#fff",
			strokeWidth: 2,
			hover: {
				size: 7,
			}
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '45%',
				endingShape: 'rounded'
			},
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			show: true,
			width: 2.4,
			curve: 'smooth'
		},
		colors: ["#f41127"],
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		},
		fill: {
			opacity: 1
		},
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: false
			},
			x: {
				show: true
			},
			y: {
				title: {
					formatter: function () {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	};
	// End Chart 1
	// chart 2
	chartOptions2: any = {
		series: [{
			name: 'Total Orders',
			data: [240, 160, 671, 414, 555, 257, 901, 613, 727, 414, 555, 257]
		}],
		chart: {
			type: 'area',
			height: 65,
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			},
			dropShadow: {
				enabled: true,
				top: 3,
				left: 14,
				blur: 4,
				opacity: 0.12,
				color: '#8833ff',
			},
			sparkline: {
				enabled: true
			}
		},
		markers: {
			size: 0,
			colors: ["#8833ff"],
			strokeColors: "#fff",
			strokeWidth: 2,
			hover: {
				size: 7,
			}
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '45%',
				endingShape: 'rounded'
			},
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			show: true,
			width: 2.4,
			curve: 'smooth'
		},
		colors: ["#8833ff"],
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		},
		fill: {
			opacity: 1
		},
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: false
			},
			x: {
				show: true
			},
			y: {
				title: {
					formatter: function () {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	};
	// End Chart 2

	// chart 3
	chartOptions3: any = {
		series: [{
			name: 'Total Orders',
			data: [240, 160, 671, 414, 555, 257, 901, 613, 727, 414, 555, 257]
		}],
		chart: {
			type: 'area',
			height: 65,
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			},
			dropShadow: {
				enabled: true,
				top: 3,
				left: 14,
				blur: 4,
				opacity: 0.12,
				color: '#ffb207',
			},
			sparkline: {
				enabled: true
			}
		},
		markers: {
			size: 0,
			colors: ["#ffb207"],
			strokeColors: "#fff",
			strokeWidth: 2,
			hover: {
				size: 7,
			}
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '45%',
				endingShape: 'rounded'
			},
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			show: true,
			width: 2.4,
			curve: 'smooth'
		},
		colors: ["#ffb207"],
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		},
		fill: {
			opacity: 1
		},
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: false
			},
			x: {
				show: true
			},
			y: {
				title: {
					formatter: function () {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	};
	// End Chart 3

	// chart 4
	chartOptions4: any = {
		series: [{
			name: 'Total Orders',
			data: [240, 160, 671, 414, 555, 257, 901, 613, 727, 414, 555, 257]
		}],
		chart: {
			type: 'area',
			height: 65,
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			},
			dropShadow: {
				enabled: true,
				top: 3,
				left: 14,
				blur: 4,
				opacity: 0.12,
				color: '#29cc39',
			},
			sparkline: {
				enabled: true
			}
		},
		markers: {
			size: 0,
			colors: ["#29cc39"],
			strokeColors: "#fff",
			strokeWidth: 2,
			hover: {
				size: 7,
			}
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '45%',
				endingShape: 'rounded'
			},
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			show: true,
			width: 2.4,
			curve: 'smooth'
		},
		colors: ["#29cc39"],
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		},
		fill: {
			opacity: 1
		},
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: false
			},
			x: {
				show: true
			},
			y: {
				title: {
					formatter: function () {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	};
	// End Chart 4

	// Chart 6
	chartOptions7: any = {
		chart: {
			height: 300,
			type: 'radialBar',
			toolbar: {
				show: false
			}
		},
		plotOptions: {
			radialBar: {
				//startAngle: -135,
				//endAngle: 225,
				hollow: {
					margin: 0,
					size: '78%',
					//background: '#fff',
					image: undefined,
					imageOffsetX: 0,
					imageOffsetY: 0,
					position: 'front',
					dropShadow: {
						enabled: false,
						top: 3,
						left: 0,
						blur: 4,
						color: 'rgba(0, 169, 255, 0.25)',
						opacity: 0.65
					}
				},
				track: {
					background: '#f0e6ff',
					//strokeWidth: '67%',
					margin: 0, // margin is in pixels
					dropShadow: {
						enabled: false,
						top: -3,
						left: 0,
						blur: 4,
						color: 'rgba(0, 169, 255, 0.85)',
						opacity: 0.65
					}
				},
				dataLabels: {
					showOn: 'always',
					name: {
						offsetY: -25,
						show: true,
						color: '#6c757d',
						fontSize: '16px'
					},
					value: {
						formatter: function (val: any) {
							return val + "%";
						},
						color: '#000',
						fontSize: '45px',
						show: true,
						offsetY: 10,
					}
				}
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'light',
				type: 'horizontal',
				shadeIntensity: 0.5,
				gradientToColors: ['#8833ff'],
				inverseColors: false,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100]
			}
		},
		colors: ["#8833ff"],
		series: [78],
		stroke: {
			lineCap: 'round',
			//dashArray: 4
		},
		labels: ['Reached'],

	};
	// End Chart 5

	// Chart 8
	chartOptions5: any = {
		series: [{
			name: 'Online Sales',
			data: [33, 44, 55, 57, 56, 61, 58, 63, 60, 66, 72, 68]
		}, {
			name: 'Offline Sales',
			data: [38, 35, 41, 36, 26, 45, 48, 52, 53, 41, 55, 43]
		}],
		chart: {
			foreColor: '#9ba7b2',
			type: 'bar',
			height: 280,
			stacked: true,
			toolbar: {
				show: false
			},

		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '25%',
				endingShape: 'rounded'
			},
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: true,
			position: 'top',
			horizontalAlign: 'right'
		},
		stroke: {
			show: true,
			width: 2,
			//curve: 'smooth'
			// colors: ['transparent']
		},
		colors: ['#0dcaf0', '#e5e7e8'],
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		},
		fill: {
			opacity: 1
		},
		tooltip: {
			y: {
				formatter: function (val: any) {
					return "" + val + " thousands"
				}
			}
		}
	};

	// End Chart 8

	// Chart 9
	chartOptions9: any = {
		series: [{
			name: 'Total Orders',
			data: [340, 160, 671, 414, 555, 414, 555, 257]
		}],
		chart: {
			type: 'area',
			height: 180,
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			},
			dropShadow: {
				enabled: true,
				top: 3,
				left: 14,
				blur: 4,
				opacity: 0.12,
				color: '#29cc39',
			},
			sparkline: {
				enabled: true
			}
		},
		markers: {
			size: 0,
			colors: ["#29cc39"],
			strokeColors: "#fff",
			strokeWidth: 2,
			hover: {
				size: 7,
			}
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '45%',
				endingShape: 'rounded'
			},
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			show: true,
			width: 2.4,
			curve: 'smooth'
		},
		colors: ["#29cc39"],
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		},
		fill: {
			opacity: 1
		},
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (seriesName: any) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	};

	// End Chart 9


	// Geographic Map
// 	jQuery('#geographic-map').vectorMap({
// 		map: 'world_mill_en',
// 		backgroundColor: 'transparent',
// 		borderColor: '#818181',
// 		borderOpacity: 0.25,
// 		borderWidth: 1,
// 		zoomOnScroll: false,
// 		color: '#009efb',
// 		regionStyle: {
// 			initial: {
// 				fill: '#6c757d'
// 			}
// 		},
// 		markerStyle: {
// 			initial: {
// 				r: 9,
// 				'fill': '#fff',
// 				'fill-opacity': 1,
// 				'stroke': '#000',
// 				'stroke-width': 5,
// 				'stroke-opacity': 0.4
// 			},
// 		},
// 		enableZoom: true,
// 		hoverColor: '#009efb',
// 		markers: [{
// 			latLng: [21.00, 78.00],
// 		name: 'I Love My India'
// 		}],
// 	series: {
// 		regions: [{
// 			values: {
// 				IN: '#8833ff',
// 				US: '#29cc39',
// 				RU: '#f41127',
// 				AU: '#ffb207'
// 			}
// 		}]
// 	},
// 	hoverOpacity: null,
// 	normalizeFunction: 'linear',
// 	scaleColors: ['#b6d6ff', '#005ace'],
// 	selectedColor: '#c9dfaf',
// 	selectedRegions: [],
// 	showTooltip: true,
// 	onRegionClick: function (element, code, region) {
// 	var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();
// 	alert(message);
// }
// 	});


//End Geographic Map

}






