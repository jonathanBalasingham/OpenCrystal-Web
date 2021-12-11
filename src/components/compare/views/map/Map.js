import React, {useState, useEffect} from 'react';
import rd3 from 'react-d3-library';
import {node} from "prop-types";

const RD3Component = rd3.Component;

function Map({}) {
    let canvas = rd3.select("canvas");
    let ctx = canvas.node().getContext("2d");
    let svg = rd3.select("svg");
// Basic parameters:
    let width = +canvas.attr("width");
    let height = +canvas.attr("height");
    let tau = 2 * Math.PI;
    let baseScale = 960/tau;
    let center = [-75.5, 38];

// Tiles Projection Setup:
    let tileProjection = rd3.geoMercator()
        .scale(1/tau)
        .translate([0,0]);

    let tileCenter = tileProjection(center);

// Geographic Projection Setup:
    let geoProjection = rd3.geoMercator()
        .scale(baseScale)
        .center(tileProjection.invert([0,0]))
        .translate([0,0]);

// Set up tiles:
    let tile = rd3.tile()
        .size([width, height]);

// Create a g for the tiles:
    let raster = svg.append("g");

    let controls = svg.append("g");

    rd3.csv("shipwrecks.csv").then(function(data) {
        // Set up nodes:
        resetNodes(data); // initialize

        // Set up clusterer
        let cluster = rd3.cluster()
            .nodes(data)
            .on("tick", ticked);

        // Set up zoom.
        let zoom = rd3.zoom()
            .on("zoom",zoomed)
            .scaleExtent([1 << 14, 1 << 17])

        // Call the zoom:
        canvas.call(zoom)
            .call(zoom.transform, rd3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(1 << 15)
                .translate(-tileCenter[0], -tileCenter[1]));

        //
        // Zoom Functionality:
        //
        function zoomed() {
            // stop cluster:
            cluster.stop();

            // Scale values:
            let kt = rd3.event.transform.k; // tile scale factor
            let k = kt/width;  // projection scale factor

            // Translate values:
            let x = rd3.event.transform.x
            let y = rd3.event.transform.y;
            let t0 = geoProjection.translate();
            let t = [x,y];

            // Update the cluster:

            // If translated only:
            if(geoProjection.scale() == k * baseScale) {
                // Update the projection:
                geoProjection.translate([x,y])
                clear();

                // Adjust cluster nodes:
                data.forEach(function(node) {
                    node.x += t[0] - t0[0];
                    node.y += t[1] - t0[1];
                    drawCircle(node);
                })
            }

            // If scaled:
            else {
                // Update Projection:
                geoProjection.translate([x,y])
                geoProjection.scale(baseScale * k);

                // Update the cluster:
                resetNodes(data);
                cluster.nodes(data)
                    .alpha(1)

            }

            cluster.restart();

            // Update the tiles:
            let tiles = tile
                .scale(kt)
                .translate([x, y])();

            let image = raster
                .attr("transform", stringify(tiles.scale, tiles.translate))
                .selectAll("image")
                .data(tiles, function(d) { return d; });

            image.exit().remove();

            image.enter().append("image")
                .attr("xlink:href", function(d) { return "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/" + d[2] + "/" + d[1] + "/" + d[0] + ".png"; })
                .attr("x", function(d) { return d[0] * 256; })
                .attr("y", function(d) { return d[1] * 256; })
                .attr("width", 256)
                .attr("height", 256);

        }

        // 
        // Tick functionality
        //
        function ticked(x,y) {
            clear();

            // Update cluster nodes:
            this.nodes(data.filter(function(d) { return d.r != 0; }))

            // draw still active nodes:
            data.filter(function(d) { return d.r != 0; })
                .forEach(drawCircle)

            attribute(); // tile attribution
        }

    })


// Helper functions:
    function resetNodes(nodes) {
        nodes.forEach(function(node) {
            let p = geoProjection([+node.long,+node.lat]);
            node.x = p[0];
            node.y = p[1];
            node.r = 2;
            node.a = Math.PI * node.r * node.r;
            node.collided = false;
            node.count = 1;
        })
    }
    function drawCircle(d) {
        ctx.fillStyle = d.collided ? ( d.r > 20 ? "#a8ddb5" : "#43a2ca"  ) : "#0868ac";
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI);
        ctx.fill();

        if(d.r > 20) drawText(d);
    }
    function drawText(d) {
        ctx.font = d.r / 3 + "px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(d.count,d.x,d.y+d.r/9);
    }
    function clear() {
        ctx.clearRect(0, 0, width, height);
    }
    function attribute() {
        ctx.font = "10px Arial";
        ctx.textAlign = "left";
        ctx.fillStyle = "black";
        ctx.fillText("Tiles \u00A9 Esri - Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri", 4, height-4);
    }
    function stringify(scale, translate) {
        let k = scale / 256, r = scale % 1 ? Number : Math.round;
        return "translate(" + r(translate[0] * scale) + "," + r(translate[1] * scale) + ") scale(" + k + ")";
    }

    const [d3, setd3] = useState('');

    useEffect(() => {
        setd3(node)
    }, []);

    return (
        <div>
            <RD3Component data={d3}/>
        </div>
    )
}
