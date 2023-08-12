const margin = {top: 20, right: 50, bottom: 50, left: 60},
    width = innerWidth - margin.left - margin.right,
    height = innerHeight - margin.top - margin.bottom;

const formatDate = d3.time.format("%d/%m/%Y").parse

//Set the ranges.
const x = d3.time.scale()
    .range([0, width]);
const y = d3.scale.linear()
    .range([height, 0])

//Define the line.
const line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.currency); });

//Append the svg to the body.
//Append the <g> element to the svg.
//Translate the <g> element to the top-left of the svg.
const svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

//Special constants.
const color = d3.scale.ordinal()
 .range(["orange", "#005500", "#bb5500", "#00cccc", "#5500aa","#aa0000"]);

 //Get the data.           
d3.csv("ATsum.csv", function(error, data) { //  <<-------------
//console.log(data)
//Format the required data.
data.forEach(function(d) {
 d.date = formatDate(d.date);
 });

//Add the axes. This is the D3 v3 way of doing this.
const xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
const yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

//Use special constant 'color.'
color.domain(d3.keys(data[0]).filter(function(key) {
    return key !== "date"; 
}));

//I don't understand this yet.
const hoursSpent = color.domain().map(function(name) {
    return {
        name: name,
        values: data.map(function(d) {
            return {
                date: d.date, currency: +d[name]
            }
        })
    }; 
 });

x.domain(d3.extent(data, function(d) { return d.date; }));
y.domain([0, 4500])

//Append the two groups for the axes.
    //These contain xAxis and yAxis defined above.
    //These, in turn, contain the type of scale defined in 'x' and 'y'.
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

//I think that this defines the individual lines.
const techActivity = svg.selectAll(".techActivity")
    .data(hoursSpent)
    .enter().append("g")
    .style("fill", function(d) { return color(d.name); })
    .attr("class", "techActivity")

//I have not identified this yet either.
techActivity.append("path")
    .attr("class", "line")
    .attr("d", function(d) { return line(d.values); })
    .style("stroke", function(d) { return color(d.name); });

//This is text at the end of each line.
//I need to leave this in because it might be useful in the 
//future.
// techActivity.append("text").datum(function(d) { 
//     return { 
//         name: d.name, value: d.values[d.values.length - 1]
//     }; })
//     .attr("transform", function(d) { 
//         return "translate("+ x(d.value.date)+","+ y(d.value.currency)+")";
//     })
//     .attr("x", 10)
//     .attr("y", -10)
//     .attr("dy", ".50em")
//     .text(function(d) { return d.name; });

// create a list of keys
const keys = ["Node, Express, JavaScript, MongoDB", "D3", "THREE", 
 "HTML, CSS", "C#, R, React, Cheerio, PHP", "WordPress, SquareSpace"]

// Usually you have a color scale in your chart already 
const colour = d3.scale.ordinal()
    .domain(keys)
    .range(["#005500", "#5500aa","#aa0000", 
     "#00cccc", "orange", "#bb5500"]);    
  

// Add one dot in the legend for each name.
svg.selectAll("rect")
  .data(keys)
  .enter()
  .append("circle")
    .attr("cx", 50)
    .attr("cy", function(d,i){ return  50 + i*20}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function(d){ return colour(d)})


    
// Add one dot in the legend for each name.
svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 70)
    .attr("y", function(d,i){ return  50 + i*20}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return colour(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")


});
