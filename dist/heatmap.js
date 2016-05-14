function convertNextProtDataIntoHeatMapTable (data) {
 //TODO convert the data here into the JSON format used by heatmap table
 // Related task: https://trello.com/c/DNgw1yLp/12-convert-nextprot-data-into-the-json-format
}
;
/*
* @File: generic-protein-expression-view.js
* @Description: Generic protein expression view for Human Body
* @Author: JinJin Lin
* @Email:   jinjin.lin@outlook.com
* @Date:   2016-03-12 15:20:55
* @Last Modified time: 2016-05-08 20:44:24
* All copyright reserved
*/

(function(root) {

    'use strict';

    if (root.HeatMapTable === undefined) {
        root.HeatMapTable = function(argv) {
            this.valueToColor = {'High': 'redBG', 'Low':'blueBG', 'Moderate':'grayBG', 'Negative': 'greenBG'};
            this.heatmapTable = $("#" + argv.tableID)[0];
            this.header = argv.header;
            this.hasColumnLabel = {};
        }
    }

    HeatMapTable.prototype.loadJSONData = function(data) {
        this.data = data;
        this.data.header = this.header
        this.showData();
        this.addClickEvent();
    }

    HeatMapTable.prototype.addClickEvent = function() {
        $('p.tree-toggler').click(function () {
            $(this).find(".glyphicon").toggleClass("glyphicon-plus glyphicon-minus");
            $(this).parent().parent().children('ul.tree').toggle(300);
        });
        $('p.tree-toggler').parent().parent().children('ul.tree').toggle();
    }

    HeatMapTable.prototype.loadJSONDataFromURL = function(filePath) {
        var self = this;
        $.getJSON(filePath, function(data) {
            self.loadJSONData(data);
        });
    }

    HeatMapTable.prototype.showData = function() {
        var template = HBtemplates['templates/heatmap.tmpl'];
        var result = template(this.data);
        $(this.heatmapTable).append(result);
    }

}(this));;
this["HBtemplates"] = this["HBtemplates"] || {};

this["HBtemplates"]["templates/heatmap-tree.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "    <li>\r\n        <div>\r\n            <p class=\"tree-toggler\" style=\"display:inline-block;margin-bottom:0px;word-break:break-all;\"><span class=\"glyphicon glyphicon-plus\"></span>"
    + container.escapeExpression(((helper = (helper = helpers.rowLabel || (depth0 != null ? depth0.rowLabel : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"rowLabel","hash":{},"data":data}) : helper)))
    + "</p>\r\n            <div class=\"pull-right\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.values : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\r\n        </div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.children : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </li>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	                <div class=\"circleBox\">\r\n	                	<i class=\"greenBG circle\"></i>\r\n	                	<!-- "
    + container.escapeExpression(((helper = (helper = helpers.createCircle || (depth0 != null ? depth0.createCircle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"createCircle","hash":{},"data":data}) : helper)))
    + " -->\r\n	                </div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["create-ul"],depth0,{"name":"create-ul","data":data,"indent":"        \t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"tree\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.children : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\r\n";
},"usePartial":true,"useData":true});

this["HBtemplates"]["templates/heatmap.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"circleBox\">\r\n                    "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\r\n                </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<style>\r\n.blueBG {\r\n    background-color: #0070C0;\r\n}\r\n\r\n.redBG {\r\n    background-color: #C00000;\r\n}\r\n\r\n.grayBG {\r\n    background-color: gray;\r\n}\r\n\r\n.greenBG {\r\n    background-color: green;\r\n}\r\n\r\n.circle {\r\n    text-align: center;\r\n    display: inline-block;\r\n    width: 10px;\r\n    height: 10px;\r\n    -webkit-border-radius: 5px;\r\n    -moz-border-radius: 5px;\r\n    border-radius: 5px;\r\n}\r\n\r\n.circleBox {\r\n    display: inline-block;\r\n    width: 70px;\r\n    text-align: center;\r\n}\r\n\r\nul {\r\n    list-style-type: none;\r\n}\r\np.tree-toggler{\r\n    cursor:pointer;\r\n}\r\n.glyphicon{\r\n    margin-right:5px;\r\n    font-size:12px;\r\n}\r\n\r\n#heatmap-body {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n}\r\n\r\n</style>\r\n\r\n\r\n<div id=\"heatmap-body\">\r\n    <div style=\"overflow:hidden\">\r\n        <div class=\"pull-right\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.header : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n"
    + ((stack1 = container.invokePartial(partials["create-ul"],depth0,{"name":"create-ul","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});