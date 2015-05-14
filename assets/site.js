
//Read Goals, Targets and Indicators
var sdgs=[]

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
}
function list_goals(sdgs){
  var sdgList = document.getElementById("sdgList"); 
  var goals=sdgs[0]["goals"];
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


function add_targets(sdgs){
  var targets=sdgs[1]["targets"];
  for (var i in targets){
    var target=targets[i]; 
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
  for (var i in indicators){
    var indicator=indicators[i]; 
    var goalLi = document.getElementById("goal-"+indicator["goal"]);
    var indicatorsId="goal-"+indicator["goal"]+"-indicators";
    if (document.getElementById(indicatorsId) == null) {
      var responsiveTable = document.createElement("div");
      responsiveTable.setAttribute("class","table-responsive");
      var nestedTable = document.createElement("table");
      nestedTable.setAttribute("class","table table-striped table-bordered");
      var header = nestedTable.createTHead();
      var rowObject = header.insertRow(0);
      var columns=["Indicator","Data"]
      for (var i in columns ){
          var th = document.createElement('th');
          th.innerHTML = columns[i];
          rowObject.appendChild(th);
      }   
      var body = nestedTable.createTBody();
      body.setAttribute("id", indicatorsId);
      goalLi.appendChild(responsiveTable).appendChild(nestedTable);
     }else{
      append_row(indicatorsId,[indicator["indicator"],indicator["data"]]);
    }
  }
}



