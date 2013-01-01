Rickshaw.namespace('Rickshaw.Graph.Renderer.Pie');

Rickshaw.Graph.Renderer.Pie = Rickshaw.Class.create( Rickshaw.Graph.Renderer, {

  name: 'pie',

  defaults: function($super) {

    var defaults = Rickshaw.extend( $super(), {
      innerRadius: 0,
      outerRadius: 100,
      scheme: 'classic9',
      unstack: false
    } );

    delete defaults.tension;
    return defaults;
  },

  initialize: function($super, args) {
    args = args || {};
    // TODO: Math.min(width, height) / 2; for outerRadius
    this.innerRadius = args.innerRadius || this.innerRadius;
    this.scheme = args.scheme || this.scheme;
    $super(args);
  },

  render: function() {
    var graph = this.graph;

    graph.vis.selectAll('*').remove();

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.y; });

    var palette = new Rickshaw.Color.Palette( { scheme: graph.scheme } );

    var arc = d3.svg.arc()
        .outerRadius(this.outerRadius - 10)
        .innerRadius(this.innerRadius);

    var g = graph.vis.selectAll(".arc")
      .data(pie(graph.series[0].data))
      .enter().append("g")
      .attr("transform", "translate(" + graph.width / 2 + "," + graph.height / 2 + ")")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return palette.color(); });

    // TODO: fix labelling
    g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.label; });
  }
} );

