// import * as d3 from "https://cdn.skypack.dev/d3@7";
//
// const homeElement = d3.select(".action-area__left-subarea__output__graphic")
// console.log(homeElement);
// <!--<script type="module">-->
// <!--    const div = d3.select(".action-area__left-subarea__output__graphic");-->
// <!--    let width = 600,-->
// <!--        height =300;-->
//
// <!--    let data = [-5, -4, -3, -2, -1, 0, 1, 2, 3];-->
//
// <!--    // Append SVG-->
// <!--    let svg = div-->
// <!--        .append("svg")-->
// <!--        .attr("width", width)-->
// <!--        .attr("height", height);-->
//
// <!--    // Create scale-->
// <!--    let xScale = d3.scaleLinear()-->
// <!--        .domain([d3.min(data), d3.max(data)])-->
// <!--        .range([0, width - 100]);-->
//
// <!--    let yScale = d3.scaleLinear()-->
// <!--        .domain([d3.min(data), d3.max(data)])-->
// <!--        .range([100, width - 100]);-->
//
// <!--    let x_axis = d3.axisBottom()-->
// <!--        .scale(xScale);-->
//
// <!--    let y_axis = d3.axisLeft()-->
// <!--        .scale(yScale);-->
//
// <!--    let xAxisTranslate = height/2 - 100;-->
//
// <!--    svg.append("g")-->
// <!--        .attr("transform", "translate(50, " + xAxisTranslate +")")-->
// <!--        .call(x_axis);-->
//
// <!--    svg.append("g")-->
// <!--    .attr("transform", "translate(100, 10)")-->
// <!--    .call(y_axis);-->
//
// <!--</script>-->