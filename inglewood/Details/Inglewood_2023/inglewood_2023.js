// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 90, left: 60},
    width = window.innerWidth - 120,
    height = window.innerHeight - 160

//Append the svg object to the body of the page
const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
//Append the group element to the svg.
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Get the Data
d3.csv("inglewood_2023.csv", function(data) {
console.log(data)
//Define the x-axis.
const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.date; }))
    .padding(0.1);

//Define the y-axis.
const y = d3.scaleLinear()
    .domain([0, 210])
    .range([ height, 0]);

//Add the x-axis.
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

//Add the y-axis.
svg.append("g")
    .call(d3.axisLeft(y));
    
//Add the bars.
svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.date); })
        .attr("y", function(d) { return y(d.attendance); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.attendance); })
        .attr("fill", "darkblue")

//This is the code for attaching the numbers at the top of the bars.
svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("text")
        .text(function(d) { return d.attendance })
        .attr("y", function(d) { return y(d.attendance) - 5 })
        .attr("x",function(d) { return x(d.date) + 2 })
        .style("text-anchor", "start")
    
    })