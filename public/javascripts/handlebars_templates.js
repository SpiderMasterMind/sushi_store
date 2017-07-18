this["JST"] = this["JST"] || {};

this["JST"]["cart_footer"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h3>Your<br>shopping cart</h3><p class=\"total\">$"
    + container.escapeExpression((helpers.format_price || (depth0 && depth0.format_price) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.total : depth0),{"name":"format_price","hash":{},"data":data}))
    + "</p><p></p><footer><a class=\"left empty_cart\" href=\"#\">Empty cart</a><!----><a class=\"right checkout\" href=\"/checkout\">Checkout</a></footer>";
},"useData":true});

this["JST"]["cart_item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "	<li data-id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">		<figure>			<img src=\""
    + alias2(alias1((depth0 != null ? depth0.cover : depth0), depth0))
    + "\" alt=\"cart-item\">		</figure>		<p>"
    + alias2(alias1((depth0 != null ? depth0.quantity : depth0), depth0))
    + " x $"
    + alias2((helpers.format_price || (depth0 && depth0.format_price) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.price : depth0),{"name":"format_price","hash":{},"data":data}))
    + "</p>	</li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul>"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.menuItems : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

this["JST"]["item_detail"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"item_details\">	<div>		<div class=\"nav prev\">			<img src=\"images/nav-prev.png\" alt=\"prev\">		</div>		<figure>			<img src=\""
    + alias4(((helper = (helper = helpers.cover || (depth0 != null ? depth0.cover : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cover","hash":{},"data":data}) : helper)))
    + "\" alt=\"selected-item\">		</figure>		<article>			<a class=\"close\" href=\"/\">+</a>			<h1>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h1>			<p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>			<footer>				<h2>$"
    + alias4((helpers.format_price || (depth0 && depth0.format_price) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),{"name":"format_price","hash":{},"data":data}))
    + "</h2>				<a class=\"add_cart\" href=\"#\">Add to cart</a>			</footer>		</article>		<aside>			<h3>Nutritional Information</h3>			<table>				<tbody>					<tr>						<td>Protein</td>						<td>"
    + alias4(((helper = (helper = helpers.protein || (depth0 != null ? depth0.protein : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"protein","hash":{},"data":data}) : helper)))
    + "</td>					</tr>					<tr>						<td>Fat (total)</td>						<td>"
    + alias4(((helper = (helper = helpers.fat || (depth0 != null ? depth0.fat : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fat","hash":{},"data":data}) : helper)))
    + "</td>					</tr>					<tr>						<td>Carbohydrate</td>						<td>"
    + alias4(((helper = (helper = helpers.carbohydrates || (depth0 != null ? depth0.carbohydrates : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"carbohydrates","hash":{},"data":data}) : helper)))
    + "</td>					</tr>					<tr>						<td>Energy (kj)</td>						<td>"
    + alias4(((helper = (helper = helpers.energyKJ || (depth0 != null ? depth0.energyKJ : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"energyKJ","hash":{},"data":data}) : helper)))
    + "</td>					</tr>					<tr>						<td>Energy (kcal)</td>						<td>"
    + alias4(((helper = (helper = helpers.energyKCal || (depth0 != null ? depth0.energyKCal : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"energyKCal","hash":{},"data":data}) : helper)))
    + "</td>					</tr>					<tr>						<td>Sugar</td>						<td>"
    + alias4(((helper = (helper = helpers.sugar || (depth0 != null ? depth0.sugar : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sugar","hash":{},"data":data}) : helper)))
    + "</td>					</tr>				</tbody>			</table>		</aside>		<div class=\"nav next\">			<img src=\"images/nav-next.png\" alt=\"next\">		</div>	</div></div>";
},"useData":true});

this["JST"]["menu_items"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "	<li data-id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">		<article>			<header>				<figure>					<img src=\""
    + alias2(alias1((depth0 != null ? depth0.cover : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\" />				</figure>				<h2 class=\"name\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "			</header>			<p class=\"price\">$"
    + alias2((helpers.format_price || (depth0 && depth0.format_price) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.price : depth0),{"name":"format_price","hash":{},"data":data}))
    + "</p>			<footer>				<a class=\"add_cart\" href=\"#\">Add to cart</a>			</footer>		</article>	</li>	";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"content\">	<ul id=\"items\">	"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.menuItems : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul></div>";
},"useData":true});