(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$injector=['$scope','rksvService','socketService'];
    function HomeController($scope,rksvService,socketService) {
        $scope.tabs=[
                        {title:"1D"},
                        {title:"1M"},
                        {title:"3M"},
                        {title:"YTD"},
                        {title:"1Y"},
                        {title:"ALL"},
                    ];

        socketService.on('error', function(eventData){
            console.error('Connection Error:',eventData);
        });

        $scope.sub= function(){
          $scope.data=true;
          socketService.on('connect', function () {
            socketService.emit('sub', {state:true});
            socketService.on('data', function (data) {
                console.log("s",data);
            });
          });
        }
        

        $scope.getReport= function(key) {
          rksvService.GetStatus()
              .then(function (data) {
                  if(data.status){
                    rksvService.GetAll()
                      .then(function (data) {
                        getGraph(data);
                      });
                  }
                  else{

                  }
              });
              
        }
    }
    function getGraph(data){
      d3.select('.graph').selectAll("svg").remove();
      var margin = {top: 20, right: 50, bottom: 30, left: 50},
            width = 700 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

      // forming incoming data into object
      var data= data.map(function(d){
        var row=d.split(',');
        var obj={
          timestamp: new Date(row[0] / 1000),
          open:      +row[1],
          high:      +row[2],
          low:       +row[3],
          close:     +row[4],
          volume:    +row[5]
        }
        return obj;
      });


      var x = d3.time.scale()
          .range([0, width]);
      var y = d3.scale.linear()
          .range([height, 0]);
      var y1 = d3.scale.linear().range([height, 0]);
          
      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .ticks(7);
      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(4);
      var yAxisRight = d3.svg.axis().scale(y1)
          .orient("right")
          .ticks(3);

      var area = d3.svg.area()
          .x(function(d) { return x(d.timestamp); })
          .y0(height)
          .y1(function(d) { return y(d.close); });

      var line2 = d3.svg.line()
          .x(function(d) { return x(d.timestamp); })
          .y(function(d) { return y1(d.open); });

      var make_y_axis = function () {
        return d3.svg.axis()
          .scale(y)
          .orient('left')
          .ticks(4);
      };
      var make_y_axis_right = function () {
        return d3.svg.axis()
          .scale(y1)
          .orient('left')
          .ticks(4);
      };

      var svg = d3.select('.graph').append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);
      var focus = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          // focus.append('g')
          // .attr('class', 'y chart__grid')
          // .call(make_y_axis()
          // .tickSize(-width, 0, 0)
          // .tickFormat(''));

        x.domain(d3.extent(data, function(d) { return d.timestamp }));
        y.domain(d3.extent(data, function(d) { return d.close; }));

        y1.domain([0, d3.max(data, function(d) {return Math.max(d.open); })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + margin.left + "," + (height+margin.top) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis chart__grid")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style("fill", "#878787") 
            .call(make_y_axis()
            .tickSize(-width, 0, 0))
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("fill", "#878787")
            .text("Close Price $");

        svg.append("g")       
          .attr("class", "y axis")  
          .attr("transform", "translate(" + (width+margin.left) + " ,"+(margin.top)+")") 
          .style("fill", "red")   
          .call(yAxisRight)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -12)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Open Price $");

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("d", area);

        svg.append("path")        // Add the valueline2 path.
            .style("stroke", "red")
            .style("fill", "none")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("d", line2(data));

    }

})();