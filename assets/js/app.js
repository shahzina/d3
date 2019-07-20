// @TODO: YOUR CODE HERE!
console.log("Inside the HTML!!")

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight);

var chartGroup = svg.append("g")
	.attr("transform", `translate(${margin.left}, ${margin.right})`);

d3.csv("data.csv")
	.then(function(data){
		console.log("Inside the anonymous function.")

		data.forEach(function(data){
			data.poverty = +data.poverty;
			data.healthcare = +data.healthcare;
		});

		var xLinearScale = d3.scaleLinear()
			.domain([6, d3.max(data, d=>d.poverty)])
			.range([0, width]);

		var yLinearScale = d3.scaleLinear()
			.domain([0, d3.max(data, d=>d.healthcare)])
			.range([height, 0])

		var bottomAxis = d3.axisBottom(xLinearScale);
		var leftAxis = d3.axisLeft(yLinearScale);

		chartGroup.append("g")
			.attr("transform",`translate(0, ${height})`)
			.call(bottomAxis);

		chartGroup.append("g")
			.call(leftAxis);


		var circlesGroup = chartGroup.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", d=> xLinearScale(d.poverty))
			.attr("cy", d=> yLinearScale(d.healthcare))
			.attr("r", "15")
			.attr("fill", "blue")
			.attr("opacity", ".5");

		var toolTip = d3.tip()
			.attr("class", "tooltip")
			.offset([80, -60])
			.html(function(d){
				return(`${d.state}<br> Poverty: ${d.poverty}<br> Healthcare: ${d.healthcare}`);
			});

		chartGroup.call(toolTip);

		circlesGroup.on("mouseover", function(data){
			toolTip.show(data, this); //on mouseover event to display tooltip info
		})
		  .on("mouseout", function(data, index){
		  	toolTip.hide(data); //hide data when mouse is removed from the circle
		  });

		// chartGroup
  //       	.append('g')
  //       	.attr('transform', `translate(0, ${height})`)
  //       	.call(bottomAxis);


		//axes labels
		chartGroup.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left + 40)
			.attr("x", 0 - (height/2))
			.attr("dy", "1.5em")
			.attr("class", "axisText")
			.text("Healthcare (%)");

		chartGroup.append("text")
			.attr("transform", `translate(${width/2}, ${height + margin.top + 17})`)
			.style("text-anchor", "middle")
			.attr("class", "axisText")
			.text("Poverty (%)");

		chartGroup.selectAll(null)
         .data(data)
     	 .enter()
      	 .append("text")
      	 .text(function(data) { return data.abbr; })
      	 .attr('x', function(data) {
            return xLinearScale(data.poverty);
       })
         .attr('y', function(data) {
            return yLinearScale(data.healthcare);
        })
         .attr("font-size", "10px")
         .attr("fill", "black")
         .style("text-anchor", "middle");

		console.log("Last entered code");

	});
















