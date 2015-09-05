[![](https://travis-ci.org/SDG-data/SDGs.svg?branch=master)](https://travis-ci.org/SDG-data/SDGs)


> To visualize this data, go to e.g. [this website](http://sdg-data.github.io/web/) which comes from the [website code repository](https://github.com/SDG-data/web) 

# SDGs
Data for the Sustainable Development Goals.

A machine readable format for the Goals and Indicators for the SDGs, becuase I could not find one.

Sources are declared. If you have any update, please submit a Pull Request.

### How to use the data

This is a quick example to load into a variable the data from another Github Pages, pulling directly from here

```js
var version = "v0.05";
var dataurl = "https://raw.githubusercontent.com/SDG-data/SDGs/"+version+"/";
var sdgs = [];
var files = ["goals","targets","indicators"];
function load_data(){
  files.forEach(function (f) {
    console.log("Loading "+f);
    d3.json(dataurl+f+".json", function (error, data) {
      sdgs[data.meta.id]=data;
  });
});
call_your_main_function_that does_the_thing_you_want(); 
}
```

