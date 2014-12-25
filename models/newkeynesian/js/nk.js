$(document).ready(function () {


    $('#ParameterInput').on('submit', function (e) {
        e.preventDefault();
        var piT = parseInt($('#piT').val());
        var rhoG = parseFloat($('#rhoG').val());
        var rhoU = parseFloat($('#rhoU').val());
        var sigEpsG = parseFloat($('#sigEpsG').val());
        var sigEpsU = parseFloat($('#sigEpsU').val());
        var periods = parseFloat($('#periods').val());
        var phiPi = parseFloat($('#phiPi').val());
        var phiY = parseFloat($('#phiY').val());

        var stochSim = document.getElementById ("stochSim");
        var irDemand = document.getElementById ("irDemand");
        var irPi = document.getElementById ("irPi");
        var irInterest = document.getElementById ("irInterest");

        var eu = new Random(new Date().getTime());
        var eg = new Random(new Date().getTime()+1000);
        var minForMarkers = 30;

        var tme=[0];
        var egProc = [0];
        var euProc = [0];
        var evProc = [0];
        var gProc = [0];
        var uProc = [0];
        var vProc = [0];
        var yProc = [];
        var piProc = [];
        var iProc = [];
        var rProc = [];

        var a0,a1,a2,b0,b1,b2,c0,c1,c2,d0,d1,d2
        var beta, kappa, yBar, sigma, rho, rhoV, sigEpsV

        beta = Math.exp(-2);
        kappa = .25;
        sigma = 1;
        yBar = 100;
        rho = 2;
        rhoV = 0.5;
        sigEpsV = 1;

        console.log(kappa*(phiPi-1)+(1-beta)*phiY)

        if (kappa*(phiPi-1)+(1-beta)*phiY<0) {
            var phiPiMin = 1-(1-beta)*phiY/kappa

            window.alert('Unstable Equilibrium! With your chosen weight on the output gap, you must set the weight on inflation to at least '+phiPiMin+'.')
            // console.log(fuck+5)
        } else {

            a0 = yBar;
            a1 = (1-beta*rhoG)/((1-beta*rhoG)*(1-rhoG+phiY/sigma)+ kappa/sigma*(phiPi-rhoG));
            a2 = (rhoU-phiPi)/sigma  /  ((1-beta*rhoU)*(1-rhoU+phiY/sigma)+ kappa/sigma*(phiPi-rhoU));
            a3 = 0;

            b0 = piT;
            b1 = kappa*a1/(1-beta*rhoG);
            b2 = (1-rhoU + phiY/sigma)*sigma/(rhoU-phiPi)*a2;
            b3 = 0;

            c0 = rho+piT;
            c1 = phiPi*b1 + phiY*a1;
            c2 = phiPi*b2 + phiY*a2;
            c3 = 0;

            d0 = rho;
            d1 = (phiPi-rhoG)*b1+phiY*a1;
            d2 = (phiPi-rhoU)*b2-phiY*a2;
            d3 = 0;

            if (periods <minForMarkers ) {
                var enableMarks = true;
            }
            else {
                var enableMarks = false;
            }

            if (irDemand.checked == false) {
                sigEpsG = 0;
            }

            if (irPi.checked == false) {
                sigEpsU = 0;
            }

            if (stochSim.checked == true) {
                for (i = 1; i <= periods; i++) {
                    tme.push(i);
                    e1 = eu.normal(0,1);
                    e2 = eg.normal(0,1);
                    euProc.push(e1);
                    egProc.push(e2);
                    gProc.push(rhoG*gProc[gProc.length-1] + sigEpsG*e1);
                    uProc.push(rhoU*uProc[uProc.length-1] + sigEpsU*e2);
                    vProc.push(0);
                }
            } else {
                tme.push(1)
                egProc.push(sigEpsG);
                euProc.push(sigEpsU);
                evProc.push(sigEpsV);
                gProc.push(rhoG*gProc[gProc.length-1] + sigEpsG*sigEpsG);
                uProc.push(rhoU*uProc[uProc.length-1] + sigEpsU*sigEpsU);
                vProc.push(rhoV*vProc[vProc.length-1] + sigEpsV*sigEpsV);
                if (irInterest.checked == true) {
                    a3 = -(1-beta*rhoV)/sigma/((1-beta*rhoV)*(1-rhoV+phiY/sigma)+ kappa/sigma*(phiPi-rhoV));
                    b3 = kappa*a3/(1-beta*rhoV);
                    c3 = phiPi*b3 + phiY*a3+1;
                    d3 = (phiPi-rhoV)*b3-phiY*a3 + 1;
                }
                for (i = 2; i <= periods; i++) {
                    tme.push(i);
                    e = 0;
                    egProc.push(e);
                    euProc.push(e);
                    gProc.push(rhoG*gProc[gProc.length-1] + sigEpsG*e);
                    uProc.push(rhoU*uProc[uProc.length-1] + sigEpsU*e);
                    uProc.push(rhoU*uProc[uProc.length-1] + sigEpsU*e);
                    vProc.push(rhoV*vProc[vProc.length-1] + sigEpsV*e);
                }
            }

            for (i=0; i<=periods; i++) {
                yProc.push(a0 + a1*gProc[i] + a2*uProc[i] + a3*vProc[i]);
                piProc.push(b0 + b1*gProc[i] + b2*uProc[i]+ b3*vProc[i]);
                iProc.push(c0 + c1*gProc[i] + c2*uProc[i]+ c3*vProc[i]);
                rProc.push(d0 + d1*gProc[i] + d2*uProc[i]+ d3*vProc[i]);
            }

            console.log(uProc)
            console.log(vProc)


            $('#shockProcesses').highcharts({
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
                    text: 'Demand and Inflation Shocks',
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
                    minRange: 1,
                    plotLines: [{
                        value: 0,
                        width: 2,
                        color: '#808080'
                    }]
                },

                legend: {
                    enabled: true
                },
                exporting: {
                    enabled: true
                },
                series: [{
                    name: 'g',
                    data: (function () {
                        var data = [];
                        for (i = 0; i <= periods; i++) {
                            data.push({
                                x: tme[i],
                                y: gProc[i],
                            })
                        }

                        return data;
                    })()
                },
                {
                    name: 'u',
                    color: '#f15c80',
                    data: (function () {
                        var data = [];
                        for (i = 0; i <= periods; i++) {
                            data.push({
                                x: tme[i],
                                y: uProc[i],
                            })
                        }

                        return data;
                    })()
                },
                ]
            });

            $('#iProcess').highcharts({
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
                    text: 'Nominal Interest Rate',
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
                    minRange: 1,
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
                    name: 'i',
                    data: (function () {
                        var data = [];
                        for (i = 0; i <= periods; i++) {
                            data.push({
                                x: tme[i],
                                y: iProc[i],
                            })
                        }

                        return data;
                    })()
                },
                ]
            });

            $('#piProcess').highcharts({
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
                    text: 'Inflation',
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
                        text: '',
                    },
                    labels: {
                        formatter: function() 
                        {
                            return Math.round(this.value*100)/100;
                        }
                    },
                    minRange: 1,
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
                    name: 'pi',
                    data: (function () {
                        var data = [];
                        for (i = 0; i <= periods; i++) {
                            data.push({
                                x: tme[i],
                                y: piProc[i],
                            })
                        }

                        return data;
                    })()
                },
                ]
            });

            $('#yProcess').highcharts({
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
                    text: 'Output',
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
                    minRange: 1,
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
                    name: 'y',
                    data: (function () {
                        var data = [];
                        for (i = 0; i <= periods; i++) {
                            data.push({
                                x: tme[i],
                                y: yProc[i],
                            })
                        }

                        return data;
                    })()
                },
                ]
            });
        }

    }) //.trigger('submit');
});

function reloadFunction() {
    location.reload();
}