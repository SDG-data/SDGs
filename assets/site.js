
//Read Goals, Targets and Indicators
var sdgs = [];
var stats = {};

files = ["goals","targets","indicators"];
files.forEach(function (f) {
  console.log("Loading "+f);
  d3.json(f+".json", function (error, data) {
    //for (var attrname in data) { sdgs[attrname] = data[attrname]; }
    sdgs.push(data);
    if (sdgs.length==3) { data_loaded(sdgs); }
  });
});

function data_loaded(sdgs){
  console.log(sdgs);
  list_goals(sdgs);
  add_targets(sdgs);
  add_indicators(sdgs);
  update_stats(sdgs);
}

function update_stats(sdgs){
 document.getElementById("goals-num").innerHTML = sdgs[0]["goals"].length+" Goals";
 document.getElementById("targets-num").innerHTML = sdgs[1]["targets"].length+" Targets";
 document.getElementById("indicators-num").innerHTML = sdgs[2]["indicators"].length+" Indicators";
 add_stack_plot(stats);
}

function add_stack_plot(stats){
 var data = {
    labels: d3.range(1, sdgs[0]["goals"].length+1),
    datasets: [
        {
            label: "Targets",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: stats["goal_targets"] 
        },
        {
            label: "Indicators",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: stats["goal_indicators"] 
        }
    ]
 };
 var options = {
    scaleBeginAtZero : true,
    scaleShowGridLines : true,
    scaleGridLineColor : "rgba(0,0,0,.05)",
    scaleGridLineWidth : 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    barShowStroke : true,
    barStrokeWidth : 2,
    barValueSpacing : 5,
    barDatasetSpacing : 1,

}

 var canvas = document.getElementById("barplot")
 var ctx= canvas.getContext("2d"); 
 var myBarChart = new Chart(ctx).Bar(data, options);
} 
  
  
  
  
  
function list_goals(sdgs){
  var sdgList = document.getElementById("sdgList"); 
  var goals=sdgs[0]["goals"];
  stats["goals"]=goals.length;
  for (var i in goals){
    var goal= goals[i];
    append_li(sdgList,"goal-"+goal["goal"],goal["goal"]+": "+goal["title"]);
  }
}

function append_li(hookElement,id,value){
  var newListItem = document.createElement("li");
  newListItem.setAttribute("id", id);
  var ListValue = document.createTextNode(value);
  newListItem.appendChild(ListValue);
  hookElement.appendChild(newListItem);
}


function append_row(hookElement,row){
 var table = document.getElementById(hookElement);
  var rowObject = table.insertRow(0);
  for (var i in row){
    cell = rowObject.insertCell(i);
    cell.innerHTML = row[i];
  }
}

function array_num(size,num){
  return Array.apply(null, new Array(size)).map(Number.prototype.valueOf,num);
}

function add_targets(sdgs){
  var targets=sdgs[1]["targets"];
  stats["targets"] = targets.length;
  stats["goal_targets"] = array_num(targets.length,0);
  for (var i in targets){
    var target=targets[i];
    stats["goal_targets"][target["goal"]-1]++;
    var goalLi = document.getElementById("goal-"+target["goal"]);
    var targetId="goal-"+target["goal"]+"-targets";
    if ( document.getElementById(targetId) == null) {
      var nestedOl = document.createElement("ul");
      nestedOl.setAttribute("id", targetId);
      goalLi.appendChild(nestedOl);
    }else{
      var goalLiUl = document.getElementById(targetId);
      append_li(goalLiUl,"target-"+target["id"],target["id"]+": "+target["title"]);
    }
  }
}

function add_indicators(sdgs){
  var indicators=sdgs[2]["indicators"];
  stats["indicators"] = indicators.length;
  stats["goal_indicators"] = array_num(indicators.length,0);
  
  for (var i in indicators){
    var indicator=indicators[i]; 
    stats["goal_indicators"][indicator["goal"]-1]++;
    var goalLi = document.getElementById("goal-"+indicator["goal"]);
    var indicatorsId="goal-"+indicator["goal"]+"-indicators";
    if (document.getElementById(indicatorsId) == null) {
      var responsiveTable = document.createElement("div");
      responsiveTable.setAttribute("class","table-responsive");
      var nestedTable = document.createElement("table");
      nestedTable.setAttribute("class","table table-striped table-bordered");
      var header = nestedTable.createTHead();
      var rowObject = header.insertRow(0);
      var columns=["Indicator","Leads","Available"]
      for (var i in columns ){
          var th = document.createElement('th');
          th.innerHTML = columns[i];
          rowObject.appendChild(th);
      }   
      var body = nestedTable.createTBody();
      body.setAttribute("id", indicatorsId);
      goalLi.appendChild(responsiveTable).appendChild(nestedTable);
     }else{
      append_row(indicatorsId,[indicator["indicator"],indicator["leads"],indicator["available"]]);
    }
  }
}



