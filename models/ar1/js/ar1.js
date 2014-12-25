$(document).ready(function () {


    $('#ParameterInput').on('submit', function (e) {
        e.preventDefault();
        var muX = parseInt($('#muX').val());
        var rhoX = parseFloat($('#rhoX').val());
        var sigEps = parseFloat($('#sigEps').val());
        var periods = parseFloat($('#periods').val());
        var random = new Random();
        var minForMarkers = 30;

        tme=[0];
        eProc = [0];
        xProc = [muX];
        var stochSim = document.getElementById ("stochSim");
        if (periods <minForMarkers ) {
            var enableMarks = true
        }
        else {
            var enableMarks = false
        }

        if (stochSim.checked == true) {
            for (i = 1; i <= periods; i++) {
                tme.push(i);
                e = random.normal(0,1);
                eProc.push(e);
                xProc.push((1-rhoX)*muX+rhoX*xProc[xProc.length-1] + sigEps*e);
            }
        } else {
            tme.push(1)
            eProc.push(sigEps);
            xProc.push((1-rhoX)*muX+rhoX*xProc[xProc.length-1] + sigEps*sigEps);
            for (i = 2; i <= periods; i++) {
                tme.push(i);
                e = 0;
                eProc.push(e);
                xProc.push((1-rhoX)*muX+rhoX*xProc[xProc.length-1] + sigEps*e);
            }
        }


        $('#shockProcess').highcharts({
            chart: {
                type: 'line',
                marginRight: 10,
            },

            plotOptions: {
                series: {
                    lineWidth: 2,
                    marker : {
                        enabled : enableMarks,
                        radius : 3},
                    animation: {
                        duration: 10000     //Controls the time required for plot to be fully rendered.
                    }
                }
            },

            title: {
                text: 'White noise driving process',
                useHTML:true,
                style: {
                    "fontSize": "15px"
                }
            },
            xAxis: {
                // type: 'datetime',
                // tickPixelInterval: 150,
                // tickInterval: interval,
                text: 'Time Period'
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function() 
                    {
                        return Math.round(this.value*100)/100;
                    }
                },
                minRange: 2,
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: '#808080'
                }]
            },

            legend: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series: [{
                name: 'Y',
                data: (function () {
                    var data = [];
                    for (i = 0; i <= periods; i++) {
                        data.push({
                            x: tme[i],
                            y: eProc[i],
                        })
                    }

                    return data;
                })()
            },
            ]
        });

        $('#ar1Process').highcharts({
            chart: {
                type: 'line',
                marginRight: 10,
            },

            plotOptions: {
                series: {
                    lineWidth: 2,
                    marker : {
                        enabled : enableMarks,
                        radius : 3},
                    animation: {
                        duration: 10000     //Controls the time required for plot to be fully rendered.
                    }
                }
            },

            title: {
                text: 'AR(1) process',
                useHTML:true,
                style: {
                    "fontSize": "15px" 
                }
            },
            xAxis: {
                // type: 'datetime',
                // tickPixelInterval: 150,
                // tickInterval: interval,
                text: 'Time Period'
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function() 
                    {
                        return Math.round(this.value*100)/100;
                    }
                },
                minRange: 2,
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: '#808080'
                }]
            },

            legend: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series: [{
                name: 'Y',
                data: (function () {
                    var data = [];
                    for (i = 0; i <= periods; i++) {
                        data.push({
                            x: tme[i],
                            y: xProc[i],
                        })
                    }

                    return data;
                })()
            },
            ]
        });

    }) //.trigger('submit');
});

function reloadFunction() {
    location.reload();
}