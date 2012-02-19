function classify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "-");
}
if (location.search.match(/lang=en/)) {
  var _ = function(s) { return s; }
}
else {
  var _ = function(s) { return ja[s] || s; }
}
jQuery(function($) {
  var $container = $("#container");
  var $template = $("#template");
  for (var ingredient in data) {
    var effects = data[ingredient].map(function(name, i, all) {
      return {className: classify(name), name: name, name_t: _(name)};
    });
    var className = effects.map(function(x){return x.className}).join(" ");
    var html = $template.mustache({
      ingredient: ingredient,
      ingredient_t: _(ingredient),
      effects: effects,
      className: className,
    });
    $container.append(html);
  }
  $container.filter = function(effects) {
    var classNames = effects.map(classify);
    $('.highlight').removeClass('highlight');
    $('#filter').text(effects.map(_).join(", "));
    $('tr', this)
      .hide()
      .filter(function() {
        var $self = $(this);
        return classNames.some(function(x){return $self.hasClass(x)});
      }).show();
    $('td', this).filter(function() {
        var $self = $(this);
      return classNames.some(function(x){return $self.hasClass(x)});
    }).addClass('highlight');
  }
  $container.on('click', 'tr', function() {
    var effects = $('td', this).map(function(){return $(this).data('name')}).get();
    $container.filter(effects);
  });
  $container.on('click', 'td', function() {
    $container.filter([$(this).data('name')]);
    return false;
  });
  $('#reset').click(function() {
    $('#filter').text('none');
    $('tr', container).show();
    $('.highlight').removeClass('highlight');
  });
});
